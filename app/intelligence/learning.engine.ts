import type {
  AtlasPlayerAction,
} from "./action-tracker.engine";

import type {
  AtlasDecisionHistoryItem,
} from "./decision-history.engine";

import type {
  AtlasOutcome,
} from "./outcome.engine";

import type {
  AtlasValidatedOutcome,
} from "./outcome-validation.engine";


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

  completedStrategies: number;

  failedStrategies: number;

  abandonedStrategies: number;

  successRate: number;

  failureRate: number;

  abandonmentRate: number;

  averageIncome: number;

  averageEmpireScoreGain: number;

  averageCompletionTimeMinutes: number;

  predictionAccuracy: number;

  learningStage: AtlasLearningStage;

  confidence: number;

  summary: string;
};


export type AtlasLearningInput = {
  decisions: AtlasDecisionHistoryItem[];

  actions: AtlasPlayerAction[];

  outcomes: AtlasOutcome[];

  validations: AtlasValidatedOutcome[];
};


const emptyActions: AtlasPlayerAction[] = [];

const emptyOutcomes: AtlasOutcome[] = [];


function calculatePercentage(
  value: number,
  total: number
): number {
  if (total <= 0) {
    return 0;
  }

  return Math.round(
    (value / total) * 100
  );
}


function calculateAverage(
  values: number[]
): number {
  if (values.length === 0) {
    return 0;
  }

  const total =
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  return Math.round(
    total / values.length
  );
}


function clampPercentage(
  value: number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value)
    )
  );
}


function getExpectedIncome(
  decision: AtlasDecisionHistoryItem
): number | null {
  const currencyMatch =
    decision.expectedImpact.match(
      /\$([\d,]+(?:\.\d+)?)/u
    );

  if (!currencyMatch) {
    return null;
  }

  const normalizedValue =
    currencyMatch[1].replace(
      /,/gu,
      ""
    );

  const parsedValue =
    Number(normalizedValue);

  return Number.isFinite(
    parsedValue
  )
    ? parsedValue
    : null;
}


function calculatePredictionAccuracy(
  decisions: AtlasDecisionHistoryItem[],
  outcomes: AtlasOutcome[]
): number {
  const decisionsById =
    new Map(
      decisions.map(
        (decision) => [
          decision.id,
          decision,
        ]
      )
    );

  const accuracyScores =
    outcomes.flatMap(
      (outcome) => {
        if (
          outcome.source !==
          "player-reported"
        ) {
          return [];
        }

        const decision =
          decisionsById.get(
            outcome.decisionId
          );

        if (!decision) {
          return [];
        }

        const expectedIncome =
          getExpectedIncome(
            decision
          );

        if (
          expectedIncome === null ||
          expectedIncome <= 0
        ) {
          return [];
        }

        const difference =
          Math.abs(
            outcome.incomeChange -
              expectedIncome
          );

        const accuracy =
          100 -
          (
            difference /
            expectedIncome
          ) *
            100;

        return [
          clampPercentage(
            accuracy
          ),
        ];
      }
    );

  return calculateAverage(
    accuracyScores
  );
}


function buildEmptyLearningProfile():
  AtlasLearningProfile {
  return {
    title:
      "Atlas Learning",

    patterns: [
      "Atlas is still learning your decision patterns.",
    ],

    validatedPatterns: [],

    successfulActions:
      0,

    completedStrategies:
      0,

    failedStrategies:
      0,

    abandonedStrategies:
      0,

    successRate:
      0,

    failureRate:
      0,

    abandonmentRate:
      0,

    averageIncome:
      0,

    averageEmpireScoreGain:
      0,

    averageCompletionTimeMinutes:
      0,

    predictionAccuracy:
      0,

    learningStage:
      "Observing",

    confidence:
      0,

    summary:
      "Complete more strategic actions to help Atlas understand your playstyle.",
  };
}


/**
 * Builds Atlas learning analytics from persisted player history.
 *
 * The optional actions and outcomes parameters preserve compatibility with
 * existing consumers while the Atlas Brain migrates to the complete history
 * contract.
 */
