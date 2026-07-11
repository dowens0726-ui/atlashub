import type {
  AtlasMissionOutcome,
} from "./mission-outcome.engine";

import type {
  AtlasMissionLearning,
} from "./mission-learning.engine";


export type AtlasMissionLearningUpdate = {
  title: string;

  confidenceChange: number;

  addedPatterns: string[];

  removedPatterns: string[];

  recommendationAdjustment: string;

  updatedConfidence: number;
};


export function buildMissionLearningUpdate(
  outcome: AtlasMissionOutcome,
  learning: AtlasMissionLearning
): AtlasMissionLearningUpdate {

  const addedPatterns: string[] = [];
  const removedPatterns: string[] = [];


  if (outcome.success) {
    addedPatterns.push(
      "Successful mission strategies should receive higher recommendation priority."
    );
  }


  if (
    outcome.equipmentEffectiveness >= 80
  ) {
    addedPatterns.push(
      "Current equipment selection aligns with successful outcomes."
    );
  }


  if (
    outcome.efficiencyScore >= 85
  ) {
    addedPatterns.push(
      "Player demonstrates strong mission execution efficiency."
    );
  }


  if (
    !outcome.success
  ) {
    removedPatterns.push(
      "Avoid repeating unsuccessful mission approaches without adjustments."
    );
  }


  const confidenceChange =
    outcome.success
      ? 10
      : -5;


  const updatedConfidence =
    Math.max(
      0,
      Math.min(
        100,
        learning.confidence +
          confidenceChange
      )
    );


  return {
    title:
      "Atlas Mission Learning Update",


    confidenceChange,


    addedPatterns,


    removedPatterns,


    recommendationAdjustment:
      outcome.success
        ? "Increase confidence in similar mission recommendations."
        : "Reduce confidence in similar mission recommendations until improved results appear.",


    updatedConfidence,
  };
}