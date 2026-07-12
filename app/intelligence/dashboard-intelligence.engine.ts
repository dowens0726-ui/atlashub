import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";

import {
  getAllMissions,
} from "@/app/services";

import {
  getAtlasAdvisorRecommendations,
  getPrimaryAtlasRecommendation,
} from "./advisor.service";

import {
  buildDecisionHistory,
  type AtlasDecisionHistoryItem,
} from "./decision-history.engine";

import {
  buildAtlasLearning,
} from "./learning.engine";

import {
  buildAtlasOutcome,
  type AtlasOutcome,
} from "./outcome.engine";

import {
  buildOutcomeValidation,
  type AtlasValidatedOutcome,
} from "./outcome-validation.engine";

import {
  buildPlayerAction,
  type AtlasPlayerAction,
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

import {
  buildMissionStrategy,
} from "./mission-strategy.engine";

import {
  buildMissionLearning,
} from "./mission-learning.engine";

import {
  buildMissionFeedback,
} from "./mission-feedback.engine";

import {
  buildMissionOutcome,
} from "./mission-outcome.engine";

import {
  buildMissionLearningUpdate,
} from "./mission-learning-update.engine";


export type AtlasBrainHistory = {
  decisions: AtlasDecisionHistoryItem[];

  actions: AtlasPlayerAction[];

  outcomes: AtlasOutcome[];

  validations: AtlasValidatedOutcome[];
};


export type AtlasBrainInput = {
  profile: PlayerProfile;

  empire: EmpireModel;

  history?: AtlasBrainHistory;
};


const emptyAtlasBrainHistory:
  AtlasBrainHistory = {
    decisions: [],

    actions: [],

    outcomes: [],

    validations: [],
  };


function getLatestDecision(
  history: AtlasBrainHistory,
  fallbackDecision: AtlasDecisionHistoryItem
): AtlasDecisionHistoryItem {
  return (
    history.decisions[0] ??
    fallbackDecision
  );
}


function getActionForDecision(
  history: AtlasBrainHistory,
  decision: AtlasDecisionHistoryItem,
  fallbackAction: AtlasPlayerAction
): AtlasPlayerAction {
  return (
    history.actions.find(
      (action) =>
        action.decisionId ===
        decision.id
    ) ??
    fallbackAction
  );
}


function getOutcomeForDecision(
  history: AtlasBrainHistory,
  decision: AtlasDecisionHistoryItem,
  fallbackOutcome: AtlasOutcome
): AtlasOutcome {
  return (
    history.outcomes.find(
      (outcome) =>
        outcome.decisionId ===
        decision.id
    ) ??
    fallbackOutcome
  );
}


function getValidationForAction(
  history: AtlasBrainHistory,
  action: AtlasPlayerAction,
  outcome: AtlasOutcome,
  fallbackValidation: AtlasValidatedOutcome
): AtlasValidatedOutcome {
  return (
    history.validations.find(
      (validation) =>
        validation.actionId ===
          action.id ||
        validation.outcomeId ===
          outcome.id
    ) ??
    fallbackValidation
  );
}


export function buildAtlasBrain({
  profile,
  empire,
  history = emptyAtlasBrainHistory,
}: AtlasBrainInput) {
  const atlasRecommendations =
    getAtlasAdvisorRecommendations(
      profile
    );

  const atlasRecommendation =
    getPrimaryAtlasRecommendation(
      profile
    );

  const personalPicks =
    getPersonalPicks(
      profile
    );

  const playerIdentity =
    buildPlayerIdentity(
      profile
    );

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


  /*
   * These fallback models preserve the existing dashboard contract when
   * no persisted lifecycle record exists yet.
   *
   * They are display previews only. They are not supplied to the learning
   * engine unless they exist in persisted history.
   */
  const fallbackDecision =
    buildDecisionHistory(
      atlasRecommendation
    );

  const decisionHistory =
    getLatestDecision(
      history,
      fallbackDecision
    );

  const fallbackPlayerAction =
    buildPlayerAction(
      decisionHistory
    );

  const playerAction =
    getActionForDecision(
      history,
      decisionHistory,
      fallbackPlayerAction
    );

  const fallbackOutcome =
    buildAtlasOutcome(
      decisionHistory
    );

  const outcome =
    getOutcomeForDecision(
      history,
      decisionHistory,
      fallbackOutcome
    );

  const fallbackOutcomeValidation =
    buildOutcomeValidation(
      playerAction,
      outcome
    );

  const outcomeValidation =
    getValidationForAction(
      history,
      playerAction,
      outcome,
      fallbackOutcomeValidation
    );


  /*
   * Learning uses persisted history only.
   *
   * Generated fallback models are intentionally excluded so Atlas does not
   * learn from recommendations or outcomes that the player never confirmed.
   */
  const learningProfile =
    buildAtlasLearning(
      history.decisions,
      history.validations
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

  const missionStrategy =
    buildMissionStrategy(
      getAllMissions(),
      predictedRecommendation,
      playerIdentity,
      profile
    );

  const missionLearning =
    missionStrategy.mission
      ? buildMissionLearning(
          missionStrategy.mission,
          profile,
          learningProfile
        )
      : null;

  const missionFeedback =
    missionStrategy.mission
      ? buildMissionFeedback(
          missionStrategy.mission.id,
          missionStrategy.mission.title,
          "recommended",
          {
            selectedVehicle:
              missionStrategy
                .loadout
                .vehicle
                ?.name,

            selectedWeapon:
              missionStrategy
                .loadout
                .weapon
                ?.name,
          }
        )
      : null;

  const missionOutcome =
    missionFeedback
      ? buildMissionOutcome(
          missionFeedback
        )
      : null;

  const missionLearningUpdate =
    missionLearning &&
    missionOutcome
      ? buildMissionLearningUpdate(
          missionOutcome,
          missionLearning
        )
      : null;

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

    missionStrategy,

    missionLearning,

    missionFeedback,

    missionOutcome,

    missionLearningUpdate,

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

    outcomeValidation,

    outcome,

    learningProfile,

    recommendationPrediction,

    history,
  };
}


export type AtlasBrainModel =
  ReturnType<typeof buildAtlasBrain>;