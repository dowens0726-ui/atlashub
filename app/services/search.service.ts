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

export function searchAtlas(query: string): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return getSearchIndex().filter((item) => {
    const searchableText = [
      item.label,
      item.description,
      item.type,
      ...(item.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}