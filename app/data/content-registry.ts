import type {
  Business,
  Mission,
  Vehicle,
  Weapon,
} from "@/app/types";

import {
  businesses,
  missions,
  vehicles,
  weapons,
} from "@/app/data";

export type AtlasContentType =
  | "vehicle"
  | "mission"
  | "weapon"
  | "business";

export type AtlasContentEntity =
  | Vehicle
  | Mission
  | Weapon
  | Business;

function normalizeLookupValue(
  value: string
): string {
  return value
    .trim()
    .toLowerCase();
}

function getBySlug<T extends AtlasContentEntity>(
  collection: readonly T[],
  slug: string
): T | undefined {
  const normalizedSlug =
    normalizeLookupValue(slug);

  return collection.find(
    (entity) =>
      normalizeLookupValue(
        entity.slug
      ) === normalizedSlug
  );
}

function getById<T extends AtlasContentEntity>(
  collection: readonly T[],
  id: string
): T | undefined {
  const normalizedId =
    normalizeLookupValue(id);

  return collection.find(
    (entity) =>
      normalizeLookupValue(
        entity.id
      ) === normalizedId
  );
}

export function getAllVehicles(): readonly Vehicle[] {
  return vehicles;
}

export function getVehicleBySlug(
  slug: string
): Vehicle | undefined {
  return getBySlug(
    vehicles,
    slug
  );
}

export function getVehicleById(
  id: string
): Vehicle | undefined {
  return getById(
    vehicles,
    id
  );
}

export function getAllMissions(): readonly Mission[] {
  return missions;
}

export function getMissionBySlug(
  slug: string
): Mission | undefined {
  return getBySlug(
    missions,
    slug
  );
}

export function getMissionById(
  id: string
): Mission | undefined {
  return getById(
    missions,
    id
  );
}

export function getAllWeapons(): readonly Weapon[] {
  return weapons;
}

export function getWeaponBySlug(
  slug: string
): Weapon | undefined {
  return getBySlug(
    weapons,
    slug
  );
}

export function getWeaponById(
  id: string
): Weapon | undefined {
  return getById(
    weapons,
    id
  );
}

export function getAllBusinesses(): readonly Business[] {
  return businesses;
}

export function getBusinessBySlug(
  slug: string
): Business | undefined {
  return getBySlug(
    businesses,
    slug
  );
}

export function getBusinessById(
  id: string
): Business | undefined {
  return getById(
    businesses,
    id
  );
}

export function getContentBySlug(
  type: AtlasContentType,
  slug: string
): AtlasContentEntity | undefined {
  switch (type) {
    case "vehicle":
      return getVehicleBySlug(
        slug
      );

    case "mission":
      return getMissionBySlug(
        slug
      );

    case "weapon":
      return getWeaponBySlug(
        slug
      );

    case "business":
      return getBusinessBySlug(
        slug
      );

    default: {
      const exhaustiveCheck:
        never = type;

      return exhaustiveCheck;
    }
  }
}

export function getContentById(
  type: AtlasContentType,
  id: string
): AtlasContentEntity | undefined {
  switch (type) {
    case "vehicle":
      return getVehicleById(
        id
      );

    case "mission":
      return getMissionById(
        id
      );

    case "weapon":
      return getWeaponById(
        id
      );

    case "business":
      return getBusinessById(
        id
      );

    default: {
      const exhaustiveCheck:
        never = type;

      return exhaustiveCheck;
    }
  }
}