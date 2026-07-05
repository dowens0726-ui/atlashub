import type { BaseEntity } from "./content";

export type BusinessCategory =
  | "Nightlife"
  | "Logistics"
  | "Automotive"
  | "Weapons"
  | "Real Estate"
  | "Unknown";

export type Business = BaseEntity & {
  name: string;
  category: BusinessCategory;
  image: string;
  price: number;
  location: string;
  incomePotential: number;
  soloFriendly: boolean;
  crewRecommended: boolean;
  description: string;
  relatedVehicles?: string[];
  relatedMissions?: string[];
};