export function buildAtlasLearning(
  decisions: AtlasDecisionHistoryItem[],
  validations: AtlasValidatedOutcome[],
  actions: AtlasPlayerAction[] =
    emptyActions,
  outcomes: AtlasOutcome[] =
    emptyOutcomes
): AtlasLearningProfile {
  if (decisions.length === 0) {
    return buildEmptyLearningProfile();
  }


  const patterns: string[] = [];

  const validatedPatterns:
    string[] = [];


  const reportedOutcomes =
    outcomes.filter(
      (outcome) =>
        outcome.source ===
        "player-reported"
    );


  const successfulActions =
    reportedOutcomes.filter(
      (outcome) =>
        outcome.rating ===
        "positive"
    ).length;


  const failedStrategies =
    reportedOutcomes.filter(
      (outcome) =>
        outcome.rating ===
        "negative"
    ).length;


  const completedStrategies =
    reportedOutcomes.length;


  const abandonedStrategies =
    actions.filter(
      (action) =>
        action.status ===
        "abandoned"
    ).length;


  const trackedStrategies =
    actions.length;


  const successRate =
    calculatePercentage(
      successfulActions,
      completedStrategies
    );


  const failureRate =
    calculatePercentage(
      failedStrategies,
      completedStrategies
    );


  const abandonmentRate =
    calculatePercentage(
      abandonedStrategies,
      trackedStrategies
    );


  const averageIncome =
    calculateAverage(
      reportedOutcomes.map(
        (outcome) =>
          outcome.incomeChange
      )
    );


  const averageEmpireScoreGain =
    calculateAverage(
      reportedOutcomes.map(
        (outcome) =>
          outcome.empireScoreChange
      )
    );


  const averageCompletionTimeMinutes =
    calculateAverage(
      reportedOutcomes.flatMap(
        (outcome) =>
          outcome
            .completionTimeMinutes !==
          undefined
            ? [
                outcome
                  .completionTimeMinutes,
              ]
            : []
      )
    );


  const predictionAccuracy =
    calculatePredictionAccuracy(
      decisions,
      reportedOutcomes
    );


  const latestDecision =
    decisions[0];


  const businessDecisionCount =
    decisions.filter(
      (decision) =>
        decision.category ===
        "business"
    ).length;


  const businessPreferenceRate =
    calculatePercentage(
      businessDecisionCount,
      decisions.length
    );


  if (
    businessPreferenceRate >= 60
  ) {
    patterns.push(
      "You consistently prioritize long-term income assets."
    );
  }


  if (
    latestDecision.confidence >=
    85
  ) {
    patterns.push(
      "You tend to follow high-confidence strategic recommendations."
    );
  }


  if (
    decisions.some(
      (decision) =>
        decision.reasons.some(
          (reason) =>
            reason
              .toLowerCase()
              .includes("solo")
        )
    )
  ) {
    patterns.push(
      "You prefer efficient solo progression strategies."
    );
  }


  if (
    trackedStrategies >= 3 &&
    abandonmentRate <= 20
  ) {
    patterns.push(
      "You usually follow Atlas strategies through to completion."
    );
  }


  if (
    averageIncome > 0
  ) {
    validatedPatterns.push(
      `Confirmed: Reported strategies average $${averageIncome.toLocaleString()} in income impact.`
    );
  }


  if (
    successfulActions > 0
  ) {
    validatedPatterns.push(
      `Confirmed: ${successfulActions} successful ${
        successfulActions === 1
          ? "strategy has"
          : "strategies have"
      } improved Atlas learning.`
    );
  }


  if (
    successRate >= 75 &&
    completedStrategies >= 3
  ) {
    validatedPatterns.push(
      "Confirmed: Your completed strategies have a strong success rate."
    );
  }


  if (
    failedStrategies > 0
  ) {
    validatedPatterns.push(
      "Atlas is using unsuccessful outcomes to reduce future strategic risk."
    );
  }


  if (
    predictionAccuracy >= 80
  ) {
    validatedPatterns.push(
      "Confirmed: Atlas income predictions closely match your reported results."
    );
  }


  if (
    patterns.length === 0
  ) {
    patterns.push(
      "Atlas is still refining your strategic profile."
    );
  }


  const confirmedValidations =
    validations.filter(
      (validation) =>
        validation.status ===
        "confirmed"
    ).length;


  let learningStage:
    AtlasLearningStage =
      "Recognizing";


  if (
    completedStrategies >= 3 &&
    confirmedValidations >= 3
  ) {
    learningStage =
      "Predictive";
  } else if (
    completedStrategies > 0
  ) {
    learningStage =
      "Validated";
  }


  const historyConfidence =
    Math.min(
      30,
      decisions.length * 4
    );


  const outcomeConfidence =
    Math.min(
      35,
      completedStrategies * 10
    );


  const validationConfidence =
    Math.min(
      20,
      confirmedValidations * 5
    );


  const predictionConfidence =
    predictionAccuracy > 0
      ? Math.round(
          predictionAccuracy * 0.15
        )
      : 0;


  const confidence =
    clampPercentage(
      historyConfidence +
        outcomeConfidence +
        validationConfidence +
        predictionConfidence
    );


  return {
    title:
      "Atlas Learning",

    patterns,

    validatedPatterns,

    successfulActions,

    completedStrategies,

    failedStrategies,

    abandonedStrategies,

    successRate,

    failureRate,

    abandonmentRate,

    averageIncome,

    averageEmpireScoreGain,

    averageCompletionTimeMinutes,

    predictionAccuracy,

    learningStage,

    confidence,

    summary:
      completedStrategies > 0
        ? `Atlas has analyzed ${completedStrategies} reported ${
            completedStrategies === 1
              ? "outcome"
              : "outcomes"
          } with a ${successRate}% success rate.`
        : "Atlas is adapting future recommendations based on your recorded strategic decisions.",
  };
}