import type {
  AtlasRecommendation,
  AtlasReasoning,
  EmpireForecast,
  EmpireSimulation,
  AtlasMemory,
  NextAction,
  AtlasSituationBriefing,
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
  nextAction: NextAction,
  situationBriefing: AtlasSituationBriefing
): AtlasStrategyReport {
  return {
    title:
      "Empire Growth Strategy",

    empireStatus:
      situationBriefing.headline,

    strength:
      situationBriefing.strengths[0] ??
      memory.playerInsights[0] ??
      "Atlas is still learning your empire strategy.",

    recommendedMove:
      recommendation.title,

    reasoning: [
      situationBriefing.summary,
      ...reasoning.reasons,
    ],

    simulationSummary:
      `${simulation.targetName} creates a ${simulation.risk.toLowerCase()} risk move with a projected +${simulation.scoreDelta} empire score impact.`,

    forecastSummary:
      `${forecast.outlook} ${situationBriefing.nextStep}`,

    nextFocus:
      situationBriefing.primaryFocus,
  };
}