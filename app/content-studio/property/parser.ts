import type { Property } from "@/app/data/properties";

import {
  createEmptyProperty,
  normalizeId,
  normalizeSlug,
  uniqueStrings,
} from "./helpers";

export type PropertyImportInput = Partial<
  Omit<Property, "location" | "income" | "upgrades">
> & {
  location?: Partial<Property["location"]>;
  income?: Partial<Property["income"]>;
  upgrades?: Array<Partial<Property["upgrades"][number]>>;
};

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeNumber(
  value: unknown,
  fallback = 0
): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.replace(/[$,]/g, ""));

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function normalizeBoolean(
  value: unknown,
  fallback = false
): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (["true", "yes", "1"].includes(normalized)) {
      return true;
    }

    if (["false", "no", "0"].includes(normalized)) {
      return false;
    }
  }

  return fallback;
}

function normalizeStringArray(
  value: unknown
): string[] {
  if (Array.isArray(value)) {
    return uniqueStrings(
      value.filter(
        (item): item is string =>
          typeof item === "string"
      )
    );
  }

  if (typeof value === "string") {
    return uniqueStrings(
      value
        .split(/[|;,]/)
        .map((item) => item.trim())
        .filter(Boolean)
    );
  }

  return [];
}

function normalizeUpgrades(
  upgrades: PropertyImportInput["upgrades"]
): Property["upgrades"] {
  if (!Array.isArray(upgrades)) {
    return [];
  }

  return upgrades
    .map((upgrade) => {
      const name = normalizeText(upgrade.name);
      const id =
        normalizeText(upgrade.id) ||
        normalizeSlug(name);

      const description = normalizeText(
        upgrade.description
      );

      const price =
        upgrade.price === undefined
          ? undefined
          : Math.max(
              0,
              normalizeNumber(upgrade.price)
            );

      const recommended =
        upgrade.recommended === undefined
          ? undefined
          : normalizeBoolean(
              upgrade.recommended
            );

      return {
        id,
        name,
        description,
        ...(price !== undefined
          ? { price }
          : {}),
        ...(recommended !== undefined
          ? { recommended }
          : {}),
      };
    })
    .filter(
      (upgrade) =>
        upgrade.id.length > 0 &&
        upgrade.name.length > 0
    );
}

export function parseProperty(
  input: PropertyImportInput,
  category: Property["category"]
): Property {
  const emptyProperty =
    createEmptyProperty(category);

  const name = normalizeText(input.name);

  const slug =
    normalizeText(input.slug) ||
    normalizeSlug(name);

  const id =
    normalizeText(input.id) ||
    normalizeId(category, name);

  return {
    ...emptyProperty,
    ...input,

    id,
    slug,
    name,
    category,

    description: normalizeText(
      input.description
    ),

    location: {
      ...emptyProperty.location,
      ...input.location,
      region: normalizeText(
        input.location?.region
      ),
      district:
        normalizeText(
          input.location?.district
        ) || undefined,
      address:
        normalizeText(
          input.location?.address
        ) || undefined,
    },

    basePrice: Math.max(
      0,
      normalizeNumber(input.basePrice)
    ),

    maximumPrice:
      input.maximumPrice === undefined
        ? undefined
        : Math.max(
            0,
            normalizeNumber(
              input.maximumPrice
            )
          ),

    useCases: normalizeStringArray(
      input.useCases
    ) as Property["useCases"],

    income: {
      ...emptyProperty.income,
      ...input.income,

      passiveIncome: normalizeBoolean(
        input.income?.passiveIncome,
        emptyProperty.income.passiveIncome
      ),

      estimatedHourlyIncome:
        input.income?.estimatedHourlyIncome ===
        undefined
          ? undefined
          : Math.max(
              0,
              normalizeNumber(
                input.income
                  .estimatedHourlyIncome
              )
            ),

      estimatedPaybackHours:
        input.income?.estimatedPaybackHours ===
        undefined
          ? undefined
          : Math.max(
              0,
              normalizeNumber(
                input.income
                  .estimatedPaybackHours
              )
            ),

      notes: normalizeStringArray(
        input.income?.notes
      ),
    },

    riskLevel:
      input.riskLevel ??
      emptyProperty.riskLevel,

    soloFriendly: normalizeBoolean(
      input.soloFriendly,
      emptyProperty.soloFriendly
    ),

    crewFriendly: normalizeBoolean(
      input.crewFriendly,
      emptyProperty.crewFriendly
    ),

    storageCapacity:
      input.storageCapacity === undefined
        ? undefined
        : Math.max(
            0,
            normalizeNumber(
              input.storageCapacity
            )
          ),

    vehicleCapacity:
      input.vehicleCapacity === undefined
        ? undefined
        : Math.max(
            0,
            normalizeNumber(
              input.vehicleCapacity
            )
          ),

    unlocks: normalizeStringArray(
      input.unlocks
    ),

    upgrades: normalizeUpgrades(
      input.upgrades
    ),

    recommendedFor: normalizeStringArray(
      input.recommendedFor
    ),

    atlasNotes: normalizeStringArray(
      input.atlasNotes
    ),

    relatedBusinesses: normalizeStringArray(
      input.relatedBusinesses
    ),

    relatedMissions: normalizeStringArray(
      input.relatedMissions
    ),

    relatedProperties: normalizeStringArray(
      input.relatedProperties
    ),

    relatedVehicles: normalizeStringArray(
      input.relatedVehicles
    ),
  };
}

export function parseProperties(
  inputs: PropertyImportInput[],
  category: Property["category"]
): Property[] {
  return inputs.map((input) =>
    parseProperty(input, category)
  );
}