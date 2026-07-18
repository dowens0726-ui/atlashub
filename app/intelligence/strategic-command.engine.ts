import type {
  AtlasBrainModel,
} from "./dashboard-intelligence.engine";

export type StrategicCommandPriority =
  | "Critical"
  | "High"
  | "Medium";

export type StrategicCommandStep = {
  order: number;

  title: string;

  description: string;

  type:
    | "Immediate"
    | "Impact"
    | "Strategy"
    | "Review";
};

export type StrategicCommand = {
  objective: string;

  reasoning: string;

  confidence: number;

  priority: StrategicCommandPriority;

  actionLabel: string;

  href?: string;

  route: StrategicCommandStep[];

  warnings: string[];
};

function normalizeConfidence(
  value: number
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value)
    )
  );
}

function calculateCommandConfidence(
  brain: AtlasBrainModel
): number {
  const recommendationConfidence =
    normalizeConfidence(
      brain
        .atlasRecommendation
        .confidence
    );

  const actionConfidence =
    normalizeConfidence(
      brain
        .nextAction
        .confidence
    );

  return normalizeConfidence(
    (
      recommendationConfidence +
      actionConfidence
    ) / 2
  );
}

function determinePriority(
  confidence: number
): StrategicCommandPriority {
  if (confidence >= 90) {
    return "Critical";
  }

  if (confidence >= 75) {
    return "High";
  }

  return "Medium";
}

function removeDuplicateStrings(
  values: string[]
): string[] {
  const normalizedValues =
    values
      .map(
        (value) =>
          value.trim()
      )
      .filter(Boolean);

  return Array.from(
    new Set(
      normalizedValues
    )
  );
}

function buildCommandRoute(
  brain: AtlasBrainModel
): StrategicCommandStep[] {
  return [
    {
      order: 1,

      title:
        brain.nextAction.title,

      description:
        brain.nextAction.reason,

      type:
        "Immediate",
    },

    {
      order: 2,

      title:
        "Capture the Expected Impact",

      description:
        brain.nextAction.expectedImpact,

      type:
        "Impact",
    },

    {
      order: 3,

      title:
        brain
          .atlasRecommendation
          .title,

      description:
        brain
          .atlasRecommendation
          .summary,

      type:
        "Strategy",
    },

    {
      order: 4,

      title:
        "Review and Adapt",

      description:
        brain
          .strategyFeedback
          .futureAdjustment,

      type:
        "Review",
    },
  ];
}

function buildWarnings(
  brain: AtlasBrainModel
): string[] {
  return removeDuplicateStrings([
    brain
      .strategyFeedback
      .futureAdjustment,
  ]);
}

function buildCommandReasoning(
  brain: AtlasBrainModel
): string {
  return removeDuplicateStrings([
    brain
      .coachBriefing
      .summary,

    brain
      .playerIdentity
      .summary,

    brain
      .nextAction
      .reason,
  ]).join(" ");
}

export function buildStrategicCommand(
  brain: AtlasBrainModel
): StrategicCommand {
  const confidence =
    calculateCommandConfidence(
      brain
    );

  return {
    objective:
      brain.nextAction.title,

    reasoning:
      buildCommandReasoning(
        brain
      ),

    confidence,

    priority:
      determinePriority(
        confidence
      ),

    actionLabel:
      brain
        .nextAction
        .actionLabel,

    href:
      brain
        .nextAction
        .href,

    route:
      buildCommandRoute(
        brain
      ),

    warnings:
      buildWarnings(
        brain
      ),
  };
}