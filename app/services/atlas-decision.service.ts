import {
  buildPlayerAction,
  type AtlasPlayerAction,
} from "@/app/intelligence/action-tracker.engine";

import {
  buildDecisionHistory,
  type AtlasDecisionHistoryItem,
} from "@/app/intelligence/decision-history.engine";

import {
  buildReportedAtlasOutcome,
  type AtlasOutcome,
  type AtlasOutcomeReportInput,
} from "@/app/intelligence/outcome.engine";

import type {
  AtlasValidatedOutcome,
  OutcomeValidationStatus,
} from "@/app/intelligence/outcome-validation.engine";

import type {
  AtlasRecommendation,
} from "@/app/intelligence/recommendation.engine";

import {
  publishAtlasEvent,
} from "@/app/store/atlas-events";

import {
  applyAtlasLifecycleUpdate,
  getAtlasIntelligenceState,
  updateAtlasAction,
} from "@/app/store/atlas-intelligence.store";


export type AtlasDecisionLifecycleError =
  | "decision-not-found"
  | "action-not-found"
  | "action-not-completed"
  | "action-already-completed"
  | "action-already-abandoned";


export type AtlasDecisionLifecycleResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: AtlasDecisionLifecycleError;
      message: string;
    };


export type AtlasReportedOutcomeResult = {
  decision: AtlasDecisionHistoryItem;

  action: AtlasPlayerAction;

  outcome: AtlasOutcome;

  validation: AtlasValidatedOutcome;
};


