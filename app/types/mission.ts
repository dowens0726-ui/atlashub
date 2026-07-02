import type { BaseContent } from "./content";

export type Mission = BaseContent & {
  reward: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  category: string;
  estimatedTime: string;
  recommendedVehicle?: string;
  recommendedWeapon?: string;
  unlocks?: string[];
  atlasTips?: string[];
  relatedMissions?: string[];
};