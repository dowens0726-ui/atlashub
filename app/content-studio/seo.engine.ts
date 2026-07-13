import type {
  AtlasContentInput,
  AtlasContentType,
  AtlasSeoMetadata,
} from "./types";

type BuildSeoMetadataInput = {
  content: AtlasContentInput & {
    slug: string;
    description: string;
    tags: string[];
  };
  contentType: AtlasContentType;
  canonicalBasePath?: string;
};

const CONTENT_LABELS: Record<AtlasContentType, string> = {
  vehicle: "Vehicle",
  mission: "Mission",
  business: "Business",
  weapon: "Weapon",
  property: "Property",
  character: "Character",
};

function truncateDescription(
  description: string,
  maximumLength = 160
): string {
  if (description.length <= maximumLength) {
    return description;
  }

  return `${description.slice(0, maximumLength - 1).trimEnd()}…`;
}

function normalizeBasePath(
  basePath: string,
  contentType: AtlasContentType
): string {
  const fallbackPath = `/${contentType}s`;
  const value = basePath.trim() || fallbackPath;

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

export function buildSeoMetadata({
  content,
  contentType,
  canonicalBasePath,
}: BuildSeoMetadataInput): AtlasSeoMetadata {
  const typeLabel = CONTENT_LABELS[contentType];
  const manufacturerPrefix = content.manufacturer
    ? `${content.manufacturer} `
    : "";

  const description =
    content.description.trim() ||
    `Explore ${manufacturerPrefix}${content.name}, including details, stats, locations, recommendations, and GTA VI intelligence from AtlasHub.`;

  const basePath = normalizeBasePath(
    canonicalBasePath ?? "",
    contentType
  );

  return {
    title: `${content.name} — GTA VI ${typeLabel} Guide | AtlasHub`,
    description: truncateDescription(description),
    keywords: Array.from(
      new Set([
        content.name.toLowerCase(),
        `${content.name.toLowerCase()} gta 6`,
        `${content.name.toLowerCase()} gta vi`,
        `gta vi ${contentType}`,
        `gta 6 ${contentType}`,
        "atlashub",
        ...content.tags,
      ])
    ).slice(0, 20),
    canonicalPath: `${basePath}/${content.slug}`,
  };
}