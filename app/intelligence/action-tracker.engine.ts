import type { AtlasDecisionHistoryItem } from "./decision-history.engine";

export type PlayerActionStatus =
  | "started"
  | "completed"
  | "abandoned";


export type AtlasPlayerAction = {
  id: string;

  decisionId: string;

  title: string;

  status: PlayerActionStatus;

  startedAt: string;

  completedAt?: string;

  notes: string;
};


export function buildPlayerAction(
  decision: AtlasDecisionHistoryItem
): AtlasPlayerAction {
  return {
    id: `action-${decision.id}`,

    decisionId:
      decision.id,

    title:
      decision.title,

    status:
      "started",

    startedAt:
      "Today",

    notes:
      "Atlas is tracking the outcome of this strategic decision.",
  };
}