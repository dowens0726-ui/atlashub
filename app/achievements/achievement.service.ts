import type { PlayerProfile } from "@/app/types";
import type { Achievement } from "./types";

function getStatus(progress: number, target: number): Achievement["status"] {
  if (progress >= target) return "unlocked";
  if (progress > 0) return "in-progress";
  return "locked";
}

function createAchievement(
  achievement: Omit<Achievement, "status">
): Achievement {
  return {
    ...achievement,
    status: getStatus(achievement.progress, achievement.target),
  };
}

export function getAchievements(profile: PlayerProfile): Achievement[] {
  return [
    createAchievement({
      id: "first-business",
      title: "First Investment",
      description: "Own your first business.",
      category: "Business",
      progress: profile.ownedBusinesses.length,
      target: 1,
    }),
    createAchievement({
      id: "business-builder",
      title: "Business Builder",
      description: "Own 5 businesses.",
      category: "Business",
      progress: profile.ownedBusinesses.length,
      target: 5,
    }),
    createAchievement({
      id: "empire-builder",
      title: "Empire Builder",
      description: "Own 10 businesses.",
      category: "Empire",
      progress: profile.ownedBusinesses.length,
      target: 10,
    }),
    createAchievement({
      id: "millionaire",
      title: "Millionaire",
      description: "Reach $1,000,000 in available cash.",
      category: "Wealth",
      progress: profile.cash,
      target: 1_000_000,
    }),
    createAchievement({
      id: "multi-millionaire",
      title: "Multi-Millionaire",
      description: "Reach $10,000,000 in available cash.",
      category: "Wealth",
      progress: profile.cash,
      target: 10_000_000,
    }),
    createAchievement({
      id: "collector",
      title: "Collector",
      description: "Own 10 vehicles.",
      category: "Collection",
      progress: profile.ownedVehicles.length,
      target: 10,
    }),
  ];
}