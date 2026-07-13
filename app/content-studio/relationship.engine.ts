import type {
  AtlasContentInput,
  AtlasContentRelationship,
  AtlasContentType,
} from "./types";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueRelationships(
  relationships: AtlasContentRelationship[]
): AtlasContentRelationship[] {
  const seen = new Set<string>();

  return relationships.filter((relationship) => {
    const key = [
      relationship.type,
      relationship.targetType,
      relationship.targetSlug,
    ].join(":");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function buildContentRelationships(
  content: AtlasContentInput,
  contentType: AtlasContentType
): AtlasContentRelationship[] {
  const relationships: AtlasContentRelationship[] = [];

  if (content.manufacturer?.trim()) {
    relationships.push({
      type: "manufacturer",
      targetType: "manufacturer",
      targetSlug: slugify(content.manufacturer),
      label: content.manufacturer.trim(),
      confidence: 100,
    });
  }

  if (content.location?.trim()) {
    relationships.push({
      type: "located-at",
      targetType: "location",
      targetSlug: slugify(content.location),
      label: content.location.trim(),
      confidence: 90,
    });
  }

  for (const relatedSlug of content.relatedSlugs ?? []) {
    const slug = slugify(relatedSlug);

    if (!slug) {
      continue;
    }

    relationships.push({
      type: "related",
      targetType: contentType,
      targetSlug: slug,
      label: relatedSlug.trim(),
      confidence: 80,
    });
  }

  for (
    const missionSlug of content.recommendedMissionSlugs ?? []
  ) {
    const slug = slugify(missionSlug);

    if (!slug) {
      continue;
    }

    relationships.push({
      type: "recommended",
      targetType: "mission",
      targetSlug: slug,
      label: missionSlug.trim(),
      confidence: 75,
    });
  }

  return uniqueRelationships(relationships);
}