function createLifecycleId(
  prefix: string
): string {
  const randomId =
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 10)}`;

  return `${prefix}-${randomId}`;
}


function createTimestamp(): string {
  return new Date().toISOString();
}


function publishLifecycleEvent(
  type:
    | "strategy-started"
    | "strategy-completed"
    | "strategy-abandoned"
    | "outcome-reported"
    | "outcome-validated",
  payload: Record<string, unknown>
): void {
  publishAtlasEvent({
    id:
      createLifecycleId(
        "event"
      ),

    type,

    timestamp:
      createTimestamp(),

    payload,
  });
}


function getDecisionOutcomeStatus(
  outcome: AtlasOutcome
): AtlasDecisionHistoryItem["outcome"] {
  if (outcome.rating === "positive") {
    return "successful";
  }

  if (outcome.rating === "negative") {
    return "failed";
  }

  return "neutral";
}


function getValidationStatus(
  outcome: AtlasOutcome
): OutcomeValidationStatus {
  if (outcome.rating === "negative") {
    return "failed";
  }

  return "confirmed";
}


function getValidationScore(
  outcome: AtlasOutcome
): number {
  if (outcome.rating === "negative") {
    return 0;
  }

  if (outcome.rating === "neutral") {
    return 50;
  }

  const empireImpactScore =
    Math.max(
      0,
      outcome.empireScoreChange
    ) * 3;

  const incomeImpactScore =
    outcome.incomeChange > 0
      ? Math.min(
          20,
          Math.floor(
            outcome.incomeChange /
              250000
          ) * 5
        )
      : 0;

  return Math.min(
    100,
    70 +
      empireImpactScore +
      incomeImpactScore
  );
}


function buildReportedOutcomeValidation(
  action: AtlasPlayerAction,
  outcome: AtlasOutcome
): AtlasValidatedOutcome {
  const status =
    getValidationStatus(
      outcome
    );

  return {
    id:
      createLifecycleId(
        "validation"
      ),

    actionId:
      action.id,

    outcomeId:
      outcome.id,

    status,

    successScore:
      getValidationScore(
        outcome
      ),

    summary:
      status === "confirmed"
        ? "Atlas confirmed this completed strategy using the result reported by the player."
        : "Atlas recorded that this strategy did not produce the intended result.",
  };
}


export function acceptAtlasRecommendation(
  recommendation: AtlasRecommendation
): AtlasDecisionHistoryItem {
  const generatedDecision =
    buildDecisionHistory(
      recommendation
    );

  const decision:
    AtlasDecisionHistoryItem = {
      ...generatedDecision,

      id:
        createLifecycleId(
          "decision"
        ),

      timestamp:
        createTimestamp(),

      outcome:
        "pending",
    };

  applyAtlasLifecycleUpdate({
    decision,
  });

  return decision;
}


export function startAtlasDecision(
  decisionId: string
): AtlasDecisionLifecycleResult<AtlasPlayerAction> {
  const state =
    getAtlasIntelligenceState();

  const decision =
    state.decisions.find(
      (item) =>
        item.id ===
        decisionId
    );

  if (!decision) {
    return {
      ok: false,

      error:
        "decision-not-found",

      message:
        "Atlas could not find the selected strategic decision.",
    };
  }

  const existingAction =
    state.actions.find(
      (action) =>
        action.decisionId ===
        decisionId
    );

  if (existingAction) {
    return {
      ok: true,

      data:
        existingAction,
    };
  }

  const generatedAction =
    buildPlayerAction(
      decision
    );

  const action:
    AtlasPlayerAction = {
      ...generatedAction,

      id:
        createLifecycleId(
          "action"
        ),

      startedAt:
        createTimestamp(),

      status:
        "started",
    };

  applyAtlasLifecycleUpdate({
    decision,
    action,
  });

  publishLifecycleEvent(
    "strategy-started",
    {
      recommendationId:
        decision.recommendationId,

      decisionId:
        decision.id,

      actionId:
        action.id,

      title:
        action.title,
    }
  );

  return {
    ok: true,

    data:
      action,
  };
}


export function acceptAndStartAtlasRecommendation(
  recommendation: AtlasRecommendation
): AtlasDecisionLifecycleResult<{
  decision: AtlasDecisionHistoryItem;
  action: AtlasPlayerAction;
}> {
  const generatedDecision =
    buildDecisionHistory(
      recommendation
    );

  const decision:
    AtlasDecisionHistoryItem = {
      ...generatedDecision,

      id:
        createLifecycleId(
          "decision"
        ),

      timestamp:
        createTimestamp(),

      outcome:
        "pending",
    };

  const generatedAction =
    buildPlayerAction(
      decision
    );

  const action:
    AtlasPlayerAction = {
      ...generatedAction,

      id:
        createLifecycleId(
          "action"
        ),

      startedAt:
        createTimestamp(),

      status:
        "started",
    };

  applyAtlasLifecycleUpdate({
    decision,
    action,
  });

  publishLifecycleEvent(
    "strategy-started",
    {
      recommendationId:
        recommendation.id,

      decisionId:
        decision.id,

      actionId:
        action.id,

      title:
        action.title,
    }
  );

  return {
    ok: true,

    data: {
      decision,
      action,
    },
  };
}


export function completeAtlasAction(
  actionId: string,
  notes?: string
): AtlasDecisionLifecycleResult<AtlasPlayerAction> {
  const state =
    getAtlasIntelligenceState();

  const action =
    state.actions.find(
      (item) =>
        item.id ===
        actionId
    );

  if (!action) {
    return {
      ok: false,

      error:
        "action-not-found",

      message:
        "Atlas could not find the selected action.",
    };
  }

  if (
    action.status ===
    "abandoned"
  ) {
    return {
      ok: false,

      error:
        "action-already-abandoned",

      message:
        "An abandoned Atlas action cannot be marked complete.",
    };
  }

  if (
    action.status ===
    "completed"
  ) {
    return {
      ok: true,

      data:
        action,
    };
  }

  const updatedAction =
    updateAtlasAction(
      actionId,
      {
        status:
          "completed",

        completedAt:
          createTimestamp(),

        notes:
          notes?.trim() ||
          "The player completed this Atlas strategy.",
      }
    );

  if (!updatedAction) {
    return {
      ok: false,

      error:
        "action-not-found",

      message:
        "Atlas could not update the selected action.",
    };
  }

  publishLifecycleEvent(
    "strategy-completed",
    {
      decisionId:
        updatedAction.decisionId,

      actionId:
        updatedAction.id,

      title:
        updatedAction.title,

      completedAt:
        updatedAction.completedAt,
    }
  );

  return {
    ok: true,

    data:
      updatedAction,
  };
}


export function abandonAtlasAction(
  actionId: string,
  notes?: string
): AtlasDecisionLifecycleResult<AtlasPlayerAction> {
  const state =
    getAtlasIntelligenceState();

  const action =
    state.actions.find(
      (item) =>
        item.id ===
        actionId
    );

  if (!action) {
    return {
      ok: false,

      error:
        "action-not-found",

      message:
        "Atlas could not find the selected action.",
    };
  }

  if (
    action.status ===
    "completed"
  ) {
    return {
      ok: false,

      error:
        "action-already-completed",

      message:
        "A completed Atlas action cannot be abandoned.",
    };
  }

  if (
    action.status ===
    "abandoned"
  ) {
    return {
      ok: true,

      data:
        action,
    };
  }

  const updatedAction =
    updateAtlasAction(
      actionId,
      {
        status:
          "abandoned",

        notes:
          notes?.trim() ||
          "The player chose not to continue this Atlas strategy.",
      }
    );

  if (!updatedAction) {
    return {
      ok: false,

      error:
        "action-not-found",

      message:
        "Atlas could not update the selected action.",
    };
  }

  publishLifecycleEvent(
    "strategy-abandoned",
    {
      decisionId:
        updatedAction.decisionId,

      actionId:
        updatedAction.id,

      title:
        updatedAction.title,
    }
  );

  return {
    ok: true,

    data:
      updatedAction,
  };
}


export function reportAtlasOutcome(
  report: AtlasOutcomeReportInput
): AtlasDecisionLifecycleResult<AtlasReportedOutcomeResult> {
  const state =
    getAtlasIntelligenceState();

  const action =
    state.actions.find(
      (item) =>
        item.id ===
        report.actionId
    );

  if (!action) {
    return {
      ok: false,

      error:
        "action-not-found",

      message:
        "Atlas could not find the action associated with this outcome.",
    };
  }

  if (
    action.status !==
    "completed"
  ) {
    return {
      ok: false,

      error:
        "action-not-completed",

      message:
        "Complete the Atlas action before reporting its outcome.",
    };
  }

  const decision =
    state.decisions.find(
      (item) =>
        item.id ===
        action.decisionId
    );

  if (!decision) {
    return {
      ok: false,

      error:
        "decision-not-found",

      message:
        "Atlas could not find the decision associated with this action.",
    };
  }

  const existingOutcome =
    state.outcomes.find(
      (outcome) =>
        outcome.actionId ===
        action.id
    );

  const existingValidation =
    existingOutcome
      ? state.validations.find(
          (validation) =>
            validation.outcomeId ===
            existingOutcome.id
        )
      : undefined;

  if (
    existingOutcome &&
    existingValidation
  ) {
    return {
      ok: true,

      data: {
        decision,

        action,

        outcome:
          existingOutcome,

        validation:
          existingValidation,
      },
    };
  }

  const outcome =
    buildReportedAtlasOutcome(
      decision,
      report
    );

  const validation =
    buildReportedOutcomeValidation(
      action,
      outcome
    );

  const updatedDecision:
    AtlasDecisionHistoryItem = {
      ...decision,

      outcome:
        getDecisionOutcomeStatus(
          outcome
        ),
    };

  applyAtlasLifecycleUpdate({
    decision:
      updatedDecision,

    action,

    outcome,

    validation,
  });

  publishLifecycleEvent(
    "outcome-reported",
    {
      decisionId:
        updatedDecision.id,

      actionId:
        action.id,

      outcomeId:
        outcome.id,

      rating:
        outcome.rating,

      incomeChange:
        outcome.incomeChange,

      empireScoreChange:
        outcome.empireScoreChange,
    }
  );

  publishLifecycleEvent(
    "outcome-validated",
    {
      decisionId:
        updatedDecision.id,

      actionId:
        action.id,

      outcomeId:
        outcome.id,

      validationId:
        validation.id,

      status:
        validation.status,

      successScore:
        validation.successScore,
    }
  );

  return {
    ok: true,

    data: {
      decision:
        updatedDecision,

      action,

      outcome,

      validation,
    },
  };
}