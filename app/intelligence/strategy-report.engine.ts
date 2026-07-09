import type {
  AtlasRecommendation,
  AtlasReasoning,
  EmpireForecast,
  EmpireSimulation,
  AtlasMemory,
  NextAction,
} from "@/app/intelligence";

export type AtlasStrategyReport = {
  title: string;
  empireStatus: string;
  strength: string;
  recommendedMove: string;
  reasoning: string[];
  simulationSummary: string;
  forecastSummary: string;
  nextFocus: string;
};

export function buildAtlasStrategyReport(
  recommendation: AtlasRecommendation,
  reasoning: AtlasReasoning,
  simulation: EmpireSimulation,
  forecast: EmpireForecast,
  memory: AtlasMemory,
  nextAction: NextAction
): AtlasStrategyReport {
  return {
    title: "Empire Growth Strategy",

    empireStatus:
      memory.learnedPattern,

    strength:
      memory.playerInsights[0] ??
      "Atlas is still learning your empire strategy.",

    recommendedMove:
      recommendation.title,

    reasoning:
      reasoning.reasons,

    simulationSummary:
      `${simulation.targetName} creates a ${simulation.risk.toLowerCase()} risk move with a projected +${simulation.scoreDelta} empire score impact.`,

    forecastSummary:
      forecast.outlook,

    nextFocus:
      nextAction.title,
  };
}