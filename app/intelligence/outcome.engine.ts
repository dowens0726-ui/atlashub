import type {
  AtlasDecisionHistoryItem,
} from "./decision-history.engine";


export type OutcomeRating =
  | "positive"
  | "neutral"
  | "negative";


export type AtlasOutcomeSource =
  | "predicted"
  | "player-reported";


export type AtlasOutcome = {
  id: string;

  decisionId: string;

  actionId?: string;

  title: string;

  rating: OutcomeRating;

  empireScoreChange: number;

  incomeChange: number;

  completionTimeMinutes?: number;

  notes?: string;

  reportedAt?: string;

  source: AtlasOutcomeSource;

  summary: string;
};


export type AtlasOutcomeReportInput = {
  actionId: string;

  rating: OutcomeRating;

  incomeChange: number;

  empireScoreChange: number;

  completionTimeMinutes?: number;

  notes?: string;
};


function createOutcomeId(): string {
  const randomId =
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 10)}`;

  return `outcome-${randomId}`;
}


function createTimestamp(): string {
  return new Date().toISOString();
}


function buildOutcomeSummary(
  rating: OutcomeRating,
  incomeChange: number,
  empireScoreChange: number
): string {
  const incomeSummary =
    incomeChange > 0
      ? `$${incomeChange.toLocaleString()} in reported income`
      : incomeChange < 0
        ? `$${Math.abs(
            incomeChange
          ).toLocaleString()} in reported losses`
        : "no reported income change";

  const empireSummary =
    empireScoreChange > 0
      ? `an empire score gain of ${empireScoreChange}`
      : empireScoreChange < 0
        ? `an empire score decrease of ${Math.abs(
            empireScoreChange
          )}`
        : "no empire score change";

  if (rating === "positive") {
    return `The player reported a successful result with ${incomeSummary} and ${empireSummary}.`;
  }

  if (rating === "negative") {
    return `The player reported an unsuccessful result with ${incomeSummary} and ${empireSummary}.`;
  }

  return `The player reported a neutral result with ${incomeSummary} and ${empireSummary}.`;
}


/**
 * Builds a predicted display outcome.
 *
 * This model is used only when no player-reported outcome exists. It must not
 * be treated as validated learning data.
 */
export function buildAtlasOutcome(
  decision: AtlasDecisionHistoryItem
): AtlasOutcome {
  const positive =
    decision.confidence >= 85;

  return {
    id:
      `predicted-outcome-${decision.id}`,

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

    source:
      "predicted",

    summary:
      positive
        ? "Atlas predicts this strategic decision could produce a positive result."
        : "Atlas is monitoring this decision and waiting for a confirmed result.",
  };
}


/**
 * Builds a real outcome from player-reported performance.
 */
export function buildReportedAtlasOutcome(
  decision: AtlasDecisionHistoryItem,
  report: AtlasOutcomeReportInput
): AtlasOutcome {
  const normalizedNotes =
    report.notes?.trim();

  const normalizedCompletionTime =
    report.completionTimeMinutes !== undefined
      ? Math.max(
          0,
          Math.round(
            report.completionTimeMinutes
          )
        )
      : undefined;

  return {
    id:
      createOutcomeId(),

    decisionId:
      decision.id,

    actionId:
      report.actionId,

    title:
      decision.title,

    rating:
      report.rating,

    empireScoreChange:
      Math.round(
        report.empireScoreChange
      ),

    incomeChange:
      Math.round(
        report.incomeChange
      ),

    completionTimeMinutes:
      normalizedCompletionTime,

    notes:
      normalizedNotes || undefined,

    reportedAt:
      createTimestamp(),

    source:
      "player-reported",

    summary:
      buildOutcomeSummary(
        report.rating,
        Math.round(
          report.incomeChange
        ),
        Math.round(
          report.empireScoreChange
        )
      ),
  };
}