import type {
  AtlasPlayerAction,
} from "./action-tracker.engine";

import type {
  AtlasDecisionHistoryItem,
} from "./decision-history.engine";

import type {
  AtlasLearningProfile,
} from "./learning.engine";

import type {
  AtlasOutcome,
} from "./outcome.engine";

import type {
  AtlasPlayerIdentity,
} from "./player-identity.engine";


export type AtlasBehaviorRisk =
  | "Low"
  | "Medium"
  | "High";


export type AtlasBehaviorProfile = {
  title: string;

  businessPreference: number;

  missionPreference: number;

  vehiclePreference: number;

  completionRate: number;

  abandonmentRate: number;

  averageRisk: AtlasBehaviorRisk;

  playPattern: string;

  strongestCategory: string;

  confidence: number;

  summary: string;
};


export type AtlasBehaviorInput = {
  decisions: AtlasDecisionHistoryItem[];

  actions: AtlasPlayerAction[];

  outcomes: AtlasOutcome[];

  learning: AtlasLearningProfile;

  identity: AtlasPlayerIdentity;
};


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


function getCategoryPreference(
  decisions: AtlasDecisionHistoryItem[],
  category: string
): number {
  const matchingDecisions =
    decisions.filter(
      (decision) =>
        decision.category ===
        category
    ).length;

  return calculatePercentage(
    matchingDecisions,
    decisions.length
  );
}


function getCompletionRate(
  actions: AtlasPlayerAction[]
): number {
  const completedActions =
    actions.filter(
      (action) =>
        action.status ===
        "completed"
    ).length;

  return calculatePercentage(
    completedActions,
    actions.length
  );
}


function getAverageRisk(
  outcomes: AtlasOutcome[],
  learning: AtlasLearningProfile
): AtlasBehaviorRisk {
  const reportedOutcomes =
    outcomes.filter(
      (outcome) =>
        outcome.source ===
        "player-reported"
    );

  if (
    learning.abandonmentRate >= 40 ||
    learning.failureRate >= 50
  ) {
    return "High";
  }

  if (
    reportedOutcomes.length >= 3 &&
    learning.successRate >= 75 &&
    learning.abandonmentRate <= 20
  ) {
    return "Low";
  }

  return "Medium";
}


function getStrongestCategory(
  businessPreference: number,
  missionPreference: number,
  vehiclePreference: number
): string {
  const categories = [
    {
      label: "Business",
      value: businessPreference,
    },
    {
      label: "Mission",
      value: missionPreference,
    },
    {
      label: "Vehicle",
      value: vehiclePreference,
    },
  ];

  return categories.sort(
    (first, second) =>
      second.value -
      first.value
  )[0].label;
}


function getPlayPattern(
  strongestCategory: string,
  completionRate: number,
  abandonmentRate: number,
  identity: AtlasPlayerIdentity
): string {
  if (
    strongestCategory === "Business" &&
    completionRate >= 70
  ) {
    return "Consistent Empire Growth";
  }

  if (
    strongestCategory === "Mission" &&
    completionRate >= 70
  ) {
    return "Mission-Focused Progression";
  }

  if (
    strongestCategory === "Vehicle"
  ) {
    return "Collection and Performance Focus";
  }

  if (
    abandonmentRate >= 40
  ) {
    return "Exploratory Strategy Switching";
  }

  return `${identity.strategy} Behavior`;
}


export function buildBehaviorProfile({
  decisions,
  actions,
  outcomes,
  learning,
  identity,
}: AtlasBehaviorInput): AtlasBehaviorProfile {
  const businessPreference =
    getCategoryPreference(
      decisions,
      "business"
    );

  const missionPreference =
    getCategoryPreference(
      decisions,
      "mission"
    );

  const vehiclePreference =
    getCategoryPreference(
      decisions,
      "vehicle"
    );

  const completionRate =
    getCompletionRate(
      actions
    );

  const abandonmentRate =
    calculatePercentage(
      actions.filter(
        (action) =>
          action.status ===
          "abandoned"
      ).length,
      actions.length
    );

  const strongestCategory =
    getStrongestCategory(
      businessPreference,
      missionPreference,
      vehiclePreference
    );

  const averageRisk =
    getAverageRisk(
      outcomes,
      learning
    );

  const playPattern =
    getPlayPattern(
      strongestCategory,
      completionRate,
      abandonmentRate,
      identity
    );

  const historyConfidence =
    Math.min(
      40,
      decisions.length * 6
    );

  const actionConfidence =
    Math.min(
      30,
      actions.length * 5
    );

  const learningConfidence =
    Math.round(
      learning.confidence * 0.3
    );

  const confidence =
    clampPercentage(
      historyConfidence +
        actionConfidence +
        learningConfidence
    );

  const summary =
    decisions.length === 0
      ? "Atlas needs more recorded decisions before it can identify reliable behavioral patterns."
      : `Atlas observes a ${strongestCategory.toLowerCase()}-focused playstyle with a ${completionRate}% completion rate and ${averageRisk.toLowerCase()} behavioral risk.`;

  return {
    title:
      "Observed Player Behavior",

    businessPreference,

    missionPreference,

    vehiclePreference,

    completionRate,

    abandonmentRate,

    averageRisk,

    playPattern,

    strongestCategory,

    confidence,

    summary,
  };
}