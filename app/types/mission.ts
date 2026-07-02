import type { BaseEntity } from "./content";

export type Mission = BaseEntity & {
  title: string;
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