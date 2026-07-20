import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";


import {
  buildAtlasLifecyclePipeline,
  buildAtlasMissionPipeline,
  buildAtlasProjectionPipeline,
  buildAtlasRecommendationPipeline,
  buildAtlasStrategyPipeline,
} from "./brain";
import {
  getAllMissions,
} from "@/app/services";

import {
  getAtlasAdvisorRecommendations,
  getPrimaryAtlasRecommendation,
} from "./advisor.service";


import {
  buildAtlasCoach,
} from "./coach.engine";

import {
  buildDailyObjectives,
} from "./daily-objectives.engine";



import {
  buildAtlasGreeting,
} from "./greeting.engine";

import {
  buildIdentityAdvisor,
} from "./identity-advisor.engine";

import {
  buildAtlasImpact,
} from "./impact.engine";

import {
  buildIntelligenceFeed,
} from "./intelligence-feed.engine";

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
  buildNextAction,
} from "./next-action.engine";

import {
  getPersonalPicks,
} from "./personal-picks.engine";


import {
  buildPlayerIdentity,
} from "./player-identity.engine";



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
  buildAtlasStrategyReport,
} from "./strategy-report.engine";


import {
  analyzeAtlasSituation,
} from "./situation-analysis.engine";

import {
  buildAtlasSituationBriefing,
} from "./atlas-situation-briefing.engine";


export type AtlasBrainHistory =
  import("./brain").AtlasBrainHistory;



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

  const situation =
    analyzeAtlasSituation({
     profile,
      empire,
   });

  const situationBriefing =
    buildAtlasSituationBriefing(
     situation
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

  const atlasGreeting =
    buildAtlasGreeting(
      profile
    );

  const projectionPipeline =
    buildAtlasProjectionPipeline({
      profile,

      empire,

      impact:
        atlasImpact,

      recommendation:
        atlasRecommendation,
    });


  const {
    empireForecast,

    empireSimulation,

    empireTimeline,
  } = projectionPipeline;


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

  const lifecycle =
    buildAtlasLifecyclePipeline({
      history,

      recommendation:
        atlasRecommendation,

      identity:
        playerIdentity,
    });


  const {
    decisionHistory,

    playerAction,

    outcome,

    outcomeValidation,

    learningProfile,

    behaviorProfile,

    intelligenceTimeline,
  } = lifecycle;


  const memoryInsight =
    buildMemoryInsight(
      atlasMemory,
      learningProfile
    );


  const recommendationPipeline =
    buildAtlasRecommendationPipeline({
      recommendation:
        atlasRecommendation,

      profile,

      empire,

      identity:
        playerIdentity,

      behavior:
        behaviorProfile,

      learning:
        learningProfile,

      memoryInsight,

      situation,
    });


  const {
    recommendationPrediction,

    recommendationWeighting,

    weightedRecommendation,
  } = recommendationPipeline;


  const coachBriefing =
  buildAtlasCoach({
    greeting: atlasGreeting,
    recommendation:
      weightedRecommendation,
    forecast:
      empireForecast,
    learning:
      learningProfile,
    behavior:
      behaviorProfile,
    identity:
      playerIdentity,
    memoryInsight,
    situationBriefing,
  });


  const strategyPipeline =
    buildAtlasStrategyPipeline({
      recommendation:
        weightedRecommendation,

      identity:
        playerIdentity,

      memoryInsight,

      learning:
        learningProfile,

      outcome,

      outcomeValidation,

      profile,
    });


  const {
    adaptiveStrategy,

    strategyFeedback,

    strategicPlan,
  } = strategyPipeline;


  const missionPipeline =
    buildAtlasMissionPipeline({
      missions:
        getAllMissions(),

      recommendation:
        weightedRecommendation,

      identity:
        playerIdentity,

      profile,

      learning:
        learningProfile,
    });


  const {
    missionStrategy,

    missionLearning,

    missionFeedback,

    missionOutcome,

    missionLearningUpdate,
  } = missionPipeline;


  const intelligenceFeed =
    buildIntelligenceFeed(
      profile
    );

  const strategyReport =
  buildAtlasStrategyReport(
    weightedRecommendation,
    atlasReasoning,
    empireSimulation,
    empireForecast,
    atlasMemory,
    nextAction,
    situationBriefing
  );


  return {
    atlasRecommendations,

    atlasRecommendation:
      weightedRecommendation,

    personalPicks,

    atlasGreeting,

    coachBriefing,

    playerIdentity,

    situation,

    situationBriefing,

    behaviorProfile,

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

    intelligenceTimeline,

    strategyReport,

    decisionHistory,

    playerAction,

    outcomeValidation,

    outcome,

    learningProfile,

    recommendationPrediction,

    recommendationWeighting,

    history,
  };
}


export type AtlasBrainModel =
  ReturnType<typeof buildAtlasBrain>;

