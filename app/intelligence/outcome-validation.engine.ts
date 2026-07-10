import type { 
  AtlasOutcome 
} from "./outcome.engine";

import type {
  AtlasPlayerAction,
} from "./action-tracker.engine";


export type OutcomeValidationStatus =
  | "confirmed"
  | "pending"
  | "failed";


export type AtlasValidatedOutcome = {
  id: string;

  actionId: string;

  outcomeId: string;

  status: OutcomeValidationStatus;

  successScore: number;

  summary: string;
};


export function buildOutcomeValidation(
  action: AtlasPlayerAction,
  outcome: AtlasOutcome
): AtlasValidatedOutcome {

  const completed =
    action.status === "completed";


  return {
    id: `validation-${action.id}`,

    actionId:
      action.id,

    outcomeId:
      outcome.id,

    status:
      completed
        ? "confirmed"
        : "pending",

    successScore:
      completed
        ? outcome.empireScoreChange * 10
        : 0,

    summary:
      completed
        ? "Atlas confirmed this strategic decision produced results."
        : "Atlas is waiting for the action result before updating learning.",
  };
}