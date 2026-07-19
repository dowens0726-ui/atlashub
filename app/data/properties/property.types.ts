import type {
  BaseEntity,
} from "@/app/types";

export type PropertyCategory =
  | "Agency"
  | "Apartment"
  | "Bunker"
  | "Garage"
  | "Hangar"
  | "Nightclub"
  | "Office"
  | "Salvage Yard"
  | "Warehouse";

export type PropertyIncomePotential =
  | "None"
  | "Low"
  | "Medium"
  | "High"
  | "Very High";

export type PropertyRiskLevel =
  | "Low"
  | "Moderate"
  | "High";

export type PropertyUseCase =
  | "Active Income"
  | "Business Operations"
  | "Luxury"
  | "Mission Access"
  | "Passive Income"
  | "Progression"
  | "Storage";

export type PropertyLocation = {
  region: string;
  district?: string;
  address?: string;
};

export type PropertyUpgrade = {
  id: string;
  name: string;
  description: string;
  price?: number;
  recommended?: boolean;
};

export type PropertyIncomeProfile = {
  potential: PropertyIncomePotential;
  passiveIncome: boolean;
  estimatedHourlyIncome?: number;
  estimatedPaybackHours?: number;
  notes?: string[];
};

export type Property = BaseEntity & {
  name: string;

  category: PropertyCategory;

  location: PropertyLocation;

  basePrice: number;

  maximumPrice?: number;

  useCases: PropertyUseCase[];

  income: PropertyIncomeProfile;

  riskLevel: PropertyRiskLevel;

  soloFriendly: boolean;

  crewFriendly: boolean;

  storageCapacity?: number;

  vehicleCapacity?: number;

  unlocks: string[];

  upgrades: PropertyUpgrade[];

  recommendedFor: string[];

  atlasNotes: string[];

  relatedBusinesses: string[];

  relatedMissions: string[];

  relatedProperties: string[];

  relatedVehicles: string[];
};

export type PropertyCollection = {
  category: PropertyCategory;
  properties: Property[];
};