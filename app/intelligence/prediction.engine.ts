import type { 
  AtlasLearningProfile 
} from "./learning.engine";

import type {
  AtlasRecommendation,
} from "./recommendation.engine";


export type AtlasPrediction = {
  confidenceBoost: number;

  reason: string;

  matchesLearning: boolean;
};


export function buildRecommendationPrediction(
  recommendation: AtlasRecommendation,
  learning: AtlasLearningProfile
): AtlasPrediction {

  let confidenceBoost = 0;

  let matchesLearning = false;


  if (
    recommendation.category === "business" &&
    learning.patterns.some(
      (pattern) =>
        pattern
          .toLowerCase()
          .includes("income")
    )
  ) {
    confidenceBoost += 5;
    matchesLearning = true;
  }


  if (
    learning.successfulActions >= 3
  ) {
    confidenceBoost += 5;
  }


  if (
    learning.learningStage === "Predictive"
  ) {
    confidenceBoost += 5;
  }


  return {
    confidenceBoost,

    matchesLearning,

    reason:
      matchesLearning
        ? "This recommendation matches your proven strategic behavior."
        : "Atlas is still learning which strategies fit you best.",
  };
}