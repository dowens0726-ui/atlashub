import type {
  PlayerProfile,
} from "@/app/types";

import type {
  AtlasAdaptiveStrategy,
} from "./adaptive-strategy.engine";

import type {
  AtlasStrategyFeedback,
} from "./strategy-feedback.engine";

import type {
  AtlasMemoryInsight,
} from "./memory-insight.engine";


export type AtlasPlanStep = {
  id: string;

  title: string;

  description: string;

  priority:
    | "current"
    | "future";

  expectedImpact: string;
};


export type AtlasStrategicPlan = {
  title: string;

  objective: string;

  timeframe: string;

  steps: AtlasPlanStep[];

  projectedOutcome: string;

  confidence: number;
};


export function buildAtlasStrategicPlan(
  profile: PlayerProfile,
  adaptiveStrategy: AtlasAdaptiveStrategy,
  strategyFeedback: AtlasStrategyFeedback,
  memoryInsight: AtlasMemoryInsight
): AtlasStrategicPlan {

  const steps: AtlasPlanStep[] = [];


  steps.push({
    id: "stabilize-growth",

    title:
      "Execute current recommended strategy",

    description:
      "Follow Atlas' highest-confidence recommendation based on your current empire position.",

    priority:
      "current",

    expectedImpact:
      adaptiveStrategy.adjustments[0] ??
      "Increase empire growth efficiency.",
  });


  steps.push({
    id: "optimize-income",

    title:
      "Optimize existing income streams",

    description:
      "Improve current assets before making unnecessary expansion decisions.",

    priority:
      "future",

    expectedImpact:
      "Create stronger long-term cash flow.",
  });


  steps.push({
    id: "expand-empire",

    title:
      "Expand empire strategically",

    description:
      "Reinvest profits into assets aligned with your learned playstyle.",

    priority:
      "future",

    expectedImpact:
      strategyFeedback.futureAdjustment,
  });


  return {
    title:
      "Atlas Strategic Roadmap",

    objective:
      profile.playstyle === "business"
        ? "Build the strongest possible empire through optimized investments."
        : "Progress efficiently while matching your preferred playstyle.",

    timeframe:
      "30 Day Strategy",

    steps,

    projectedOutcome:
      memoryInsight.insight,

    confidence:
      Math.min(
        100,
        (
          adaptiveStrategy.confidence +
          strategyFeedback.confidence
        ) / 2
      ),
  };
}