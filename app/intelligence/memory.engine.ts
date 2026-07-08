import type { PlayerProfile } from "@/app/types";
import type { EmpireForecast, NextAction } from "@/app/intelligence";

export type AtlasMemory = {
  title: string;
  summary: string;
  rememberedEvents: string[];
  learnedPattern: string;
};

export function buildAtlasMemory(
  profile: PlayerProfile,
  nextAction: NextAction,
  forecast: EmpireForecast
): AtlasMemory {
  const rememberedEvents = [
    `Current cash reserve: $${profile.cash.toLocaleString()}`,
    `Owned businesses: ${profile.ownedBusinesses.length}`,
    `Projected score: ${forecast.currentScore} → ${forecast.projectedScore}`,
  ];

  return {
    title: "Atlas Memory",
    summary:
      "Atlas is tracking your empire state and adapting recommendations as your profile changes.",
    rememberedEvents,
    learnedPattern:
      nextAction.confidence >= 90
        ? "You are positioned for a high-confidence growth move."
        : "Atlas recommends improving your position before making a major move.",
  };
}