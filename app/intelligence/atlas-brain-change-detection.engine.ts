import type {
  AtlasBrainSnapshot,
} from "./atlas-brain-snapshot.engine";


export type AtlasBrainChangeCategory =
  | "financial"
  | "empire"
  | "situation"
  | "recommendation"
  | "priority"
  | "copilot";


export type AtlasBrainChangeDirection =
  | "improved"
  | "declined"
  | "changed"
  | "unchanged";


export type AtlasBrainChangeSeverity =
  | "critical"
  | "high"
  | "medium"
  | "low";


export type AtlasBrainChange = {
  id: string;

  category:
    AtlasBrainChangeCategory;

  direction:
    AtlasBrainChangeDirection;

  severity:
    AtlasBrainChangeSeverity;

  title: string;

  description: string;

  previousValue:
    string | number;

  currentValue:
    string | number;

  delta?: number;
};


export type AtlasBrainChangeSummary = {
  detectedAt: string;

  previousCapturedAt: string;

  currentCapturedAt: string;

  hasMeaningfulChanges: boolean;

  totalChanges: number;

  improvementCount: number;

  declineCount: number;

  neutralChangeCount: number;

  highestSeverity:
    AtlasBrainChangeSeverity | null;

  changes:
    AtlasBrainChange[];

  headline: string;

  summary: string;
};


export type DetectAtlasBrainChangesInput = {
  previous:
    AtlasBrainSnapshot;

  current:
    AtlasBrainSnapshot;

  detectedAt?: string;
};


const severityRank:
  Record<
    AtlasBrainChangeSeverity,
    number
  > = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };


const liquidityRank:
  Record<
    AtlasBrainSnapshot[
      "situation"
    ]["liquidityStatus"],
    number
  > = {
    Critical: 1,
    Low: 2,
    Stable: 3,
    Strong: 4,
    Excellent: 5,
  };


const growthPhaseRank:
  Record<
    AtlasBrainSnapshot[
      "situation"
    ]["growthPhase"],
    number
  > = {
    Foundation: 1,
    "Early Growth": 2,
    Expansion: 3,
    Optimization: 4,
    Dominance: 5,
  };


const expansionReadinessRank:
  Record<
    AtlasBrainSnapshot[
      "situation"
    ]["expansionReadiness"],
    number
  > = {
    "Not Ready": 1,
    Cautious: 2,
    Ready: 3,
    "Highly Ready": 4,
  };


const riskRank:
  Record<
    AtlasBrainSnapshot[
      "situation"
    ]["riskLevel"],
    number
  > = {
    High: 1,
    Elevated: 2,
    Moderate: 3,
    Low: 4,
  };


const urgencyRank:
  Record<
    AtlasBrainSnapshot[
      "situation"
    ]["urgency"],
    number
  > = {
    Immediate: 1,
    High: 2,
    Normal: 3,
    Low: 4,
  };


const momentumRank:
  Record<
    AtlasBrainSnapshot[
      "situation"
    ]["momentum"],
    number
  > = {
    Stalled: 1,
    Building: 2,
    Strong: 3,
    Accelerating: 4,
  };


const investmentReadinessRank:
  Record<
    AtlasBrainSnapshot[
      "situation"
    ]["investmentStatus"],
    number
  > = {
    "Preserve Cash": 1,
    "Selective Investment": 2,
    "Expansion Ready": 3,
    "Aggressive Growth": 4,
  };


const empireHealthRank:
  Record<
    AtlasBrainSnapshot[
      "empireHealth"
    ],
    number
  > = {
    Developing: 1,
    Stable: 2,
    Strong: 3,
    Excellent: 4,
  };


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


function createChangeId(
  category:
    AtlasBrainChangeCategory,
  name: string
): string {
  return `${category}-${name}`
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    );
}


function getNumericDirection(
  delta: number
): AtlasBrainChangeDirection {
  if (delta > 0) {
    return "improved";
  }

  if (delta < 0) {
    return "declined";
  }

  return "unchanged";
}


function getRankDirection(
  previousRank: number,
  currentRank: number
): AtlasBrainChangeDirection {
  if (
    currentRank > previousRank
  ) {
    return "improved";
  }

  if (
    currentRank < previousRank
  ) {
    return "declined";
  }

  return "unchanged";
}


function getScoreSeverity(
  delta: number
): AtlasBrainChangeSeverity {
  const absoluteDelta =
    Math.abs(delta);

  if (absoluteDelta >= 25) {
    return "critical";
  }

  if (absoluteDelta >= 15) {
    return "high";
  }

  if (absoluteDelta >= 7) {
    return "medium";
  }

  return "low";
}


