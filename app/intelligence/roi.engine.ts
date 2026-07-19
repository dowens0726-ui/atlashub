import type {
  PlayerProfile,
} from "@/app/types";

import type {
  AtlasPlayerIdentity,
} from "./player-identity.engine";

import type {
  EconomyAnalysis,
} from "./economy.engine";

export type BusinessOpportunity = {
  id: string;

  name: string;

  roiScore: number;

  estimatedProfit: number;

  recommended: boolean;

  reason: string;
};

export type ROIRating =
  | 1
  | 2
  | 3
  | 4
  | 5;

export type ROIAnalysis = {
  investment: string;

  investmentScore: number;

  confidence: number;

  roiRating: ROIRating;

  reasons: string[];

  risks: string[];

  recommendation: string;

  summary: string;
};

export type ROIEngineInput = {
  investment: string;

  economy: EconomyAnalysis;

  identity: AtlasPlayerIdentity;
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

function calculateInvestmentScore(
  economy: EconomyAnalysis
): number {
  return clamp(
    Math.round(
      economy.economyScore *
        0.85 +
      economy.metrics.length *
        3
    ),
    0,
    100
  );
}

function calculateConfidence(
  score: number
): number {
  return clamp(
    Math.round(
      score *
        0.95
    ),
    50,
    99
  );
}

function calculateRating(
  score: number
): ROIRating {
  if (score >= 90) {
    return 5;
  }

  if (score >= 75) {
    return 4;
  }

  if (score >= 60) {
    return 3;
  }

  if (score >= 40) {
    return 2;
  }

  return 1;
}

function buildReasons(
  identity: AtlasPlayerIdentity,
  economy: EconomyAnalysis
): string[] {
  return [
    `Supports a ${identity.archetype.toLowerCase()} playstyle.`,

    `Aligns with a ${identity.strategy.toLowerCase()} strategy.`,

    `Current economy is rated ${economy.financialHealth.toLowerCase()}.`,

    `Strengthens ${economy.weakestArea.toLowerCase()}.`,

    economy.primaryRecommendation,
  ];
}

function buildRisks(
  economy: EconomyAnalysis
): string[] {
  const risks = [
    ...economy.warnings,
  ];

  if (
    economy.financialHealth ===
    "Developing"
  ) {
    risks.push(
      "Avoid unnecessary luxury purchases until the empire becomes financially stronger."
    );
  }

  if (
    risks.length === 0
  ) {
    risks.push(
      "No significant investment risks detected."
    );
  }

  return risks;
}

export function evaluateBusinesses(
  profile: PlayerProfile
): BusinessOpportunity[] {
  const opportunities:
    BusinessOpportunity[] = [];

  if (
    !profile.ownedBusinesses.includes(
      "agency"
    ) &&
    profile.cash >=
      2_000_000
  ) {
    opportunities.push({
      id:
        "agency",

      name:
        "Agency",

      roiScore:
        94,

      estimatedProfit:
        750_000,

      recommended:
        true,

      reason:
        "High solo ROI with strong progression value.",
    });
  }

  if (
    profile.ownedBusinesses.includes(
      "agency"
    )
  ) {
    opportunities.push({
      id:
        "agency",

      name:
        "Agency",

      roiScore:
        90,

      estimatedProfit:
        600_000,

      recommended:
        false,

      reason:
        "Already owned. Continue running contracts.",
    });
  }

  return opportunities.sort(
    (
      firstOpportunity,
      secondOpportunity
    ) =>
      secondOpportunity.roiScore -
      firstOpportunity.roiScore
  );
}

export function buildROIAnalysis({
  investment,
  economy,
  identity,
}: ROIEngineInput): ROIAnalysis {
  const investmentScore =
    calculateInvestmentScore(
      economy
    );

  const confidence =
    calculateConfidence(
      investmentScore
    );

  const roiRating =
    calculateRating(
      investmentScore
    );

  const reasons =
    buildReasons(
      identity,
      economy
    );

  const risks =
    buildRisks(
      economy
    );

  return {
    investment,

    investmentScore,

    confidence,

    roiRating,

    reasons,

    risks,

    recommendation:
      economy.primaryRecommendation,

    summary:
      `${investment} has an investment score of ${investmentScore}/100 with ${confidence}% confidence based on your current economy and player identity.`,
  };
}