export type AchievementCategory =
  | "Empire"
  | "Business"
  | "Wealth"
  | "Progression"
  | "Collection";

export type AchievementStatus = "locked" | "in-progress" | "unlocked";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  status: AchievementStatus;
  progress: number;
  target: number;
};