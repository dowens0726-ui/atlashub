import type {
  AtlasRecommendation,
} from "./recommendation.engine";

import type {
  EconomyAnalysis,
} from "./economy.engine";

import type {
  NextAction,
} from "./next-action.engine";

import type {
  ROIAnalysis,
} from "./roi.engine";

export type OpportunityCategory =
  | "Money"
  | "Business"
  | "Mission"
  | "Vehicle"
  | "Property"
  | "Progression";

export type OpportunityPriority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type Opportunity = {
  id: string;

  title: string;

  description: string;

  category: OpportunityCategory;

  priority: OpportunityPriority;

  estimatedMinutes: number;

  expectedImpact: string;

  confidence: number;

  actionLabel: string;

  href?: string;

  reasons: string[];

  warnings: string[];

  summary: string;
};

export type OpportunityEngineInput = {
  nextAction: NextAction;

  recommendation: AtlasRecommendation;

  economy: EconomyAnalysis;

  roi: ROIAnalysis;
};

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    maximum,
    Math.max(
      minimum,
      value
    )
  );
}

function normalizeConfidence(
  value: number
): number {
  if (!Number.isFinite(value)) {
    return 50;
  }

  const normalizedValue =
    value <= 1
      ? value * 100
      : value;

  return clamp(
    Math.round(normalizedValue),
    0,
    100
  );
}

function mapCategory(
  category: string
): OpportunityCategory {
  const normalizedCategory =
    category
      .trim()
      .toLowerCase();

  if (
    normalizedCategory.includes(
      "business"
    )
  ) {
    return "Business";
  }

  if (
    normalizedCategory.includes(
      "mission"
    )
  ) {
    return "Mission";
  }

  if (
    normalizedCategory.includes(
      "vehicle"
    ) ||
    normalizedCategory.includes(
      "garage"
    )
  ) {
    return "Vehicle";
  }

  if (
    normalizedCategory.includes(
      "property"
    )
  ) {
    return "Property";
  }

  if (
    normalizedCategory.includes(
      "money"
    ) ||
    normalizedCategory.includes(
      "income"
    ) ||
    normalizedCategory.includes(
      "economy"
    ) ||
    normalizedCategory.includes(
      "financial"
    )
  ) {
    return "Money";
  }

  return "Progression";
}

function determinePriority(
  recommendationPriority: string,
  roiScore: number,
  economy: EconomyAnalysis
): OpportunityPriority {
  const normalizedPriority =
    recommendationPriority
      .trim()
      .toLowerCase();

  if (
    normalizedPriority ===
      "critical" ||
    roiScore >= 90
  ) {
    return "Critical";
  }

  if (
    normalizedPriority ===
      "high" ||
    roiScore >= 75
  ) {
    return "High";
  }

  if (
    normalizedPriority ===
      "medium" ||
    roiScore >= 55
  ) {
    return "Medium";
  }

  if (
    economy.financialHealth ===
      "Developing" &&
    economy.warnings.length > 0
  ) {
    return "Medium";
  }

  return "Low";
}

function estimateMinutes(
  category: OpportunityCategory,
  priority: OpportunityPriority
): number {
  const categoryEstimate: Record<
    OpportunityCategory,
    number
  > = {
    Money: 30,
    Business: 45,
    Mission: 25,
    Vehicle: 15,
    Property: 20,
    Progression: 30,
  };

  const priorityAdjustment: Record<
    OpportunityPriority,
    number
  > = {
    Critical: -5,
    High: 0,
    Medium: 5,
    Low: 10,
  };

  return Math.max(
    10,
    categoryEstimate[category] +
      priorityAdjustment[priority]
  );
}

function buildReasons(
  nextAction: NextAction,
  recommendation: AtlasRecommendation,
  economy: EconomyAnalysis,
  roi: ROIAnalysis
): string[] {
  const reasons = [
    nextAction.reason,
    recommendation.summary,
    ...roi.reasons,
    `Atlas identified ${economy.weakestArea.toLowerCase()} as the next economic improvement area.`,
  ];

  return Array.from(
    new Set(
      reasons
        .map(
          (reason) =>
            reason.trim()
        )
        .filter(Boolean)
    )
  );
}

function buildWarnings(
  economy: EconomyAnalysis,
  roi: ROIAnalysis
): string[] {
  const warnings = [
    ...roi.risks,
    ...economy.warnings,
  ];

  return Array.from(
    new Set(
      warnings
        .map(
          (warning) =>
            warning.trim()
        )
        .filter(Boolean)
    )
  );
}

function selectHref(
  nextAction: NextAction,
  recommendation: AtlasRecommendation
): string | undefined {
  return (
    nextAction.href ??
    recommendation.href
  );
}

function buildOpportunityId(
  title: string,
  category: OpportunityCategory
): string {
  const normalizedTitle =
    title
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      );

  return [
    "opportunity",
    category.toLowerCase(),
    normalizedTitle ||
      "next-action",
  ].join("-");
}

export function buildOpportunity({
  nextAction,
  recommendation,
  economy,
  roi,
}: OpportunityEngineInput): Opportunity {
  const title =
    nextAction.title ||
    recommendation.title;

  const category =
    mapCategory(
      nextAction.category ||
        recommendation.category
    );

  const priority =
    determinePriority(
      recommendation.priority,
      roi.investmentScore,
      economy
    );

  const nextActionConfidence =
    normalizeConfidence(
      nextAction.confidence
    );

  const recommendationConfidence =
    normalizeConfidence(
      recommendation.confidence
    );

  const roiConfidence =
    normalizeConfidence(
      roi.confidence
    );

  const confidence =
    clamp(
      Math.round(
        nextActionConfidence *
          0.4 +
          recommendationConfidence *
            0.25 +
          roiConfidence *
            0.35
      ),
      0,
      99
    );

  const reasons =
    buildReasons(
      nextAction,
      recommendation,
      economy,
      roi
    );

  const warnings =
    buildWarnings(
      economy,
      roi
    );

  const description =
    recommendation.summary ||
    nextAction.reason;

  const expectedImpact =
    nextAction.expectedImpact ||
    economy.primaryRecommendation;

  const actionLabel =
    nextAction.actionLabel ||
    "View opportunity";

  const estimatedMinutes =
    estimateMinutes(
      category,
      priority
    );

  return {
    id:
      buildOpportunityId(
        title,
        category
      ),

    title,

    description,

    category,

    priority,

    estimatedMinutes,

    expectedImpact,

    confidence,

    actionLabel,

    href:
      selectHref(
        nextAction,
        recommendation
      ),

    reasons,

    warnings,

    summary:
      `${title} is Atlas's highest-priority ${category.toLowerCase()} opportunity. ` +
      `It carries ${priority.toLowerCase()} priority, an estimated ${estimatedMinutes}-minute commitment, and ${confidence}% confidence.`,
  };
}