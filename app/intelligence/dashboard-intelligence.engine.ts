import type { EmpireModel, PlayerProfile } from "@/app/types";

import {
  getAtlasAdvisorRecommendations,
  getPrimaryAtlasRecommendation,
} from "./advisor.service";

import { buildAtlasReasoning } from "./reasoning.engine";
import { buildSessionPlan } from "./session.engine";
import { buildSessionReasoning } from "./session-reasoning.engine";
import { buildNextAction } from "./next-action.engine";
import { buildAtlasImpact } from "./impact.engine";
import { buildEmpireForecast } from "./forecast.engine";
import { buildEmpireTimeline } from "./timeline.engine";
import { buildDailyObjectives } from "./daily-objectives.engine";
import { buildAtlasMemory } from "./memory.engine";
import { buildMemoryHistory } from "./memory-history.engine";
import { buildEmpireSimulation } from "./empire-simulator.engine";
import { buildIntelligenceFeed } from "./intelligence-feed.engine";

export function buildDashboardIntelligence(
  profile: PlayerProfile,
  empire: EmpireModel
) {
  const atlasRecommendations = getAtlasAdvisorRecommendations(profile);

  const atlasRecommendation = getPrimaryAtlasRecommendation(profile);

  const atlasReasoning = buildAtlasReasoning(
    profile,
    atlasRecommendation
  );

  const sessionPlan = buildSessionPlan(
    profile,
    atlasRecommendations
  );

  const sessionReasoning = buildSessionReasoning(sessionPlan);

  const nextAction = buildNextAction(
    profile,
    atlasRecommendation,
    sessionReasoning
  );

  const atlasImpact = buildAtlasImpact(nextAction.confidence);

  const empireForecast = buildEmpireForecast(
    profile,
    empire,
    atlasImpact
  );

  const empireSimulation = buildEmpireSimulation(
    profile,
    atlasRecommendation
  );

  const empireTimeline = buildEmpireTimeline(empireForecast);

  const dailyObjectives = buildDailyObjectives(
    profile,
    nextAction,
    empireForecast
  );

  const atlasMemory = buildAtlasMemory(
    profile,
    nextAction,
    empireForecast
  );

  const memoryHistory = buildMemoryHistory(atlasMemory);

  const intelligenceFeed = buildIntelligenceFeed(profile);

  return {
    atlasRecommendations,
    atlasRecommendation,
    atlasReasoning,
    sessionPlan,
    sessionReasoning,
    nextAction,
    atlasImpact,
    empireForecast,
    empireSimulation,
    empireTimeline,
    dailyObjectives,
    atlasMemory,
    memoryHistory,
    intelligenceFeed,
  };
}