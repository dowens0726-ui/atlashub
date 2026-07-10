import type { AtlasDecisionHistoryItem } from "./decision-history.engine";
import type { AtlasValidatedOutcome } from "./outcome-validation.engine";

export type AtlasLearningStage =
  | "Observing"
  | "Recognizing"
  | "Validated"
  | "Predictive";

export type AtlasLearningProfile = {
  title: string;

  patterns: string[];

  validatedPatterns: string[];

  successfulActions: number;

  learningStage: AtlasLearningStage;

  confidence: number;

  summary: string;
};


export function buildAtlasLearning(
  history: AtlasDecisionHistoryItem[],
  validations: AtlasValidatedOutcome[]
): AtlasLearningProfile {
  const patterns: string[] = [];
  const validatedPatterns: string[] = [];

  const successfulActions =
    validations.filter(
      (validation) =>
        validation.status === "confirmed" &&
        validation.successScore > 0
    ).length;


  if (history.length === 0) {
    return {
      title: "Atlas Learning",

      patterns: [
        "Atlas is still learning your decision patterns.",
      ],

      validatedPatterns: [],

      successfulActions: 0,

      learningStage: "Observing",

      confidence: 0,

      summary:
        "Complete more strategic actions to help Atlas understand your playstyle.",
    };
  }


  const latestDecision =
    history[0];


  if (
    latestDecision.category === "business"
  ) {
    patterns.push(
      "You prioritize building long-term income assets."
    );
  }


  if (
    latestDecision.confidence >= 85
  ) {
    patterns.push(
      "You tend to make high-confidence strategic decisions."
    );
  }


  if (
    latestDecision.reasons.some(
      (reason) =>
        reason
          .toLowerCase()
          .includes("solo")
    )
  ) {
    patterns.push(
      "You prefer efficient solo progression strategies."
    );
  }


  if (
    successfulActions > 0
  ) {
    validatedPatterns.push(
      "Confirmed: Successful strategic actions are improving Atlas recommendations."
    );
  }


  if (
    successfulActions >= 3
  ) {
    validatedPatterns.push(
      "Confirmed: You consistently execute profitable strategies."
    );
  }


  if (patterns.length === 0) {
    patterns.push(
      "Atlas is still refining your strategic profile."
    );
  }


  let learningStage: AtlasLearningStage =
    "Recognizing";


  if (
    successfulActions >= 3
  ) {
    learningStage = "Predictive";
  } else if (
    successfulActions > 0
  ) {
    learningStage = "Validated";
  }


  return {
    title: "Atlas Learning",

    patterns,

    validatedPatterns,

    successfulActions,

    learningStage,

    confidence:
      Math.min(
        100,
        50 +
          history.length * 10 +
          successfulActions * 10
      ),

    summary:
      successfulActions > 0
        ? "Atlas is improving recommendations using validated player outcomes."
        : "Atlas is adapting future recommendations based on previous strategic choices.",
  };
}