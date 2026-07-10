import type {
  AtlasRecommendation,
} from "./recommendation.engine";

import type {
  AtlasPlayerIdentity,
} from "./player-identity.engine";

import type {
  AtlasMemoryInsight,
} from "./memory-insight.engine";

import type {
  AtlasLearningProfile,
} from "./learning.engine";


export type AtlasAdaptiveStrategy = {
  title: string;

  strategyScore: number;

  adjustments: string[];

  reasoning: string;

  confidence: number;
};


export function buildAdaptiveStrategy(
  recommendation: AtlasRecommendation,
  identity: AtlasPlayerIdentity,
  memoryInsight: AtlasMemoryInsight,
  learning: AtlasLearningProfile
): AtlasAdaptiveStrategy {

  const adjustments: string[] = [];

  let strategyScore = 70;


  if (
    identity.strategy === "Long-Term Growth"
  ) {
    strategyScore += 10;

    adjustments.push(
      "Prioritize sustainable empire expansion over short-term gains."
    );
  }


  if (
    memoryInsight.confidence >= 80
  ) {
    strategyScore += 10;

    adjustments.push(
      "Use historical player patterns to refine future decisions."
    );
  }


  if (
    learning.confidence >= 80
  ) {
    strategyScore += 5;

    adjustments.push(
      "Atlas has enough behavioral data to personalize recommendations."
    );
  }


  if (
    recommendation.category === "business"
  ) {
    adjustments.push(
      "Current recommendation aligns with empire-building priorities."
    );
  }


  return {
    title:
      "Adaptive Strategy Analysis",

    strategyScore:
      Math.min(
        100,
        strategyScore
      ),

    adjustments,

    reasoning:
      `Atlas adjusted this strategy based on your ${identity.archetype} profile and learned progression patterns.`,

    confidence:
      Math.min(
        100,
        memoryInsight.confidence +
          learning.confidence / 2
      ),
  };
}