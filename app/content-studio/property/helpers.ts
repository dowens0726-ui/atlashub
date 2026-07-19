import type { Property } from "@/app/data/properties";

export function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeId(
  category: Property["category"],
  name: string
): string {
  return `${category.toLowerCase()}-${normalizeSlug(name)}`;
}

export function uniqueStrings(
  values: string[]
): string[] {
  return [...new Set(values.map((value) => value.trim()))]
    .filter(Boolean)
    .sort();
}

export function hasValue(
  value: unknown
): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}

export function createEmptyProperty(
  category: Property["category"]
): Property {
  return {
    id: "",
    slug: "",
    name: "",
    category,

    description: "",

    location: {
      region: "",
    },

    basePrice: 0,

    useCases: [],

    income: {
      potential: "None",
      passiveIncome: false,
    },

    riskLevel: "Low",

    soloFriendly: true,

    crewFriendly: false,

    unlocks: [],

    upgrades: [],

    recommendedFor: [],

    atlasNotes: [],

    relatedBusinesses: [],

    relatedMissions: [],

    relatedProperties: [],

    relatedVehicles: [],
  };
}