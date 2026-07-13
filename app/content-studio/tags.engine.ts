import type {
  AtlasContentInput,
  AtlasContentType,
} from "./types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "by",
  "for",
  "from",
  "in",
  "is",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

function normalizeTag(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/\s+/g, " ");
}

function descriptionKeywords(description: string): string[] {
  return description
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4)
    .filter((word) => !STOP_WORDS.has(word))
    .slice(0, 8);
}

export function buildContentTags(
  content: AtlasContentInput,
  contentType: AtlasContentType
): string[] {
  const candidates = [
    contentType,
    "gta vi",
    "atlas",
    content.name,
    content.manufacturer,
    content.class,
    content.location,
    ...(content.tags ?? []),
    ...descriptionKeywords(content.description ?? ""),
  ];

  return Array.from(
    new Set(
      candidates
        .filter((value): value is string => Boolean(value?.trim()))
        .map(normalizeTag)
        .filter(Boolean)
    )
  ).slice(0, 20);
}