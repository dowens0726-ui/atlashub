import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";

import {
  getAtlasAdvisorRecommendations,
  getPrimaryAtlasRecommendation,
} from "./advisor.service";

import {
  buildDecisionHistory,
} from "./decision-history.engine";

import {
  buildAtlasLearning,
} from "./learning.engine";

import {
  buildAtlasOutcome,
} from "./outcome.engine";

import {
  buildOutcomeValidation,
} from "./outcome-validation.engine";

import {
  buildPlayerAction,
} from "./action-tracker.engine";

import {
  buildRecommendationPrediction,
} from "./prediction.engine";

import {
  buildPlayerIdentity,
} from "./player-identity.engine";

import {
  buildIdentityAdvisor,
} from "./identity-advisor.engine";

import {
  buildAdaptiveStrategy,
} from "./adaptive-strategy.engine";

import {
  buildStrategyFeedback,
} from "./strategy-feedback.engine";

import {
  buildAtlasStrategicPlan,
} from "./planning.engine";

import {
  getPersonalPicks,
} from "./personal-picks.engine";

import {
  buildAtlasReasoning,
} from "./reasoning.engine";

import {
  buildSessionPlan,
} from "./session.engine";

import {
  buildSessionReasoning,
} from "./session-reasoning.engine";

import {
  buildNextAction,
} from "./next-action.engine";

import {
  buildAtlasImpact,
} from "./impact.engine";

import {
  buildEmpireForecast,
} from "./forecast.engine";

import {
  buildEmpireTimeline,
} from "./timeline.engine";

import {
  buildDailyObjectives,
} from "./daily-objectives.engine";

import {
  buildAtlasMemory,
} from "./memory.engine";

import {
  buildMemoryHistory,
} from "./memory-history.engine";

import {
  buildMemoryInsight,
} from "./memory-insight.engine";

import {
  buildEmpireSimulation,
} from "./empire-simulator.engine";

import {
  buildIntelligenceFeed,
} from "./intelligence-feed.engine";

import {
  buildAtlasStrategyReport,
} from "./strategy-report.engine";


export function buildDashboardIntelligence(
  profile: PlayerProfile,
  empire: EmpireModel
) {
  const atlasRecommendations =
    getAtlasAdvisorRecommendations(profile);


  const atlasRecommendation =
    getPrimaryAtlasRecommendation(profile);


  const personalPicks =
    getPersonalPicks(profile);


  const playerIdentity =
    buildPlayerIdentity(profile);


  const identityAdvisor =
    buildIdentityAdvisor(
      playerIdentity,
      atlasRecommendation
    );


  const atlasReasoning =
    buildAtlasReasoning(
      profile,
      atlasRecommendation
    );


  const sessionPlan =
    buildSessionPlan(
      profile,
      atlasRecommendations
    );


  const sessionReasoning =
    buildSessionReasoning(
      sessionPlan
    );


  const nextAction =
    buildNextAction(
      profile,
      atlasRecommendation,
      sessionReasoning
    );


  const atlasImpact =
    buildAtlasImpact(
      nextAction.confidence
    );


  const empireForecast =
    buildEmpireForecast(
      profile,
      empire,
      atlasImpact
    );


  const empireSimulation =
    buildEmpireSimulation(
      profile,
      atlasRecommendation
    );


  const empireTimeline =
    buildEmpireTimeline(
      empireForecast
    );


  const dailyObjectives =
    buildDailyObjectives(
      profile,
      nextAction,
      empireForecast
    );


  const atlasMemory =
    buildAtlasMemory(
      profile,
      nextAction,
      empireForecast
    );


  const memoryHistory =
    buildMemoryHistory(
      atlasMemory
    );


  const decisionHistory =
    buildDecisionHistory(
      atlasRecommendation
    );


  const outcome =
    buildAtlasOutcome(
      decisionHistory
    );


  const playerAction =
    buildPlayerAction(
      decisionHistory
    );


  const outcomeValidation =
    buildOutcomeValidation(
      playerAction,
      outcome
    );


  const learningProfile =
    buildAtlasLearning(
      [
        decisionHistory,
      ],
      [
        outcomeValidation,
      ]
    );


  const memoryInsight =
    buildMemoryInsight(
      atlasMemory,
      learningProfile
    );


  const recommendationPrediction =
    buildRecommendationPrediction(
      atlasRecommendation,
      learningProfile
    );


  const predictedRecommendation = {
    ...atlasRecommendation,

    confidence:
      Math.min(
        100,
        atlasRecommendation.confidence +
          recommendationPrediction.confidenceBoost
      ),

    prediction:
      recommendationPrediction,
  };


  const adaptiveStrategy =
    buildAdaptiveStrategy(
      predictedRecommendation,
      playerIdentity,
      memoryInsight,
      learningProfile
    );


  const strategyFeedback =
    buildStrategyFeedback(
      outcome,
      outcomeValidation,
      adaptiveStrategy,
      learningProfile
    );


  const strategicPlan =
    buildAtlasStrategicPlan(
      profile,
      adaptiveStrategy,
      strategyFeedback,
      memoryInsight
    );


  const intelligenceFeed =
    buildIntelligenceFeed(
      profile
    );


  const strategyReport =
    buildAtlasStrategyReport(
      predictedRecommendation,
      atlasReasoning,
      empireSimulation,
      empireForecast,
      atlasMemory,
      nextAction
    );


  return {
    atlasRecommendations,

    atlasRecommendation:
      predictedRecommendation,

    personalPicks,

    playerIdentity,

    identityAdvisor,

    adaptiveStrategy,

    strategyFeedback,

    strategicPlan,

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
    memoryInsight,

    intelligenceFeed,

    strategyReport,

    decisionHistory,

    playerAction,

    outcome,

    outcomeValidation,

    learningProfile,

    recommendationPrediction,
  };
}