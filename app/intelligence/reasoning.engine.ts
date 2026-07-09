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

  if (recommendation.category === "business") {
    reasons.push(
      "This improves your long-term empire income potential."
    );
  }

  if (recommendation.category === "vehicle") {
    reasons.push(
      "This vehicle aligns with your current progression path."
    );
  }

  if (profile.cash >= 1_000_000) {
    reasons.push(
      "Your current cash position supports this investment."
    );
  }

  if (profile.playstyle === "solo") {
    reasons.push(
      "This fits a solo-focused strategy and efficient progression."
    );
  }

  if (profile.ownedBusinesses.length > 0) {
    reasons.push(
      "Your existing assets make this a strategic next step."
    );
  }

  if (reasons.length === 0) {
    reasons.push(
      "Atlas identified this as the strongest available progression option."
    );
  }

  return {
    recommendationId: recommendation.id,

    confidence: recommendation.confidence,

    reasons,

    expectedOutcome:
      recommendation.category === "business"
        ? "Increase passive income, strengthen your empire, and unlock additional progression opportunities."
        : recommendation.category === "vehicle"
          ? "Improve your capabilities and expand future mission options."
          : "Improve your overall progression efficiency.",

    alternatives: [
      "Continue saving resources before investing.",
      "Complete higher-value activities to accelerate progression.",
    ],
  };
}