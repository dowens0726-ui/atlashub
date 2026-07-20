import {
  buildPlayerAction,
  type AtlasPlayerAction,
} from "../../action-tracker.engine";

import {
  buildBehaviorProfile,
} from "../../behavioral-intelligence.engine";

import {
  buildDecisionHistory,
  type AtlasDecisionHistoryItem,
} from "../../decision-history.engine";

import {
  buildIntelligenceTimeline,
} from "../../intelligence-timeline.engine";

import {
  buildAtlasLearning,
} from "../../learning.engine";

import {
  buildAtlasOutcome,
  type AtlasOutcome,
} from "../../outcome.engine";

import {
  buildOutcomeValidation,
  type AtlasValidatedOutcome,
} from "../../outcome-validation.engine";

import type {
  AtlasPlayerIdentity,
} from "../../player-identity.engine";

import type {
  AtlasRecommendation,
} from "../../recommendation.engine";


export type AtlasBrainHistory = {
  decisions: AtlasDecisionHistoryItem[];

  actions: AtlasPlayerAction[];

  outcomes: AtlasOutcome[];

  validations: AtlasValidatedOutcome[];
};


export type AtlasLifecyclePipelineInput = {
  history: AtlasBrainHistory;

  recommendation: AtlasRecommendation;

  identity: AtlasPlayerIdentity;
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


export function buildAtlasLifecyclePipeline({
  history,
  recommendation,
  identity,
}: AtlasLifecyclePipelineInput) {
  const fallbackDecision =
    buildDecisionHistory(
      recommendation
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

  const learningProfile =
    buildAtlasLearning(
      history.decisions,
      history.validations,
      history.actions,
      history.outcomes
    );

  const behaviorProfile =
    buildBehaviorProfile({
      decisions:
        history.decisions,

      actions:
        history.actions,

      outcomes:
        history.outcomes,

      learning:
        learningProfile,

      identity,
    });

  const intelligenceTimeline =
    buildIntelligenceTimeline({
      decisions:
        history.decisions,

      actions:
        history.actions,

      outcomes:
        history.outcomes,

      validations:
        history.validations,
    });

  return {
    decisionHistory,

    playerAction,

    outcome,

    outcomeValidation,

    learningProfile,

    behaviorProfile,

    intelligenceTimeline,
  };
}


export type AtlasLifecyclePipelineModel =
  ReturnType<
    typeof buildAtlasLifecyclePipeline
  >;
