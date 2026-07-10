import type { AtlasRecommendation } from "./recommendation.engine";

export type DecisionOutcome =
  | "pending"
  | "successful"
  | "neutral"
  | "failed";


export type AtlasDecisionHistoryItem = {
  id: string;

  timestamp: string;

  recommendationId: string;

  title: string;

  category: string;

  confidence: number;

  expectedImpact: string;

  reasons: string[];

  outcome: DecisionOutcome;
};


export function buildDecisionHistory(
  recommendation: AtlasRecommendation
): AtlasDecisionHistoryItem {
  return {
    id: `decision-${recommendation.id}`,

    timestamp: "Today",

    recommendationId:
      recommendation.id,

    title:
      recommendation.title,

    category:
      recommendation.category,

    confidence:
      recommendation.confidence,

    expectedImpact:
      recommendation.estimatedProfit
        ? `Potential income impact: $${recommendation.estimatedProfit.toLocaleString()}`
        : "Strategic progression impact",

    reasons:
      recommendation.match?.reasons ??
      [
        recommendation.summary,
      ],

    outcome:
      "pending",
  };
}