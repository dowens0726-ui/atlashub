"use client";

import { create } from "zustand";

import type {
  AtlasPlayerAction,
} from "@/app/intelligence/action-tracker.engine";

import type {
  AtlasDecisionHistoryItem,
} from "@/app/intelligence/decision-history.engine";

import type {
  AtlasOutcome,
} from "@/app/intelligence/outcome.engine";

import type {
  AtlasValidatedOutcome,
} from "@/app/intelligence/outcome-validation.engine";

import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/app/lib/storage";


const ATLAS_INTELLIGENCE_STORAGE_KEY =
  "atlas:intelligence-state";

const MAX_HISTORY_ITEMS = 50;


export type AtlasIntelligenceState = {
  decisions: AtlasDecisionHistoryItem[];

  actions: AtlasPlayerAction[];

  outcomes: AtlasOutcome[];

  validations: AtlasValidatedOutcome[];
};


export type AtlasLifecycleUpdate = {
  decision?: AtlasDecisionHistoryItem;

  action?: AtlasPlayerAction;

  outcome?: AtlasOutcome;

  validation?: AtlasValidatedOutcome;
};


type PersistedAtlasIntelligenceState =
  AtlasIntelligenceState;


type AtlasIntelligenceStore =
  AtlasIntelligenceState & {
    hydrated: boolean;

    hydrateIntelligence:
      () => AtlasIntelligenceState;

    applyLifecycleUpdate:
      (
        update: AtlasLifecycleUpdate
      ) => AtlasIntelligenceState;

    recordDecision:
      (
        decision: AtlasDecisionHistoryItem
      ) => AtlasDecisionHistoryItem;

    recordAction:
      (
        action: AtlasPlayerAction
      ) => AtlasPlayerAction;

    recordOutcome:
      (
        outcome: AtlasOutcome
      ) => AtlasOutcome;

    recordValidation:
      (
        validation: AtlasValidatedOutcome
      ) => AtlasValidatedOutcome;

    updateAction:
      (
        actionId: string,
        partialAction: Partial<AtlasPlayerAction>
      ) => AtlasPlayerAction | null;

    resetIntelligence:
      () => AtlasIntelligenceState;
  };


const defaultAtlasIntelligenceState:
  AtlasIntelligenceState = {
    decisions: [],

    actions: [],

    outcomes: [],

    validations: [],
  };


function limitHistory<T>(
  items: T[]
): T[] {
  return items.slice(
    0,
    MAX_HISTORY_ITEMS
  );
}


function upsertHistoryItem<
  T extends {
    id: string;
  },
>(
  items: T[],
  item: T
): T[] {
  return limitHistory([
    item,

    ...items.filter(
      (existingItem) =>
        existingItem.id !==
        item.id
    ),
  ]);
}


function persistState(
  state: AtlasIntelligenceState
): void {
  saveToStorage(
    ATLAS_INTELLIGENCE_STORAGE_KEY,
    state
  );
}


function getPersistableState(
  store: AtlasIntelligenceStore
): AtlasIntelligenceState {
  return {
    decisions:
      store.decisions,

    actions:
      store.actions,

    outcomes:
      store.outcomes,

    validations:
      store.validations,
  };
}


