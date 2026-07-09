import type { PlayerProfile } from "@/app/types";
import type { EmpireForecast, NextAction } from "@/app/intelligence";

export type AtlasMemory = {
  title: string;
  summary: string;
  rememberedEvents: string[];
  learnedPattern: string;
  playerInsights: string[];
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
    `Current strategy recommendation: ${nextAction.title}`,
  ];

  const playerInsights: string[] = [];

  if (profile.playstyle === "solo") {
    playerInsights.push(
      "Prefers solo-friendly progression strategies."
    );
  }

  if (profile.ownedBusinesses.length > 0) {
    playerInsights.push(
      "Values building income-producing assets."
    );
  }

  if (profile.cash >= 1_000_000) {
    playerInsights.push(
      "Comfortable making strategic investments."
    );
  }

  if (nextAction.confidence >= 90) {
    playerInsights.push(
      "Usually positioned for high-confidence growth decisions."
    );
  }

  if (playerInsights.length === 0) {
    playerInsights.push(
      "Atlas is still learning your preferred strategy."
    );
  }

  return {
    title: "Atlas Memory",

    summary:
      "Atlas is learning your strategy, preferences, and empire progression patterns.",

    rememberedEvents,

    learnedPattern:
      profile.playstyle === "solo"
        ? "You tend to prioritize efficient solo empire growth."
        : "You are building a balanced progression strategy.",

    playerInsights,
  };
}