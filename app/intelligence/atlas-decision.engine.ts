import type {
  AtlasAdaptiveRecommendation,
  AtlasAdaptiveRecommendationCategory,
  AtlasAdaptiveRecommendationPriority,
  AtlasAdaptiveRecommendationResult,
} from "./atlas-adaptive-recommendation.engine";


export const ATLAS_DECISION_ENGINE_VERSION = 1;


export type AtlasDecisionType =
  | "execute"
  | "prepare"
  | "monitor"
  | "pause"
  | "reassess"
  | "no-action";


export type AtlasDecisionUrgency =
  | "low"
  | "medium"
  | "high"
  | "critical";


export type AtlasDecisionConfidenceLevel =
  | "limited"
  | "developing"
  | "strong"
  | "very-strong";


export type AtlasDecisionStrategicIntent =
  | "generate-momentum"
  | "expand-empire"
  | "increase-efficiency"
  | "protect-resources"
  | "improve-readiness"
  | "advance-progression"
  | "capture-opportunity"
  | "reduce-risk"
  | "complete-objective"
  | "gather-information"
  | "maintain-position";


export type AtlasDecisionConstraintType =
  | "budget"
  | "time"
  | "risk"
  | "availability"
  | "progression"
  | "readiness"
  | "dependency"
  | "cooldown"
  | "custom";


export type AtlasDecisionConflictType =
  | "resource-conflict"
  | "time-conflict"
  | "strategy-conflict"
  | "risk-conflict"
  | "priority-conflict"
  | "dependency-conflict"
  | "redundancy";


export type AtlasDecisionStatus =
  | "selected"
  | "supporting"
  | "deferred"
  | "rejected";


export type AtlasDecisionContext = {
  availableCash?: number | null;

  availableMinutes?: number | null;

  maximumRisk?: "low" | "moderate" | "high" | "extreme";

  preferredCategories?: AtlasAdaptiveRecommendationCategory[];

  excludedCategories?: AtlasAdaptiveRecommendationCategory[];

  activeObjectiveIds?: string[];

  completedRecommendationIds?: string[];

  blockedRecommendationIds?: string[];

  urgentRecommendationIds?: string[];

  requiredRecommendationIds?: string[];

  maximumSupportingActions?: number;

  maximumDeferredActions?: number;

  minimumDecisionConfidence?: number;

  metadata?: Record<string, unknown>;
};


export type AtlasDecisionConstraint = {
  type: AtlasDecisionConstraintType;

  label: string;

  isBlocking: boolean;

  recommendationId: string | null;

  explanation: string;
};


export type AtlasDecisionConflict = {
  type: AtlasDecisionConflictType;

  recommendationIds: string[];

  severity: AtlasDecisionUrgency;

  explanation: string;

  resolution: string;
};


export type AtlasDecisionReason = {
  order: number;

  label: string;

  explanation: string;

  impact: number;
};


export type AtlasDecisionRecommendationReference = {
  id: string;

  title: string;

  category: AtlasAdaptiveRecommendationCategory;

  status: AtlasDecisionStatus;

  rank: number;

  score: number;

  confidence: number;

  priority: AtlasAdaptiveRecommendationPriority;

  explanation: string;
};


export type AtlasDecision = {
  version: number;

  generatedAt: string;

  sourceGeneratedAt: string;

  type: AtlasDecisionType;

  urgency: AtlasDecisionUrgency;

  strategicIntent: AtlasDecisionStrategicIntent;

  confidence: number;

  confidenceLevel: AtlasDecisionConfidenceLevel;

  primaryRecommendation:
    AtlasDecisionRecommendationReference | null;

  supportingRecommendations:
    AtlasDecisionRecommendationReference[];

  deferredRecommendations:
    AtlasDecisionRecommendationReference[];

  rejectedRecommendations:
    AtlasDecisionRecommendationReference[];

  constraints: AtlasDecisionConstraint[];

  conflicts: AtlasDecisionConflict[];

  reasoningChain: AtlasDecisionReason[];

  headline: string;

  summary: string;

  rationale: string;

  coachingResponse: string;

  immediateNextStep: string;

  longTermDirection: string;

  shouldActNow: boolean;

  shouldReassess: boolean;
};


export type BuildAtlasDecisionInput = {
  adaptiveRecommendations: AtlasAdaptiveRecommendationResult;

  context?: AtlasDecisionContext;

  generatedAt?: string;
};


type EvaluatedRecommendation = {
  recommendation: AtlasAdaptiveRecommendation;

  adjustedScore: number;

  constraints: AtlasDecisionConstraint[];

  isBlocked: boolean;

  isRequired: boolean;

  isUrgent: boolean;

  isPreferredCategory: boolean;

  isExcludedCategory: boolean;
};


const riskOrder = {
  low: 1,
  moderate: 2,
  high: 3,
  extreme: 4,
} as const;


