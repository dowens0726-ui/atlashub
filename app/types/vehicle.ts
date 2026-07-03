import type { BaseEntity } from "./content";

export type VehicleDrivetrain = "RWD" | "FWD" | "AWD" | "4WD";

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

export type VehicleAcquisition = {
  method: "Purchase" | "Unlock" | "Found" | "Reward" | "Unknown";
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

export type Vehicle = BaseEntity & {
  name: string;
  manufacturer: string;
  class: string;
  image: string;
  featured: boolean;

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
  images?: string[];
  relatedVehicles?: string[];
  recommendedMissions?: string[];
  notes?: string[];
};