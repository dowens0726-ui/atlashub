"use client";

import { useEffect } from "react";

import {
  useAtlasIntelligenceStore,
} from "@/app/store/atlas-intelligence.store";


export function useAtlasIntelligence() {
  const decisions =
    useAtlasIntelligenceStore(
      (state) => state.decisions
    );

  const actions =
    useAtlasIntelligenceStore(
      (state) => state.actions
    );

  const outcomes =
    useAtlasIntelligenceStore(
      (state) => state.outcomes
    );

  const validations =
    useAtlasIntelligenceStore(
      (state) => state.validations
    );

  const hydrated =
    useAtlasIntelligenceStore(
      (state) => state.hydrated
    );

  const hydrateIntelligence =
    useAtlasIntelligenceStore(
      (state) =>
        state.hydrateIntelligence
    );

  const recordDecision =
    useAtlasIntelligenceStore(
      (state) => state.recordDecision
    );

  const recordAction =
    useAtlasIntelligenceStore(
      (state) => state.recordAction
    );

  const recordOutcome =
    useAtlasIntelligenceStore(
      (state) => state.recordOutcome
    );

  const recordValidation =
    useAtlasIntelligenceStore(
      (state) => state.recordValidation
    );

  const updateAction =
    useAtlasIntelligenceStore(
      (state) => state.updateAction
    );

  const resetIntelligence =
    useAtlasIntelligenceStore(
      (state) => state.resetIntelligence
    );


  useEffect(() => {
    if (!hydrated) {
      hydrateIntelligence();
    }
  }, [
    hydrated,
    hydrateIntelligence,
  ]);


  return {
    decisions,

    actions,

    outcomes,

    validations,

    hydrated,

    recordDecision,

    recordAction,

    recordOutcome,

    recordValidation,

    updateAction,

    resetIntelligence,
  };
}