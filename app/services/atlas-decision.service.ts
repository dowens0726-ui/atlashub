import {
  buildDecisionHistory,
  type AtlasDecisionHistoryItem,
} from "@/app/intelligence/decision-history.engine";

import {
  buildPlayerAction,
  type AtlasPlayerAction,
} from "@/app/intelligence/action-tracker.engine";

import type {
  AtlasRecommendation,
} from "@/app/intelligence/recommendation.engine";

import {
  getAtlasIntelligenceState,
  recordAtlasAction,
  recordAtlasDecision,
  updateAtlasAction,
} from "@/app/store/atlas-intelligence.store";


export type AtlasDecisionLifecycleError =
  | "decision-not-found"
  | "action-not-found"
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

  return recordAtlasDecision(
    decision
  );
}


export function startAtlasDecision(
  decisionId: string
): AtlasDecisionLifecycleResult<AtlasPlayerAction> {
  const state =
    getAtlasIntelligenceState();

  const decision =
    state.decisions.find(
      (item) =>
        item.id === decisionId
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

  return {
    ok: true,

    data:
      recordAtlasAction(
        action
      ),
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
        item.id === actionId
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
        item.id === actionId
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

  return {
    ok: true,

    data:
      updatedAction,
  };
}