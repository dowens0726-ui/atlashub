import { buildContentMetadata } from "./metadata.engine";
import { buildContentRelationships } from "./relationship.engine";
import { buildSeoMetadata } from "./seo.engine";
import { buildContentTags } from "./tags.engine";
import type {
  AtlasContentBuildOptions,
  AtlasContentBuildResult,
  AtlasContentInput,
} from "./types";
import { validateContent } from "./validation.engine";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildDescription(
  content: AtlasContentInput,
  contentType: AtlasContentBuildOptions["contentType"]
): string {
  const existingDescription = content.description?.trim();

  if (existingDescription) {
    return existingDescription;
  }

  const manufacturerPrefix = content.manufacturer
    ? `${content.manufacturer} `
    : "";

  return `${manufacturerPrefix}${content.name} is a GTA VI ${contentType} tracked by AtlasHub. Explore its details, relationships, availability, and Atlas intelligence.`;
}

export function buildAtlasContent<
  TInput extends AtlasContentInput,
>(
  input: TInput,
  options: AtlasContentBuildOptions
): AtlasContentBuildResult<TInput> {
  const slug = slugify(input.slug || input.name);
  const description = buildDescription(
    input,
    options.contentType
  );

  const tags = buildContentTags(
    {
      ...input,
      slug,
      description,
    },
    options.contentType
  );

  const content = {
    ...input,
    slug,
    description,
    tags,
  };

  const metadata = buildContentMetadata({
    contentType: options.contentType,
    source: options.source,
    sourceUrl: options.sourceUrl,
    status: options.status,
    verified: options.verified,
    confidence: options.confidence,
  });

  const relationships = buildContentRelationships(
    content,
    options.contentType
  );

  const seo = buildSeoMetadata({
    content,
    contentType: options.contentType,
    canonicalBasePath: options.canonicalBasePath,
  });

  const validation = validateContent({
    content,
    contentType: options.contentType,
    existingSlugs: options.existingSlugs,
  });

  return {
    document: {
      content,
      metadata,
      seo,
      relationships,
    },
    validation,
  };
}