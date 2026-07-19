export * from "./property.types";

// Property Categories
export { agencies } from "./agencies";
export { apartments } from "./apartments";
export { bunkers } from "./bunkers";
export { garages } from "./garages";
export { hangars } from "./hangars";
export { nightclubs } from "./nightclubs";
export { offices } from "./offices";
export { salvageYards } from "./salvage-yards";
export { warehouses } from "./warehouses";

import type { Property } from "./property.types";

import { agencies } from "./agencies";
import { apartments } from "./apartments";
import { bunkers } from "./bunkers";
import { garages } from "./garages";
import { hangars } from "./hangars";
import { nightclubs } from "./nightclubs";
import { offices } from "./offices";
import { salvageYards } from "./salvage-yards";
import { warehouses } from "./warehouses";

export const properties: Property[] = [
  ...agencies,
  ...apartments,
  ...bunkers,
  ...garages,
  ...hangars,
  ...nightclubs,
  ...offices,
  ...salvageYards,
  ...warehouses,
];

export function getPropertyBySlug(
  slug: string
): Property | undefined {
  return properties.find(
    (property) => property.slug === slug
  );
}

export function getPropertyById(
  id: string
): Property | undefined {
  return properties.find(
    (property) => property.id === id
  );
}

export function getPropertiesByCategory(
  category: Property["category"]
): Property[] {
  return properties.filter(
    (property) => property.category === category
  );
}