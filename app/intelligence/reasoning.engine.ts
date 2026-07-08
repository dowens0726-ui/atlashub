import type { AtlasRecommendation } from "./recommendation.engine";
import type { PlayerProfile } from "@/app/types";

export type AtlasReasoning = {
  recommendationId: string;
  confidence: number;
  reasons: string[];
  expectedOutcome: string;
  alternatives: string[];
};

export function buildAtlasReasoning(
  profile: PlayerProfile,
  recommendation: AtlasRecommendation
): AtlasReasoning {
  const reasons: string[] = [];

  if (profile.cash > 1_000_000) {
    reasons.push("You have enough cash to make this purchase.");
  }

  if (profile.playstyle === "solo") {
    reasons.push("This recommendation works well for solo players.");
  }

  if (profile.ownedBusinesses.length === 0) {
    reasons.push("Building your first business creates long-term income.");
  }

  return {
    recommendationId: recommendation.id,
    confidence: 92,
    reasons,
    expectedOutcome:
      "Increase long-term income and unlock additional progression opportunities.",
    alternatives: [
      "Save additional cash before purchasing.",
      "Complete higher-paying missions first.",
    ],
  };
}