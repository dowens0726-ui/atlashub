export type Mission = {
  slug: string;
  title: string;
  description: string;
  reward: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  category: string;
  estimatedTime: string;
  recommendedVehicle?: string;
  recommendedWeapon?: string;
  unlocks?: string[];
  atlasTips?: string[];
  relatedMissions?: string[];
  image?: string;
  featured?: boolean;
};