export const useAtlasIntelligenceStore =
  create<AtlasIntelligenceStore>(
    (set, get) => ({
      ...defaultAtlasIntelligenceState,

      hydrated: false,


      hydrateIntelligence: () => {
        const storedState =
          loadFromStorage<PersistedAtlasIntelligenceState>(
            ATLAS_INTELLIGENCE_STORAGE_KEY,
            defaultAtlasIntelligenceState
          );

        const nextState:
          AtlasIntelligenceState = {
            decisions:
              Array.isArray(
                storedState.decisions
              )
                ? limitHistory(
                    storedState.decisions
                  )
                : [],

            actions:
              Array.isArray(
                storedState.actions
              )
                ? limitHistory(
                    storedState.actions
                  )
                : [],

            outcomes:
              Array.isArray(
                storedState.outcomes
              )
                ? limitHistory(
                    storedState.outcomes
                  )
                : [],

            validations:
              Array.isArray(
                storedState.validations
              )
                ? limitHistory(
                    storedState.validations
                  )
                : [],
          };

        set({
          ...nextState,

          hydrated: true,
        });

        return nextState;
      },


      applyLifecycleUpdate: (
        update
      ) => {
        const currentState =
          getPersistableState(
            get()
          );

        const nextState:
          AtlasIntelligenceState = {
            decisions:
              update.decision
                ? upsertHistoryItem(
                    currentState.decisions,
                    update.decision
                  )
                : currentState.decisions,

            actions:
              update.action
                ? upsertHistoryItem(
                    currentState.actions,
                    update.action
                  )
                : currentState.actions,

            outcomes:
              update.outcome
                ? upsertHistoryItem(
                    currentState.outcomes,
                    update.outcome
                  )
                : currentState.outcomes,

            validations:
              update.validation
                ? upsertHistoryItem(
                    currentState.validations,
                    update.validation
                  )
                : currentState.validations,
          };

        persistState(
          nextState
        );

        set(
          nextState
        );

        return nextState;
      },


      recordDecision: (
        decision
      ) => {
        get().applyLifecycleUpdate({
          decision,
        });

        return decision;
      },


      recordAction: (
        action
      ) => {
        get().applyLifecycleUpdate({
          action,
        });

        return action;
      },


      recordOutcome: (
        outcome
      ) => {
        get().applyLifecycleUpdate({
          outcome,
        });

        return outcome;
      },


      recordValidation: (
        validation
      ) => {
        get().applyLifecycleUpdate({
          validation,
        });

        return validation;
      },


      updateAction: (
        actionId,
        partialAction
      ) => {
        const existingAction =
          get().actions.find(
            (action) =>
              action.id === actionId
          );

        if (!existingAction) {
          return null;
        }

        const updatedAction:
          AtlasPlayerAction = {
            ...existingAction,

            ...partialAction,

            id:
              existingAction.id,

            decisionId:
              existingAction.decisionId,
          };

        get().applyLifecycleUpdate({
          action:
            updatedAction,
        });

        return updatedAction;
      },


      resetIntelligence: () => {
        removeFromStorage(
          ATLAS_INTELLIGENCE_STORAGE_KEY
        );

        set({
          ...defaultAtlasIntelligenceState,

          hydrated: true,
        });

        return defaultAtlasIntelligenceState;
      },
    })
  );


export function getAtlasIntelligenceState():
  AtlasIntelligenceState {
  return getPersistableState(
    useAtlasIntelligenceStore.getState()
  );
}


export function applyAtlasLifecycleUpdate(
  update: AtlasLifecycleUpdate
): AtlasIntelligenceState {
  return useAtlasIntelligenceStore
    .getState()
    .applyLifecycleUpdate(
      update
    );
}


export function recordAtlasDecision(
  decision: AtlasDecisionHistoryItem
): AtlasDecisionHistoryItem {
  return useAtlasIntelligenceStore
    .getState()
    .recordDecision(
      decision
    );
}


export function recordAtlasAction(
  action: AtlasPlayerAction
): AtlasPlayerAction {
  return useAtlasIntelligenceStore
    .getState()
    .recordAction(
      action
    );
}


export function recordAtlasOutcome(
  outcome: AtlasOutcome
): AtlasOutcome {
  return useAtlasIntelligenceStore
    .getState()
    .recordOutcome(
      outcome
    );
}


export function recordAtlasValidation(
  validation: AtlasValidatedOutcome
): AtlasValidatedOutcome {
  return useAtlasIntelligenceStore
    .getState()
    .recordValidation(
      validation
    );
}


export function updateAtlasAction(
  actionId: string,
  partialAction: Partial<AtlasPlayerAction>
): AtlasPlayerAction | null {
  return useAtlasIntelligenceStore
    .getState()
    .updateAction(
      actionId,
      partialAction
    );
}


export function resetAtlasIntelligence():
  AtlasIntelligenceState {
  return useAtlasIntelligenceStore
    .getState()
    .resetIntelligence();
}