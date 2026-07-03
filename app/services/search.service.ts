import { missions, vehicles, weapons } from "@/app/data";

export type SearchResult = {
  id: string;
  slug: string;
  type: "mission" | "vehicle" | "weapon";
  label: string;
  description: string;
  href: string;
  tags?: string[];
};

export function getSearchIndex(): SearchResult[] {
  return [
    ...missions.map((mission) => ({
      id: mission.id,
      slug: mission.slug,
      type: "mission" as const,
      label: mission.title,
      description: mission.description,
      href: `/missions/${mission.slug}`,
      tags: mission.tags,
    })),

    ...vehicles.map((vehicle) => ({
      id: vehicle.id,
      slug: vehicle.slug,
      type: "vehicle" as const,
      label: vehicle.name,
      description: vehicle.description,
      href: `/vehicles/${vehicle.slug}`,
      tags: vehicle.tags,
    })),

    ...weapons.map((weapon) => ({
      id: weapon.id,
      slug: weapon.slug,
      type: "weapon" as const,
      label: weapon.name,
      description: weapon.description,
      href: `/weapons/${weapon.slug}`,
      tags: weapon.tags,
    })),
  ];
}

function scoreResult(item: SearchResult, query: string): number {
  let score = 0;

  const label = item.label.toLowerCase();
  const description = item.description.toLowerCase();
  const type = item.type.toLowerCase();
  const tags = (item.tags ?? []).map((tag) => tag.toLowerCase());

  if (label === query) score += 100;
  else if (label.startsWith(query)) score += 75;
  else if (label.includes(query)) score += 50;

  if (tags.some((tag) => tag === query)) score += 40;
  else if (tags.some((tag) => tag.includes(query))) score += 25;

  if (description.includes(query)) score += 15;

  if (type.includes(query)) score += 10;

  return score;
}

export function searchAtlas(query: string): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return getSearchIndex()
    .map((item) => ({
      item,
      score: scoreResult(item, normalizedQuery),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}