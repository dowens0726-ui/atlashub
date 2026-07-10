import type { AtlasDecisionHistoryItem } from "./decision-history.engine";

export type OutcomeRating =
  | "positive"
  | "neutral"
  | "negative";


export type AtlasOutcome = {
  id: string;

  decisionId: string;

  title: string;

  rating: OutcomeRating;

  empireScoreChange: number;

  incomeChange: number;

  summary: string;
};


export function buildAtlasOutcome(
  decision: AtlasDecisionHistoryItem
): AtlasOutcome {
  const positive =
    decision.confidence >= 85;

  return {
    id: `outcome-${decision.id}`,

    decisionId:
      decision.id,

    title:
      decision.title,

    rating:
      positive
        ? "positive"
        : "neutral",

    empireScoreChange:
      positive
        ? 8
        : 3,

    incomeChange:
      decision.expectedImpact.includes("$")
        ? 500000
        : 0,

    summary:
      positive
        ? "Atlas identified this as a successful strategic decision."
        : "Atlas is monitoring the result of this decision.",
  };
}