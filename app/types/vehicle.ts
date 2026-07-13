import type { BaseEntity } from "./content";

export type VehicleDrivetrain =
  | "RWD"
  | "FWD"
  | "AWD"
  | "4WD"
  | "Unknown";

export type VehicleRarity =
  | "Common"
  | "Uncommon"
  | "Rare"
  | "Legendary"
  | "Unknown";

export type VehicleSourceGame =
  | "GTA VI"
  | "GTA Online"
  | "GTA V"
  | "Unknown";

export type VehicleDataConfidence =
  | "Confirmed"
  | "Estimated"
  | "Legacy"
  | "Unknown";

export type VehicleAcquisition = {
  method:
    | "Purchase"
    | "Unlock"
    | "Found"
    | "Reward"
    | "Unknown";

  source?: string;
  price?: number;
};

export type VehiclePerformance = {
  topSpeed: number;
  acceleration: number;
  handling: number;
  braking: number;
  horsepower?: number;
};

export type VehicleDataAvailability = {
  price: boolean;
  topSpeed: boolean;
  acceleration: boolean;
  handling: boolean;
  braking: boolean;
  drivetrain: boolean;
  seats: boolean;
  location: boolean;
  horsepower: boolean;
};

export type VehicleDataQuality = {
  confidence: VehicleDataConfidence;
  availability: VehicleDataAvailability;
};

export type Vehicle = BaseEntity & {
  name: string;
  manufacturer: string;
  class: string;
  image: string;
  featured: boolean;

  /**
   * Legacy numeric fields remain required while Atlas consumers are migrated
   * to availability-aware selectors.
   */
  price: number;
  topSpeed: number;
  acceleration: number;
  handling: number;
  braking: number;

  drivetrain: VehicleDrivetrain;
  seats: number;
  location: string;

  rarity?: VehicleRarity;
  sourceGame?: VehicleSourceGame;
  releaseYear?: number;

  acquisition?: VehicleAcquisition;
  performance?: VehiclePerformance;

  /**
   * Determines whether legacy numeric values are confirmed and safe to show,
   * rank, compare, or use in Atlas Intelligence.
   */
  dataQuality?: VehicleDataQuality;

  images?: string[];
  relatedVehicles?: string[];
  recommendedMissions?: string[];
  notes?: string[];
};