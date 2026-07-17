import type {
  Vehicle,
} from "@/app/types";

export type VehicleIntelligenceScore = {
  performance: number;
  value: number;
  utility: number;
  accessibility: number;
  versatility: number;
  overall: number;
};

export type VehicleScoreBreakdown = {
  vehicle: Vehicle;
  score: VehicleIntelligenceScore;
  strengths: string[];
  weaknesses: string[];
  summary: string;
};

export type VehicleRecommendationCategory =
  | "Best Overall"
  | "Best Value"
  | "Best Performance"
  | "Best Utility"
  | "Best Beginner Pick"
  | "Best Specialist Pick";

export type VehicleRecommendation = {
  category: VehicleRecommendationCategory;
  vehicle: Vehicle;
  score: VehicleIntelligenceScore;
  reason: string;
};

export type VehicleComparisonResult = {
  first: VehicleScoreBreakdown;
  second: VehicleScoreBreakdown;
  winnerSlug: string | null;
  conclusion: string;
};

export type GarageGap =
  | "Performance"
  | "Utility"
  | "Off-Road"
  | "Daily Driver"
  | "Passenger Capacity"
  | "Budget Option"
  | "Premium Option";

export type GarageRecommendation = {
  recommendedVehicle: Vehicle;
  gaps: GarageGap[];
  reason: string;
};

export type VehicleUseCaseRatings = {
  getaway: number;
  offRoad: number;
  racing: number;
  business: number;
  crew: number;
  pvp: number;
  pve: number;
};

export type VehicleIntelligenceProfile = {
  vehicle: Vehicle;
  ratings: VehicleUseCaseRatings;
  bestUses: string[];
  strengths: string[];
  weaknesses: string[];
  summary: string;
};