function getCashSeverity(
  previousCash: number,
  delta: number
): AtlasBrainChangeSeverity {
  const absoluteDelta =
    Math.abs(delta);

  const percentageChange =
    previousCash > 0
      ? absoluteDelta /
        previousCash
      : absoluteDelta > 0
        ? 1
        : 0;

  if (
    absoluteDelta >= 2_000_000 ||
    percentageChange >= 0.75
  ) {
    return "critical";
  }

  if (
    absoluteDelta >= 750_000 ||
    percentageChange >= 0.4
  ) {
    return "high";
  }

  if (
    absoluteDelta >= 250_000 ||
    percentageChange >= 0.15
  ) {
    return "medium";
  }

  return "low";
}


function pushNumericChange(
  changes: AtlasBrainChange[],
  input: {
    category:
      AtlasBrainChangeCategory;

    name: string;

    title: string;

    previousValue: number;

    currentValue: number;

    description:
      (
        delta: number,
        direction:
          AtlasBrainChangeDirection
      ) => string;

    severity:
      AtlasBrainChangeSeverity;
  }
): void {
  const delta =
    input.currentValue -
    input.previousValue;

  if (delta === 0) {
    return;
  }

  const direction =
    getNumericDirection(
      delta
    );

  changes.push({
    id:
      createChangeId(
        input.category,
        input.name
      ),

    category:
      input.category,

    direction,

    severity:
      input.severity,

    title:
      input.title,

    description:
      input.description(
        delta,
        direction
      ),

    previousValue:
      input.previousValue,

    currentValue:
      input.currentValue,

    delta,
  });
}


function pushRankedChange<
  TValue extends string,
>(
  changes: AtlasBrainChange[],
  input: {
    category:
      AtlasBrainChangeCategory;

    name: string;

    title: string;

    previousValue:
      TValue;

    currentValue:
      TValue;

    ranks:
      Record<TValue, number>;

    description:
      (
        previousValue: TValue,
        currentValue: TValue,
        direction:
          AtlasBrainChangeDirection
      ) => string;

    severity:
      AtlasBrainChangeSeverity;
  }
): void {
  if (
    input.previousValue ===
    input.currentValue
  ) {
    return;
  }

  const direction =
    getRankDirection(
      input.ranks[
        input.previousValue
      ],
      input.ranks[
        input.currentValue
      ]
    );

  changes.push({
    id:
      createChangeId(
        input.category,
        input.name
      ),

    category:
      input.category,

    direction,

    severity:
      input.severity,

    title:
      input.title,

    description:
      input.description(
        input.previousValue,
        input.currentValue,
        direction
      ),

    previousValue:
      input.previousValue,

    currentValue:
      input.currentValue,
  });
}


function pushTextChange(
  changes: AtlasBrainChange[],
  input: {
    category:
      AtlasBrainChangeCategory;

    name: string;

    title: string;

    previousValue: string;

    currentValue: string;

    description: string;

    severity:
      AtlasBrainChangeSeverity;

    direction?:
      AtlasBrainChangeDirection;
  }
): void {
  if (
    input.previousValue ===
    input.currentValue
  ) {
    return;
  }

  changes.push({
    id:
      createChangeId(
        input.category,
        input.name
      ),

    category:
      input.category,

    direction:
      input.direction ??
      "changed",

    severity:
      input.severity,

    title:
      input.title,

    description:
      input.description,

    previousValue:
      input.previousValue,

    currentValue:
      input.currentValue,
  });
}


function getHighestSeverity(
  changes:
    AtlasBrainChange[]
): AtlasBrainChangeSeverity | null {
  if (changes.length === 0) {
    return null;
  }

  return [...changes]
    .sort(
      (
        first,
        second
      ) =>
        severityRank[
          second.severity
        ] -
        severityRank[
          first.severity
        ]
    )[0].severity;
}


function buildHeadline(
  changes:
    AtlasBrainChange[],
  improvementCount: number,
  declineCount: number
): string {
  if (changes.length === 0) {
    return "Atlas detected no meaningful changes.";
  }

  const highestPriorityChange =
    [...changes].sort(
      (
        first,
        second
      ) =>
        severityRank[
          second.severity
        ] -
        severityRank[
          first.severity
        ]
    )[0];

  if (
    declineCount >
    improvementCount
  ) {
    return `Atlas detected a setback: ${highestPriorityChange.title}.`;
  }

  if (
    improvementCount >
    declineCount
  ) {
    return `Atlas detected progress: ${highestPriorityChange.title}.`;
  }

  return `Atlas detected a strategic change: ${highestPriorityChange.title}.`;
}


