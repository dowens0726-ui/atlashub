import type {
  AtlasOutcome,
} from "./outcome.engine";

import type {
  AtlasValidatedOutcome,
} from "./outcome-validation.engine";

import type {
  AtlasAdaptiveStrategy,
} from "./adaptive-strategy.engine";

import type {
  AtlasLearningProfile,
} from "./learning.engine";


export type AtlasStrategyFeedback = {
  title: string;

  performanceScore: number;

  result: string;

  lessonsLearned: string[];

  futureAdjustment: string;

  confidence: number;
};


export function buildStrategyFeedback(
  outcome: AtlasOutcome,
  validation: AtlasValidatedOutcome,
  strategy: AtlasAdaptiveStrategy,
  learning: AtlasLearningProfile
): AtlasStrategyFeedback {

  const lessonsLearned: string[] = [];


  if (
    outcome.rating === "positive"
  ) {
    lessonsLearned.push(
      "Successful decisions should increase confidence in similar strategies."
    );
  }


  if (
    validation.status === "confirmed"
  ) {
    lessonsLearned.push(
      "Atlas confirmed this decision produced measurable results."
    );
  }


  if (
    learning.confidence >= 80
  ) {
    lessonsLearned.push(
      "Atlas has enough behavioral data to refine future recommendations."
    );
  }


  const performanceScore =
    Math.min(
      100,
      60 +
        outcome.empireScoreChange * 4
    );


  return {
    title:
      "Atlas Strategy Feedback",

    performanceScore,

    result:
      outcome.summary,

    lessonsLearned,

    futureAdjustment:
      strategy.adjustments[0] ??
      "Continue monitoring future strategic decisions.",

    confidence:
      Math.min(
        100,
        strategy.confidence
      ),
  };
}