import type { BaseEntity } from "./content";

export type BusinessCategory =
  | "Nightlife"
  | "Logistics"
  | "Automotive"
  | "Weapons"
  | "Real Estate"
  | "Unknown";

export type BusinessDifficulty =
  | "Easy"
  | "Medium"
  | "Hard";

export type ProfitabilityRating = 1 | 2 | 3 | 4 | 5;

export type Business = BaseEntity & {
  name: string;
  category: BusinessCategory;

  image: string;

  location: string;

  price: number;

  incomePotential: number;

  profitabilityRating: ProfitabilityRating;

  difficulty: BusinessDifficulty;

  soloFriendly: boolean;

  crewRecommended: boolean;

  description: string;

  atlasTips?: string[];

  recommendedFor?: string[];

  relatedVehicles?: string[];

  relatedMissions?: string[];

  relatedBusinesses?: string[];
};