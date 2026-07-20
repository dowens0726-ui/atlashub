import {
  buildAdaptiveStrategy,
} from "../../adaptive-strategy.engine";

import {
  buildAtlasStrategicPlan,
} from "../../planning.engine";

import {
  buildStrategyFeedback,
} from "../../strategy-feedback.engine";


type AdaptiveStrategyArguments =
  Parameters<
    typeof buildAdaptiveStrategy
  >;

type StrategyFeedbackArguments =
  Parameters<
    typeof buildStrategyFeedback
  >;

type StrategicPlanArguments =
  Parameters<
    typeof buildAtlasStrategicPlan
  >;


export type AtlasStrategyPipelineInput = {
  recommendation:
    AdaptiveStrategyArguments[0];

  identity:
    AdaptiveStrategyArguments[1];

  memoryInsight:
    AdaptiveStrategyArguments[2];

  learning:
    AdaptiveStrategyArguments[3];

  outcome:
    StrategyFeedbackArguments[0];

  outcomeValidation:
    StrategyFeedbackArguments[1];

  profile:
    StrategicPlanArguments[0];
};


export function buildAtlasStrategyPipeline({
  recommendation,
  identity,
  memoryInsight,
  learning,
  outcome,
  outcomeValidation,
  profile,
}: AtlasStrategyPipelineInput) {
  const adaptiveStrategy =
    buildAdaptiveStrategy(
      recommendation,
      identity,
      memoryInsight,
      learning
    );

  const strategyFeedback =
    buildStrategyFeedback(
      outcome,
      outcomeValidation,
      adaptiveStrategy,
      learning
    );

  const strategicPlan =
    buildAtlasStrategicPlan(
      profile,
      adaptiveStrategy,
      strategyFeedback,
      memoryInsight
    );

  return {
    adaptiveStrategy,

    strategyFeedback,

    strategicPlan,
  };
}


export type AtlasStrategyPipelineModel =
  ReturnType<
    typeof buildAtlasStrategyPipeline
  >;