function buildSummary(
  changes:
    AtlasBrainChange[],
  improvementCount: number,
  declineCount: number,
  neutralChangeCount: number
): string {
  if (changes.length === 0) {
    return "The current Atlas Brain snapshot remains materially consistent with the previous snapshot.";
  }

  const parts:
    string[] = [];

  if (improvementCount > 0) {
    parts.push(
      `${improvementCount} ${
        improvementCount === 1
          ? "improvement"
          : "improvements"
      }`
    );
  }

  if (declineCount > 0) {
    parts.push(
      `${declineCount} ${
        declineCount === 1
          ? "decline"
          : "declines"
      }`
    );
  }

  if (
    neutralChangeCount > 0
  ) {
    parts.push(
      `${neutralChangeCount} strategic ${
        neutralChangeCount === 1
          ? "change"
          : "changes"
      }`
    );
  }

  return `Atlas identified ${parts.join(
    ", "
  )} between the two Brain snapshots.`;
}


export function detectAtlasBrainChanges({
  previous,
  current,
  detectedAt,
}: DetectAtlasBrainChangesInput): AtlasBrainChangeSummary {
  const changes:
    AtlasBrainChange[] = [];

  const cashDelta =
    current.cash -
    previous.cash;

  pushNumericChange(
    changes,
    {
      category:
        "financial",

      name:
        "cash",

      title:
        cashDelta > 0
          ? "Available cash increased"
          : "Available cash decreased",

      previousValue:
        previous.cash,

      currentValue:
        current.cash,

      severity:
        getCashSeverity(
          previous.cash,
          cashDelta
        ),

      description:
        (
          delta
        ) =>
          delta > 0
            ? `Available cash increased by $${Math.abs(
                delta
              ).toLocaleString()}.`
            : `Available cash decreased by $${Math.abs(
                delta
              ).toLocaleString()}.`,
    }
  );

  const empireScoreDelta =
    current.empireScore -
    previous.empireScore;

  pushNumericChange(
    changes,
    {
      category:
        "empire",

      name:
        "empire-score",

      title:
        empireScoreDelta > 0
          ? "Empire score improved"
          : "Empire score declined",

      previousValue:
        previous.empireScore,

      currentValue:
        current.empireScore,

      severity:
        getScoreSeverity(
          empireScoreDelta
        ),

      description:
        (
          delta
        ) =>
          delta > 0
            ? `Empire score increased by ${Math.abs(
                delta
              )} points.`
            : `Empire score decreased by ${Math.abs(
                delta
              )} points.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "copilot",

      name:
        "empire-health",

      title:
        "Empire health changed",

      previousValue:
        previous.empireHealth,

      currentValue:
        current.empireHealth,

      ranks:
        empireHealthRank,

      severity:
        "high",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `Empire health changed from ${previousValue} to ${currentValue}.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "situation",

      name:
        "liquidity-status",

      title:
        "Liquidity status changed",

      previousValue:
        previous.situation
          .liquidityStatus,

      currentValue:
        current.situation
          .liquidityStatus,

      ranks:
        liquidityRank,

      severity:
        current.situation
          .liquidityStatus ===
          "Critical"
          ? "critical"
          : "high",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `Liquidity changed from ${previousValue} to ${currentValue}.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "empire",

      name:
        "growth-phase",

      title:
        "Growth phase changed",

      previousValue:
        previous.situation
          .growthPhase,

      currentValue:
        current.situation
          .growthPhase,

      ranks:
        growthPhaseRank,

      severity:
        "high",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `The empire moved from ${previousValue} to ${currentValue}.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "empire",

      name:
        "expansion-readiness",

      title:
        "Expansion readiness changed",

      previousValue:
        previous.situation
          .expansionReadiness,

      currentValue:
        current.situation
          .expansionReadiness,

      ranks:
        expansionReadinessRank,

      severity:
        "high",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `Expansion readiness changed from ${previousValue} to ${currentValue}.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "situation",

      name:
        "risk-level",

      title:
        "Risk level changed",

      previousValue:
        previous.situation
          .riskLevel,

      currentValue:
        current.situation
          .riskLevel,

      ranks:
        riskRank,

      severity:
        current.situation
          .riskLevel === "High"
          ? "critical"
          : "high",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `Risk changed from ${previousValue} to ${currentValue}.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "situation",

      name:
        "urgency",

      title:
        "Strategic urgency changed",

      previousValue:
        previous.situation
          .urgency,

      currentValue:
        current.situation
          .urgency,

      ranks:
        urgencyRank,

      severity:
        current.situation
          .urgency === "Immediate"
          ? "critical"
          : "medium",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `Strategic urgency changed from ${previousValue} to ${currentValue}.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "situation",

      name:
        "momentum",

      title:
        "Momentum changed",

      previousValue:
        previous.situation
          .momentum,

      currentValue:
        current.situation
          .momentum,

      ranks:
        momentumRank,

      severity:
        current.situation
          .momentum === "Stalled"
          ? "high"
          : "medium",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `Momentum changed from ${previousValue} to ${currentValue}.`,
    }
  );

  pushRankedChange(
    changes,
    {
      category:
        "situation",

      name:
        "investment-readiness",

      title:
        "Investment readiness changed",

      previousValue:
        previous.situation
          .investmentStatus,

      currentValue:
        current.situation
          .investmentStatus,

      ranks:
        investmentReadinessRank,

      severity:
        "high",

      description:
        (
          previousValue,
          currentValue
        ) =>
          `Investment readiness changed from ${previousValue} to ${currentValue}.`,
    }
  );

  const efficiencyDelta =
    current.situation
      .efficiencyScore -
    previous.situation
      .efficiencyScore;

  pushNumericChange(
    changes,
    {
      category:
        "situation",

      name:
        "efficiency-score",

      title:
        efficiencyDelta > 0
          ? "Efficiency improved"
          : "Efficiency declined",

      previousValue:
        previous.situation
          .efficiencyScore,

      currentValue:
        current.situation
          .efficiencyScore,

      severity:
        getScoreSeverity(
          efficiencyDelta
        ),

      description:
        (
          delta
        ) =>
          delta > 0
            ? `Situation efficiency increased by ${Math.abs(
                delta
              )} points.`
            : `Situation efficiency decreased by ${Math.abs(
                delta
              )} points.`,
    }
  );

  pushTextChange(
    changes,
    {
      category:
        "recommendation",

      name:
        "recommendation",

      title:
        "Top recommendation changed",

      previousValue:
        previous.recommendation
          .title,

      currentValue:
        current.recommendation
          .title,

      severity:
        "high",

      description:
        `Atlas changed its top recommendation from "${previous.recommendation.title}" to "${current.recommendation.title}".`,
    }
  );

  const recommendationConfidenceDelta =
    current.recommendation
      .confidence -
    previous.recommendation
      .confidence;

  pushNumericChange(
    changes,
    {
      category:
        "recommendation",

      name:
        "recommendation-confidence",

      title:
        recommendationConfidenceDelta >
        0
          ? "Recommendation confidence increased"
          : "Recommendation confidence decreased",

      previousValue:
        previous.recommendation
          .confidence,

      currentValue:
        current.recommendation
          .confidence,

      severity:
        getScoreSeverity(
          recommendationConfidenceDelta
        ),

      description:
        (
          delta
        ) =>
          delta > 0
            ? `Recommendation confidence increased by ${Math.abs(
                delta
              )} points.`
            : `Recommendation confidence decreased by ${Math.abs(
                delta
              )} points.`,
    }
  );

  const weightingDelta =
    current.recommendationWeight -
    previous.recommendationWeight;

  pushNumericChange(
    changes,
    {
      category:
        "recommendation",

      name:
        "recommendation-weight",

      title:
        weightingDelta > 0
          ? "Recommendation support strengthened"
          : "Recommendation support weakened",

      previousValue:
        previous.recommendationWeight,

      currentValue:
        current.recommendationWeight,

      severity:
        getScoreSeverity(
          weightingDelta
        ),

      description:
        (
          delta
        ) =>
          delta > 0
            ? `Recommendation weighting increased by ${Math.abs(
                delta
              )} points.`
            : `Recommendation weighting decreased by ${Math.abs(
                delta
              )} points.`,
    }
  );

  pushTextChange(
    changes,
    {
      category:
        "priority",

      name:
        "top-priority",

      title:
        "Top priority changed",

      previousValue:
        previous.topPriority.title,

      currentValue:
        current.topPriority.title,

      severity:
        "high",

      description:
        `Atlas changed the top priority from "${previous.topPriority.title}" to "${current.topPriority.title}".`,
    }
  );

  pushTextChange(
    changes,
    {
      category:
        "priority",

      name:
        "recommended-focus",

      title:
        "Recommended focus changed",

      previousValue:
        previous.recommendedFocus,

      currentValue:
        current.recommendedFocus,

      severity:
        "medium",

      description:
        `The recommended focus changed from "${previous.recommendedFocus}" to "${current.recommendedFocus}".`,
    }
  );

  const warningDelta =
    current.warningCount -
    previous.warningCount;

  if (warningDelta !== 0) {
    changes.push({
      id:
        createChangeId(
          "copilot",
          "warning-count"
        ),

      category:
        "copilot",

      direction:
        warningDelta > 0
          ? "declined"
          : "improved",

      severity:
        Math.abs(
          warningDelta
        ) >= 2
          ? "high"
          : "medium",

      title:
        warningDelta > 0
          ? "New warnings detected"
          : "Warnings resolved",

      description:
        warningDelta > 0
          ? `Atlas detected ${Math.abs(
              warningDelta
            )} additional ${
              Math.abs(
                warningDelta
              ) === 1
                ? "warning"
                : "warnings"
            }.`
          : `Atlas resolved ${Math.abs(
              warningDelta
            )} ${
              Math.abs(
                warningDelta
              ) === 1
                ? "warning"
                : "warnings"
            }.`,

      previousValue:
        previous.warningCount,

      currentValue:
        current.warningCount,

      delta:
        warningDelta,
    });
  }

  const opportunityDelta =
    current.opportunityCount -
    previous.opportunityCount;

  if (
    opportunityDelta !== 0
  ) {
    changes.push({
      id:
        createChangeId(
          "copilot",
          "opportunity-count"
        ),

      category:
        "copilot",

      direction:
        opportunityDelta > 0
          ? "improved"
          : "changed",

      severity:
        Math.abs(
          opportunityDelta
        ) >= 2
          ? "high"
          : "medium",

      title:
        opportunityDelta > 0
          ? "New opportunities detected"
          : "Opportunity count decreased",

      description:
        opportunityDelta > 0
          ? `Atlas detected ${Math.abs(
              opportunityDelta
            )} new ${
              Math.abs(
                opportunityDelta
              ) === 1
                ? "opportunity"
                : "opportunities"
            }.`
          : `The number of active opportunities decreased by ${Math.abs(
              opportunityDelta
            )}.`,

      previousValue:
        previous.opportunityCount,

      currentValue:
        current.opportunityCount,

      delta:
        opportunityDelta,
    });
  }

  const copilotConfidenceDelta =
    current.copilotConfidence -
    previous.copilotConfidence;

  pushNumericChange(
    changes,
    {
      category:
        "copilot",

      name:
        "copilot-confidence",

      title:
        copilotConfidenceDelta > 0
          ? "Copilot confidence increased"
          : "Copilot confidence decreased",

      previousValue:
        previous.copilotConfidence,

      currentValue:
        current.copilotConfidence,

      severity:
        getScoreSeverity(
          copilotConfidenceDelta
        ),

      description:
        (
          delta
        ) =>
          delta > 0
            ? `Copilot confidence increased by ${Math.abs(
                delta
              )} points.`
            : `Copilot confidence decreased by ${Math.abs(
                delta
              )} points.`,
    }
  );

  const sortedChanges =
    [...changes].sort(
      (
        first,
        second
      ) =>
        severityRank[
          second.severity
        ] -
        severityRank[
          first.severity
        ]
    );

  const improvementCount =
    sortedChanges.filter(
      (change) =>
        change.direction ===
        "improved"
    ).length;

  const declineCount =
    sortedChanges.filter(
      (change) =>
        change.direction ===
        "declined"
    ).length;

  const neutralChangeCount =
    sortedChanges.filter(
      (change) =>
        change.direction ===
        "changed"
    ).length;

  return {
    detectedAt:
      resolveTimestamp(
        detectedAt
      ),

    previousCapturedAt:
      previous.capturedAt,

    currentCapturedAt:
      current.capturedAt,

    hasMeaningfulChanges:
      sortedChanges.length > 0,

    totalChanges:
      sortedChanges.length,

    improvementCount,

    declineCount,

    neutralChangeCount,

    highestSeverity:
      getHighestSeverity(
        sortedChanges
      ),

    changes:
      sortedChanges,

    headline:
      buildHeadline(
        sortedChanges,
        improvementCount,
        declineCount
      ),

    summary:
      buildSummary(
        sortedChanges,
        improvementCount,
        declineCount,
        neutralChangeCount
      ),
  };
}