function resolveTimestamp(
  value?: string
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed =
    new Date(value);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}


function clampPercentage(
  value: number
): number {
  if (
    !Number.isFinite(value)
  ) {
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


function clampScore(
  value: number
): number {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.round(
    value * 100
  ) / 100;
}


function normalizeLimit(
  value: number | undefined,
  fallback: number,
  maximum: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return fallback;
  }

  return Math.min(
    maximum,
    Math.max(
      0,
      Math.round(value)
    )
  );
}


function includesId(
  values: string[] | undefined,
  id: string
): boolean {
  return values?.includes(id) ??
    false;
}


function buildConstraint(
  type: AtlasDecisionConstraintType,
  label: string,
  isBlocking: boolean,
  recommendationId: string | null,
  explanation: string
): AtlasDecisionConstraint {
  return {
    type,
    label,
    isBlocking,
    recommendationId,
    explanation,
  };
}


function evaluateBudgetConstraint(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConstraint | null {
  const availableCash =
    context.availableCash;

  const estimatedCost =
    recommendation.candidate
      .estimatedCost;

  if (
    availableCash === null ||
    availableCash === undefined ||
    estimatedCost === null ||
    estimatedCost === undefined ||
    !Number.isFinite(
      availableCash
    ) ||
    !Number.isFinite(
      estimatedCost
    )
  ) {
    return null;
  }

  if (
    estimatedCost <=
    availableCash
  ) {
    return buildConstraint(
      "budget",
      "Budget available",
      false,
      recommendation.id,
      `${recommendation.candidate.title} is within the current available budget.`
    );
  }

  return buildConstraint(
    "budget",
    "Insufficient budget",
    true,
    recommendation.id,
    `${recommendation.candidate.title} requires an estimated ${estimatedCost}, exceeding the available ${availableCash}.`
  );
}


function evaluateTimeConstraint(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConstraint | null {
  const availableMinutes =
    context.availableMinutes;

  const estimatedDuration =
    recommendation.candidate
      .estimatedDurationMinutes;

  if (
    availableMinutes === null ||
    availableMinutes === undefined ||
    estimatedDuration === null ||
    estimatedDuration === undefined ||
    !Number.isFinite(
      availableMinutes
    ) ||
    !Number.isFinite(
      estimatedDuration
    )
  ) {
    return null;
  }

  if (
    estimatedDuration <=
    availableMinutes
  ) {
    return buildConstraint(
      "time",
      "Time available",
      false,
      recommendation.id,
      `${recommendation.candidate.title} fits within the current play session.`
    );
  }

  return buildConstraint(
    "time",
    "Insufficient session time",
    true,
    recommendation.id,
    `${recommendation.candidate.title} requires approximately ${estimatedDuration} minutes, exceeding the available ${availableMinutes} minutes.`
  );
}


function evaluateRiskConstraint(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConstraint | null {
  const maximumRisk =
    context.maximumRisk;

  if (!maximumRisk) {
    return null;
  }

  const recommendationRisk =
    recommendation.candidate.risk;

  const isBlocking =
    riskOrder[
      recommendationRisk
    ] >
    riskOrder[
      maximumRisk
    ];

  return buildConstraint(
    "risk",
    isBlocking
      ? "Risk exceeds limit"
      : "Risk within limit",
    isBlocking,
    recommendation.id,
    isBlocking
      ? `${recommendation.candidate.title} has ${recommendationRisk} risk, exceeding the current ${maximumRisk} risk limit.`
      : `${recommendation.candidate.title} remains within the current risk limit.`
  );
}


function evaluateAvailabilityConstraint(
  recommendation: AtlasAdaptiveRecommendation
): AtlasDecisionConstraint | null {
  if (
    recommendation.candidate
      .isAvailable !== false
  ) {
    return null;
  }

  return buildConstraint(
    "availability",
    "Recommendation unavailable",
    true,
    recommendation.id,
    `${recommendation.candidate.title} is not currently available.`
  );
}


function evaluateCompletionConstraint(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConstraint | null {
  const isCompleted =
    recommendation.candidate
      .isCompleted === true ||
    includesId(
      context.completedRecommendationIds,
      recommendation.id
    );

  if (!isCompleted) {
    return null;
  }

  const isRepeatable =
    recommendation.candidate
      .isRepeatable === true;

  return buildConstraint(
    "progression",
    isRepeatable
      ? "Previously completed"
      : "Already completed",
    !isRepeatable,
    recommendation.id,
    isRepeatable
      ? `${recommendation.candidate.title} has already been completed but may still be repeated.`
      : `${recommendation.candidate.title} has already been completed and should not be selected again.`
  );
}


function evaluateBlockedConstraint(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConstraint | null {
  if (
    !includesId(
      context.blockedRecommendationIds,
      recommendation.id
    )
  ) {
    return null;
  }

  return buildConstraint(
    "dependency",
    "Recommendation blocked",
    true,
    recommendation.id,
    `${recommendation.candidate.title} is blocked by the current player state or an unresolved dependency.`
  );
}


function evaluateCategoryConstraint(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConstraint | null {
  const excludedCategories =
    context.excludedCategories ??
    [];

  if (
    !excludedCategories.includes(
      recommendation.candidate
        .category
    )
  ) {
    return null;
  }

  return buildConstraint(
    "custom",
    "Category excluded",
    true,
    recommendation.id,
    `${recommendation.candidate.title} belongs to the excluded ${recommendation.candidate.category} category.`
  );
}


function collectConstraints(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConstraint[] {
  const constraints = [
    evaluateBudgetConstraint(
      recommendation,
      context
    ),
    evaluateTimeConstraint(
      recommendation,
      context
    ),
    evaluateRiskConstraint(
      recommendation,
      context
    ),
    evaluateAvailabilityConstraint(
      recommendation
    ),
    evaluateCompletionConstraint(
      recommendation,
      context
    ),
    evaluateBlockedConstraint(
      recommendation,
      context
    ),
    evaluateCategoryConstraint(
      recommendation,
      context
    ),
  ];

  return constraints.filter(
    (
      constraint
    ): constraint is AtlasDecisionConstraint =>
      constraint !== null
  );
}


function calculateContextAdjustment(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext,
  constraints: AtlasDecisionConstraint[]
): number {
  let adjustment = 0;

  const category =
    recommendation.candidate
      .category;

  const preferredCategories =
    context.preferredCategories ??
    [];

  if (
    preferredCategories.includes(
      category
    )
  ) {
    adjustment += 8;
  }

  if (
    includesId(
      context.activeObjectiveIds,
      recommendation.id
    )
  ) {
    adjustment += 10;
  }

  if (
    includesId(
      context.urgentRecommendationIds,
      recommendation.id
    )
  ) {
    adjustment += 15;
  }

  if (
    includesId(
      context.requiredRecommendationIds,
      recommendation.id
    )
  ) {
    adjustment += 25;
  }

  const blockingConstraints =
    constraints.filter(
      (constraint) =>
        constraint.isBlocking
    );

  adjustment -=
    blockingConstraints.length *
    40;

  const nonBlockingConstraints =
    constraints.filter(
      (constraint) =>
        !constraint.isBlocking
    );

  adjustment +=
    Math.min(
      5,
      nonBlockingConstraints.length
    );

  return adjustment;
}


function evaluateRecommendation(
  recommendation: AtlasAdaptiveRecommendation,
  context: AtlasDecisionContext
): EvaluatedRecommendation {
  const constraints =
    collectConstraints(
      recommendation,
      context
    );

  const adjustment =
    calculateContextAdjustment(
      recommendation,
      context,
      constraints
    );

  return {
    recommendation,

    adjustedScore:
      clampScore(
        recommendation
          .normalizedScore +
        adjustment
      ),

    constraints,

    isBlocked:
      constraints.some(
        (constraint) =>
          constraint.isBlocking
      ),

    isRequired:
      includesId(
        context.requiredRecommendationIds,
        recommendation.id
      ),

    isUrgent:
      includesId(
        context.urgentRecommendationIds,
        recommendation.id
      ),

    isPreferredCategory:
      context.preferredCategories
        ?.includes(
          recommendation.candidate
            .category
        ) ??
      false,

    isExcludedCategory:
      context.excludedCategories
        ?.includes(
          recommendation.candidate
            .category
        ) ??
      false,
  };
}


function compareEvaluatedRecommendations(
  first: EvaluatedRecommendation,
  second: EvaluatedRecommendation
): number {
  if (
    first.isRequired !==
    second.isRequired
  ) {
    return first.isRequired
      ? -1
      : 1;
  }

  if (
    first.isBlocked !==
    second.isBlocked
  ) {
    return first.isBlocked
      ? 1
      : -1;
  }

  if (
    first.isUrgent !==
    second.isUrgent
  ) {
    return first.isUrgent
      ? -1
      : 1;
  }

  const scoreDifference =
    second.adjustedScore -
    first.adjustedScore;

  if (
    scoreDifference !== 0
  ) {
    return scoreDifference;
  }

  const confidenceDifference =
    second.recommendation
      .confidence -
    first.recommendation
      .confidence;

  if (
    confidenceDifference !== 0
  ) {
    return confidenceDifference;
  }

  return first.recommendation
    .candidate.title
    .localeCompare(
      second.recommendation
        .candidate.title
    );
}


function toDecisionReference(
  evaluated: EvaluatedRecommendation,
  status: AtlasDecisionStatus,
  explanation: string
): AtlasDecisionRecommendationReference {
  return {
    id:
      evaluated.recommendation.id,

    title:
      evaluated.recommendation
        .candidate.title,

    category:
      evaluated.recommendation
        .candidate.category,

    status,

    rank:
      evaluated.recommendation.rank,

    score:
      clampScore(
        evaluated.adjustedScore
      ),

    confidence:
      evaluated.recommendation
        .confidence,

    priority:
      evaluated.recommendation
        .priority,

    explanation,
  };
}


function detectResourceConflict(
  first: EvaluatedRecommendation,
  second: EvaluatedRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConflict | null {
  const availableCash =
    context.availableCash;

  const firstCost =
    first.recommendation
      .candidate.estimatedCost;

  const secondCost =
    second.recommendation
      .candidate.estimatedCost;

  if (
    availableCash === null ||
    availableCash === undefined ||
    firstCost === null ||
    firstCost === undefined ||
    secondCost === null ||
    secondCost === undefined ||
    !Number.isFinite(
      availableCash
    ) ||
    !Number.isFinite(
      firstCost
    ) ||
    !Number.isFinite(
      secondCost
    ) ||
    firstCost + secondCost <=
      availableCash
  ) {
    return null;
  }

  return {
    type:
      "resource-conflict",

    recommendationIds: [
      first.recommendation.id,
      second.recommendation.id,
    ],

    severity:
      "high",

    explanation:
      `${first.recommendation.candidate.title} and ${second.recommendation.candidate.title} cannot both be funded from the current available budget.`,

    resolution:
      `Prioritize the higher-ranked recommendation and defer the other until additional resources are available.`,
  };
}


function detectTimeConflict(
  first: EvaluatedRecommendation,
  second: EvaluatedRecommendation,
  context: AtlasDecisionContext
): AtlasDecisionConflict | null {
  const availableMinutes =
    context.availableMinutes;

  const firstDuration =
    first.recommendation
      .candidate
      .estimatedDurationMinutes;

  const secondDuration =
    second.recommendation
      .candidate
      .estimatedDurationMinutes;

  if (
    availableMinutes === null ||
    availableMinutes === undefined ||
    firstDuration === null ||
    firstDuration === undefined ||
    secondDuration === null ||
    secondDuration === undefined ||
    !Number.isFinite(
      availableMinutes
    ) ||
    !Number.isFinite(
      firstDuration
    ) ||
    !Number.isFinite(
      secondDuration
    ) ||
    firstDuration +
      secondDuration <=
      availableMinutes
  ) {
    return null;
  }

  return {
    type:
      "time-conflict",

    recommendationIds: [
      first.recommendation.id,
      second.recommendation.id,
    ],

    severity:
      "medium",

    explanation:
      `${first.recommendation.candidate.title} and ${second.recommendation.candidate.title} cannot both fit within the current play session.`,

    resolution:
      `Complete the higher-priority action first and schedule the second for a later session.`,
  };
}


function detectStrategyConflict(
  first: EvaluatedRecommendation,
  second: EvaluatedRecommendation
): AtlasDecisionConflict | null {
  const firstHorizon =
    first.recommendation
      .candidate.horizon;

  const secondHorizon =
    second.recommendation
      .candidate.horizon;

  const firstRisk =
    first.recommendation
      .candidate.risk;

  const secondRisk =
    second.recommendation
      .candidate.risk;

  const horizonConflict =
    (
      firstHorizon ===
        "immediate" &&
      secondHorizon ===
        "long-term"
    ) ||
    (
      firstHorizon ===
        "long-term" &&
      secondHorizon ===
        "immediate"
    );

  const riskConflict =
    Math.abs(
      riskOrder[
        firstRisk
      ] -
      riskOrder[
        secondRisk
      ]
    ) >= 3;

  if (
    !horizonConflict &&
    !riskConflict
  ) {
    return null;
  }

  return {
    type:
      riskConflict
        ? "risk-conflict"
        : "strategy-conflict",

    recommendationIds: [
      first.recommendation.id,
      second.recommendation.id,
    ],

    severity:
      riskConflict
        ? "high"
        : "medium",

    explanation:
      `${first.recommendation.candidate.title} and ${second.recommendation.candidate.title} represent materially different strategic paths.`,

    resolution:
      `Use the higher-ranked action as the current strategy and retain the alternative as a later pivot.`,
  };
}


function detectRedundancy(
  first: EvaluatedRecommendation,
  second: EvaluatedRecommendation
): AtlasDecisionConflict | null {
  if (
    first.recommendation
      .candidate.category !==
    second.recommendation
      .candidate.category
  ) {
    return null;
  }

  const scoreDistance =
    Math.abs(
      first.adjustedScore -
      second.adjustedScore
    );

  if (
    scoreDistance > 10
  ) {
    return null;
  }

  return {
    type:
      "redundancy",

    recommendationIds: [
      first.recommendation.id,
      second.recommendation.id,
    ],

    severity:
      "low",

    explanation:
      `${first.recommendation.candidate.title} and ${second.recommendation.candidate.title} provide similar value within the same category.`,

    resolution:
      `Select the higher-confidence option and keep the other as a substitute.`,
  };
}


function detectConflicts(
  candidates: EvaluatedRecommendation[],
  context: AtlasDecisionContext
): AtlasDecisionConflict[] {
  const conflicts:
    AtlasDecisionConflict[] = [];

  const comparisonPool =
    candidates
      .filter(
        (candidate) =>
          !candidate.isBlocked
      )
      .slice(
        0,
        5
      );

  for (
    let firstIndex = 0;
    firstIndex <
    comparisonPool.length;
    firstIndex += 1
  ) {
    for (
      let secondIndex =
        firstIndex + 1;
      secondIndex <
      comparisonPool.length;
      secondIndex += 1
    ) {
      const first =
        comparisonPool[
          firstIndex
        ];

      const second =
        comparisonPool[
          secondIndex
        ];

      const detected = [
        detectResourceConflict(
          first,
          second,
          context
        ),
        detectTimeConflict(
          first,
          second,
          context
        ),
        detectStrategyConflict(
          first,
          second
        ),
        detectRedundancy(
          first,
          second
        ),
      ];

      conflicts.push(
        ...detected.filter(
          (
            conflict
          ): conflict is AtlasDecisionConflict =>
            conflict !== null
        )
      );
    }
  }

  return conflicts;
}


function resolveStrategicIntent(
  recommendation:
    AtlasAdaptiveRecommendation | null
): AtlasDecisionStrategicIntent {
  if (!recommendation) {
    return "gather-information";
  }

  switch (
    recommendation.candidate
      .category
  ) {
    case "business":
    case "property":
      return "expand-empire";

    case "financial":
      return recommendation
          .candidate.risk ===
        "low"
        ? "protect-resources"
        : "capture-opportunity";

    case "mission":
      return "generate-momentum";

    case "progression":
      return "advance-progression";

    case "vehicle":
    case "weapon":
      return "improve-readiness";

    case "collection":
      return "complete-objective";

    case "exploration":
      return "capture-opportunity";

    case "social":
      return "maintain-position";

    case "custom":
      return "increase-efficiency";
  }
}


function resolveDecisionType(
  primary:
    EvaluatedRecommendation | null,
  confidence: number,
  minimumConfidence: number
): AtlasDecisionType {
  if (!primary) {
    return "no-action";
  }

  if (primary.isBlocked) {
    return "pause";
  }

  if (
    confidence <
    minimumConfidence
  ) {
    return "reassess";
  }

  if (
    primary.recommendation
      .action ===
    "prioritize"
  ) {
    return "execute";
  }

  if (
    primary.recommendation
      .action ===
    "consider"
  ) {
    return "prepare";
  }

  if (
    primary.recommendation
      .action ===
    "monitor"
  ) {
    return "monitor";
  }

  if (
    primary.recommendation
      .action ===
    "deprioritize"
  ) {
    return "pause";
  }

  return "no-action";
}


function resolveUrgency(
  primary:
    EvaluatedRecommendation | null
): AtlasDecisionUrgency {
  if (!primary) {
    return "low";
  }

  if (
    primary.isUrgent ||
    primary.isRequired
  ) {
    return "critical";
  }

  switch (
    primary.recommendation
      .priority
  ) {
    case "critical":
      return "critical";

    case "high":
      return "high";

    case "medium":
      return "medium";

    case "low":
      return "low";
  }
}


function resolveDecisionConfidence(
  primary:
    EvaluatedRecommendation | null,
  secondary:
    EvaluatedRecommendation | null,
  conflicts:
    AtlasDecisionConflict[]
): number {
  if (!primary) {
    return 0;
  }

  let confidence =
    primary.recommendation
      .confidence;

  confidence +=
    (
      primary.adjustedScore -
      primary.recommendation
        .normalizedScore
    ) *
    0.2;

  if (secondary) {
    const scoreGap =
      primary.adjustedScore -
      secondary.adjustedScore;

    confidence +=
      Math.min(
        12,
        Math.max(
          -10,
          scoreGap * 0.35
        )
      );
  } else {
    confidence += 5;
  }

  const severeConflicts =
    conflicts.filter(
      (conflict) =>
        conflict.severity ===
          "high" ||
        conflict.severity ===
          "critical"
    );

  confidence -=
    severeConflicts.length *
    5;

  if (
    primary.isRequired
  ) {
    confidence += 8;
  }

  if (
    primary.isBlocked
  ) {
    confidence -= 30;
  }

  return clampPercentage(
    confidence
  );
}


function resolveConfidenceLevel(
  confidence: number
): AtlasDecisionConfidenceLevel {
  if (
    confidence >= 85
  ) {
    return "very-strong";
  }

  if (
    confidence >= 70
  ) {
    return "strong";
  }

  if (
    confidence >= 50
  ) {
    return "developing";
  }

  return "limited";
}


function buildReasoningChain(
  primary:
    EvaluatedRecommendation | null,
  secondary:
    EvaluatedRecommendation | null,
  conflicts:
    AtlasDecisionConflict[]
): AtlasDecisionReason[] {
  if (!primary) {
    return [
      {
        order: 1,

        label:
          "No eligible action",

        explanation:
          "No recommendation currently satisfies the decision requirements.",

        impact:
          -100,
      },
    ];
  }

  const reasons:
    AtlasDecisionReason[] = [
      {
        order: 1,

        label:
          "Adaptive ranking",

        explanation:
          `${primary.recommendation.candidate.title} entered decision analysis with an adaptive score of ${primary.recommendation.normalizedScore}.`,

        impact:
          primary.recommendation
            .normalizedScore,
      },
      {
        order: 2,

        label:
          "Current context",

        explanation:
          `Session and empire context adjusted the recommendation to ${primary.adjustedScore}.`,

        impact:
          primary.adjustedScore -
          primary.recommendation
            .normalizedScore,
      },
      {
        order: 3,

        label:
          "Behavioral confidence",

        explanation:
          `Atlas has ${primary.recommendation.confidence}% confidence that this recommendation fits the player's current behavior.`,

        impact:
          primary.recommendation
            .confidence,
      },
    ];

  if (secondary) {
    reasons.push({
      order:
        reasons.length + 1,

      label:
        "Alternative comparison",

      explanation:
        `${primary.recommendation.candidate.title} outranked ${secondary.recommendation.candidate.title} by ${clampScore(
          primary.adjustedScore -
          secondary.adjustedScore
        )} points.`,

      impact:
        primary.adjustedScore -
        secondary.adjustedScore,
    });
  }

  if (
    conflicts.length > 0
  ) {
    reasons.push({
      order:
        reasons.length + 1,

      label:
        "Conflict resolution",

      explanation:
        `Atlas detected ${conflicts.length} strategic or resource conflict${conflicts.length === 1 ? "" : "s"} and selected the highest-value compatible action.`,

      impact:
        -conflicts.length,
    });
  }

  if (
    primary.constraints.length >
    0
  ) {
    const blockingCount =
      primary.constraints.filter(
        (constraint) =>
          constraint.isBlocking
      ).length;

    reasons.push({
      order:
        reasons.length + 1,

      label:
        "Constraint analysis",

      explanation:
        blockingCount > 0
          ? `${blockingCount} blocking constraint${blockingCount === 1 ? "" : "s"} currently prevent immediate execution.`
          : "The recommendation satisfies all identified execution constraints.",

      impact:
        blockingCount > 0
          ? -blockingCount * 20
          : 5,
    });
  }

  return reasons;
}


function buildPrimaryExplanation(
  primary: EvaluatedRecommendation
): string {
  if (primary.isBlocked) {
    const blockingConstraint =
      primary.constraints.find(
        (constraint) =>
          constraint.isBlocking
      );

    return blockingConstraint
      ?.explanation ??
      `${primary.recommendation.candidate.title} is currently blocked.`;
  }

  if (primary.isRequired) {
    return `${primary.recommendation.candidate.title} was selected because it is required by the current strategic context.`;
  }

  if (primary.isUrgent) {
    return `${primary.recommendation.candidate.title} was selected because it combines high adaptive value with immediate urgency.`;
  }

  return `${primary.recommendation.candidate.title} provides the strongest combination of player fit, strategic value, confidence, and current feasibility.`;
}


function buildHeadline(
  type: AtlasDecisionType,
  primary:
    EvaluatedRecommendation | null
): string {
  if (!primary) {
    return "Atlas needs more information before choosing the next action.";
  }

  const title =
    primary.recommendation
      .candidate.title;

  switch (type) {
    case "execute":
      return `Your best next move is ${title}.`;

    case "prepare":
      return `Prepare for ${title}.`;

    case "monitor":
      return `Keep ${title} on your radar.`;

    case "pause":
      return `Pause ${title} until its constraints are resolved.`;

    case "reassess":
      return `Reassess before committing to ${title}.`;

    case "no-action":
      return "No immediate action is recommended.";
  }
}


function buildSummary(
  type: AtlasDecisionType,
  primary:
    EvaluatedRecommendation | null,
  confidence: number
): string {
  if (!primary) {
    return "Atlas could not identify an eligible recommendation from the current adaptive ranking result.";
  }

  return `${primary.recommendation.candidate.title} is the selected decision with an adjusted score of ${primary.adjustedScore} and ${confidence}% decision confidence. Atlas recommends the ${type} response.`;
}


function buildRationale(
  primary:
    EvaluatedRecommendation | null,
  secondary:
    EvaluatedRecommendation | null,
  conflicts:
    AtlasDecisionConflict[]
): string {
  if (!primary) {
    return "No recommendation remained eligible after applying current constraints and decision rules.";
  }

  const alternativeText =
    secondary
      ? ` It was selected over ${secondary.recommendation.candidate.title} because it produced the stronger context-adjusted result.`
      : "";

  const conflictText =
    conflicts.length > 0
      ? ` Atlas also resolved ${conflicts.length} conflict${conflicts.length === 1 ? "" : "s"} during the decision process.`
      : "";

  return `${primary.recommendation.strategicRationale}${alternativeText}${conflictText}`;
}


function buildCoachingResponse(
  type: AtlasDecisionType,
  primary:
    EvaluatedRecommendation | null
): string {
  if (!primary) {
    return "Gather additional player activity or update the current session context before making a strategic commitment.";
  }

  const title =
    primary.recommendation
      .candidate.title;

  switch (type) {
    case "execute":
      return `Focus on ${title} now. Avoid splitting resources across lower-ranked alternatives until this action is complete or no longer viable.`;

    case "prepare":
      return `Begin preparing for ${title}. Secure the required time, resources, and dependencies before execution.`;

    case "monitor":
      return `Track ${title} as a developing opportunity, but do not redirect major resources toward it yet.`;

    case "pause":
      return `Do not commit to ${title} until the blocking constraint has been resolved.`;

    case "reassess":
      return `Review current goals and resource limits before committing to ${title}. Atlas does not yet have enough confidence for a strong directive.`;

    case "no-action":
      return "Maintain the current position and wait for a stronger recommendation signal.";
  }
}


function buildImmediateNextStep(
  type: AtlasDecisionType,
  primary:
    EvaluatedRecommendation | null
): string {
  if (!primary) {
    return "Update the player state, objectives, or available session resources.";
  }

  const title =
    primary.recommendation
      .candidate.title;

  switch (type) {
    case "execute":
      return `Start ${title}.`;

    case "prepare":
      return `Review the requirements for ${title} and secure any missing resources.`;

    case "monitor":
      return `Check the availability and value of ${title} during the next decision cycle.`;

    case "pause": {
      const blockingConstraint =
        primary.constraints.find(
          (constraint) =>
            constraint.isBlocking
        );

      return blockingConstraint
        ? `Resolve the ${blockingConstraint.label.toLowerCase()} constraint before proceeding with ${title}.`
        : `Resolve the current blocker before proceeding with ${title}.`;
    }

    case "reassess":
      return `Collect more player context before deciding whether to pursue ${title}.`;

    case "no-action":
      return "Continue current activity without making a new strategic commitment.";
  }
}


function buildLongTermDirection(
  intent:
    AtlasDecisionStrategicIntent
): string {
  switch (intent) {
    case "generate-momentum":
      return "Build consistent short-term progress that opens stronger future opportunities.";

    case "expand-empire":
      return "Increase long-term ownership, income capacity, and strategic control.";

    case "increase-efficiency":
      return "Reduce wasted time and resources while improving progression output.";

    case "protect-resources":
      return "Preserve capital and avoid decisions that weaken future flexibility.";

    case "improve-readiness":
      return "Strengthen the player's ability to execute higher-value activities.";

    case "advance-progression":
      return "Unlock the next meaningful stage of player and empire development.";

    case "capture-opportunity":
      return "Act on valuable opportunities before their strategic value declines.";

    case "reduce-risk":
      return "Lower exposure to avoidable losses and unstable progression paths.";

    case "complete-objective":
      return "Finish active objectives before creating unnecessary new commitments.";

    case "gather-information":
      return "Improve Atlas confidence by collecting more behavior and state data.";

    case "maintain-position":
      return "Preserve current progress while waiting for a higher-value strategic opening.";
  }
}


function buildEmptyDecision(
  adaptiveRecommendations:
    AtlasAdaptiveRecommendationResult,
  generatedAt: string
): AtlasDecision {
  return {
    version:
      ATLAS_DECISION_ENGINE_VERSION,

    generatedAt,

    sourceGeneratedAt:
      adaptiveRecommendations
        .generatedAt,

    type:
      "no-action",

    urgency:
      "low",

    strategicIntent:
      "gather-information",

    confidence:
      0,

    confidenceLevel:
      "limited",

    primaryRecommendation:
      null,

    supportingRecommendations:
      [],

    deferredRecommendations:
      [],

    rejectedRecommendations:
      [],

    constraints:
      [],

    conflicts:
      [],

    reasoningChain: [
      {
        order: 1,

        label:
          "No adaptive recommendations",

        explanation:
          "The adaptive recommendation result did not contain any recommendations to evaluate.",

        impact:
          -100,
      },
    ],

    headline:
      "Atlas needs more information before choosing the next action.",

    summary:
      "No decision was produced because there were no adaptive recommendations available.",

    rationale:
      "The decision engine requires at least one adaptive recommendation before it can compare strategic alternatives.",

    coachingResponse:
      "Continue gathering player activity and update the recommendation pipeline.",

    immediateNextStep:
      "Generate a new adaptive recommendation result.",

    longTermDirection:
      "Improve Atlas confidence by collecting more behavior and state data.",

    shouldActNow:
      false,

    shouldReassess:
      true,
  };
}


export function buildAtlasDecision({
  adaptiveRecommendations,
  context = {},
  generatedAt,
}: BuildAtlasDecisionInput): AtlasDecision {
  const resolvedGeneratedAt =
    resolveTimestamp(
      generatedAt
    );

  if (
    adaptiveRecommendations
      .recommendations.length ===
    0
  ) {
    return buildEmptyDecision(
      adaptiveRecommendations,
      resolvedGeneratedAt
    );
  }

  const evaluated =
    adaptiveRecommendations
      .recommendations
      .map(
        (recommendation) =>
          evaluateRecommendation(
            recommendation,
            context
          )
      )
      .sort(
        compareEvaluatedRecommendations
      );

  const eligible =
    evaluated.filter(
      (candidate) =>
        !candidate.isBlocked
    );

  const blocked =
    evaluated.filter(
      (candidate) =>
        candidate.isBlocked
    );

  const primary =
    eligible[0] ??
    blocked[0] ??
    null;

  const secondary =
    eligible[1] ??
    null;

  const conflicts =
    detectConflicts(
      evaluated,
      context
    );

  const confidence =
    resolveDecisionConfidence(
      primary,
      secondary,
      conflicts
    );

  const minimumConfidence =
    clampPercentage(
      context
        .minimumDecisionConfidence ??
      50
    );

  const type =
    resolveDecisionType(
      primary,
      confidence,
      minimumConfidence
    );

  const urgency =
    resolveUrgency(
      primary
    );

  const strategicIntent =
    resolveStrategicIntent(
      primary?.recommendation ??
      null
    );

  const supportingLimit =
    normalizeLimit(
      context.maximumSupportingActions,
      2,
      10
    );

  const deferredLimit =
    normalizeLimit(
      context.maximumDeferredActions,
      5,
      20
    );

  const supportingEvaluated =
    eligible
      .slice(
        1,
        1 +
        supportingLimit
      );

  const deferredEvaluated =
    eligible
      .slice(
        1 +
          supportingLimit,
        1 +
          supportingLimit +
          deferredLimit
      );

  const rejectedEvaluated =
    blocked;

  const primaryReference =
    primary
      ? toDecisionReference(
          primary,
          "selected",
          buildPrimaryExplanation(
            primary
          )
        )
      : null;

  const supportingRecommendations =
    supportingEvaluated.map(
      (candidate) =>
        toDecisionReference(
          candidate,
          "supporting",
          `${candidate.recommendation.candidate.title} remains a viable supporting action but does not exceed the selected recommendation's current value.`
        )
    );

  const deferredRecommendations =
    deferredEvaluated.map(
      (candidate) =>
        toDecisionReference(
          candidate,
          "deferred",
          `${candidate.recommendation.candidate.title} remains strategically relevant but should follow higher-ranked actions.`
        )
    );

  const rejectedRecommendations =
    rejectedEvaluated.map(
      (candidate) => {
        const blockingConstraint =
          candidate.constraints.find(
            (constraint) =>
              constraint.isBlocking
          );

        return toDecisionReference(
          candidate,
          "rejected",
          blockingConstraint
            ?.explanation ??
            `${candidate.recommendation.candidate.title} does not satisfy the current decision requirements.`
        );
      }
    );

  const constraints =
    evaluated.flatMap(
      (candidate) =>
        candidate.constraints
    );

  const reasoningChain =
    buildReasoningChain(
      primary,
      secondary,
      conflicts
    );

  return {
    version:
      ATLAS_DECISION_ENGINE_VERSION,

    generatedAt:
      resolvedGeneratedAt,

    sourceGeneratedAt:
      adaptiveRecommendations
        .generatedAt,

    type,

    urgency,

    strategicIntent,

    confidence,

    confidenceLevel:
      resolveConfidenceLevel(
        confidence
      ),

    primaryRecommendation:
      primaryReference,

    supportingRecommendations,

    deferredRecommendations,

    rejectedRecommendations,

    constraints,

    conflicts,

    reasoningChain,

    headline:
      buildHeadline(
        type,
        primary
      ),

    summary:
      buildSummary(
        type,
        primary,
        confidence
      ),

    rationale:
      buildRationale(
        primary,
        secondary,
        conflicts
      ),

    coachingResponse:
      buildCoachingResponse(
        type,
        primary
      ),

    immediateNextStep:
      buildImmediateNextStep(
        type,
        primary
      ),

    longTermDirection:
      buildLongTermDirection(
        strategicIntent
      ),

    shouldActNow:
      type === "execute",

    shouldReassess:
      type ===
        "reassess" ||
      type ===
        "no-action" ||
      type ===
        "pause",
  };
}