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


type PersistedAtlasIntelligenceState =
  AtlasIntelligenceState;


type AtlasIntelligenceStore =
  AtlasIntelligenceState & {
    hydrated: boolean;

    hydrateIntelligence:
      () => AtlasIntelligenceState;

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


function persistState(
  state: AtlasIntelligenceState
): void {
  saveToStorage(
    ATLAS_INTELLIGENCE_STORAGE_KEY,
    state
  );
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


      recordDecision: (
        decision
      ) => {
        const decisions =
          limitHistory([
            decision,

            ...get().decisions.filter(
              (existingDecision) =>
                existingDecision.id !==
                decision.id
            ),
          ]);

        const nextState = {
          decisions,

          actions:
            get().actions,

          outcomes:
            get().outcomes,

          validations:
            get().validations,
        };

        persistState(nextState);

        set({
          decisions,
        });

        return decision;
      },


      recordAction: (
        action
      ) => {
        const actions =
          limitHistory([
            action,

            ...get().actions.filter(
              (existingAction) =>
                existingAction.id !==
                action.id
            ),
          ]);

        const nextState = {
          decisions:
            get().decisions,

          actions,

          outcomes:
            get().outcomes,

          validations:
            get().validations,
        };

        persistState(nextState);

        set({
          actions,
        });

        return action;
      },


      recordOutcome: (
        outcome
      ) => {
        const outcomes =
          limitHistory([
            outcome,

            ...get().outcomes.filter(
              (existingOutcome) =>
                existingOutcome.id !==
                outcome.id
            ),
          ]);

        const nextState = {
          decisions:
            get().decisions,

          actions:
            get().actions,

          outcomes,

          validations:
            get().validations,
        };

        persistState(nextState);

        set({
          outcomes,
        });

        return outcome;
      },


      recordValidation: (
        validation
      ) => {
        const validations =
          limitHistory([
            validation,

            ...get().validations.filter(
              (existingValidation) =>
                existingValidation.id !==
                validation.id
            ),
          ]);

        const nextState = {
          decisions:
            get().decisions,

          actions:
            get().actions,

          outcomes:
            get().outcomes,

          validations,
        };

        persistState(nextState);

        set({
          validations,
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

        const actions =
          get().actions.map(
            (action) =>
              action.id === actionId
                ? updatedAction
                : action
          );

        const nextState = {
          decisions:
            get().decisions,

          actions,

          outcomes:
            get().outcomes,

          validations:
            get().validations,
        };

        persistState(nextState);

        set({
          actions,
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
  const state =
    useAtlasIntelligenceStore.getState();

  return {
    decisions:
      state.decisions,

    actions:
      state.actions,

    outcomes:
      state.outcomes,

    validations:
      state.validations,
  };
}


export function recordAtlasDecision(
  decision: AtlasDecisionHistoryItem
): AtlasDecisionHistoryItem {
  return useAtlasIntelligenceStore
    .getState()
    .recordDecision(decision);
}


export function recordAtlasAction(
  action: AtlasPlayerAction
): AtlasPlayerAction {
  return useAtlasIntelligenceStore
    .getState()
    .recordAction(action);
}


export function recordAtlasOutcome(
  outcome: AtlasOutcome
): AtlasOutcome {
  return useAtlasIntelligenceStore
    .getState()
    .recordOutcome(outcome);
}


export function recordAtlasValidation(
  validation: AtlasValidatedOutcome
): AtlasValidatedOutcome {
  return useAtlasIntelligenceStore
    .getState()
    .recordValidation(validation);
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