import type { AtlasRecommendation } from "./recommendation.engine";
import type { PlayerProfile } from "@/app/types";

export type SessionStep = {
  order: number;
  recommendation: AtlasRecommendation;
};

export type AtlasSessionPlan = {
  title: string;
  estimatedProfit: number;
  estimatedTimeMinutes: number;
  steps: SessionStep[];
};

export function buildSessionPlan(
  profile: PlayerProfile,
  recommendations: AtlasRecommendation[]
): AtlasSessionPlan {
  const steps = recommendations
    .slice(0, 4)
    .map((recommendation, index) => ({
      order: index + 1,
      recommendation,
    }));

  return {
    title: "Today's Atlas Plan",
    estimatedProfit: recommendations.reduce(
      (sum, item) => sum + (item.estimatedProfit ?? 0),
      0
    ),
    estimatedTimeMinutes: recommendations.reduce(
      (sum, item) => sum + (item.estimatedTimeMinutes ?? 0),
      0
    ),
    steps,
  };
}