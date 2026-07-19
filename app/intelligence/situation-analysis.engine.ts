import type {
  EmpireModel,
  PlayerProfile,
} from "@/app/types";

export type AtlasLiquidityStatus =
  | "Critical"
  | "Low"
  | "Stable"
  | "Strong"
  | "Excellent";

export type AtlasGrowthPhase =
  | "Foundation"
  | "Early Growth"
  | "Expansion"
  | "Optimization"
  | "Dominance";

export type AtlasExpansionReadiness =
  | "Not Ready"
  | "Cautious"
  | "Ready"
  | "Highly Ready";

export type AtlasSituationRisk =
  | "High"
  | "Elevated"
  | "Moderate"
  | "Low";

export type AtlasUrgency =
  | "Immediate"
  | "High"
  | "Normal"
  | "Low";

export type AtlasMomentum =
  | "Stalled"
  | "Building"
  | "Strong"
  | "Accelerating";

export type AtlasInvestmentReadiness = {
  status:
    | "Preserve Cash"
    | "Selective Investment"
    | "Expansion Ready"
    | "Aggressive Growth";

  availableCapital: number;

  recommendedReserve: number;

  deployableCapital: number;

  reserveRatio: number;
};

export type AtlasSituationBottleneck = {
  id: string;

  category:
    | "Liquidity"
    | "Business Portfolio"
    | "Growth"
    | "Efficiency"
    | "Assets";

  title: string;

  description: string;

  severity:
    | "High"
    | "Medium"
    | "Low";
};

export type AtlasSituation = {
  liquidityStatus: AtlasLiquidityStatus;

  growthPhase: AtlasGrowthPhase;

  expansionReadiness: AtlasExpansionReadiness;

  riskLevel: AtlasSituationRisk;

  urgency: AtlasUrgency;

  momentum: AtlasMomentum;

  investmentReadiness: AtlasInvestmentReadiness;

  efficiencyScore: number;

  confidence: number;

  primaryFocus: string;

  summary: string;

  strengths: string[];

  bottlenecks: AtlasSituationBottleneck[];
};

export type AnalyzeAtlasSituationInput = {
  profile: PlayerProfile;

  empire: EmpireModel;
};

const MINIMUM_CASH_RESERVE = 500_000;

function clampScore(value: number): number {
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

function getRecommendedReserve(
  profile: PlayerProfile
): number {
  const businessReserve =
    profile.ownedBusinesses.length *
    150_000;

  const propertyReserve =
    (profile.ownedProperties?.length ?? 0) *
    100_000;

  return Math.max(
    MINIMUM_CASH_RESERVE,
    MINIMUM_CASH_RESERVE +
      businessReserve +
      propertyReserve
  );
}

function determineLiquidityStatus(
  cash: number,
  recommendedReserve: number
): AtlasLiquidityStatus {
  const reserveRatio =
    recommendedReserve > 0
      ? cash / recommendedReserve
      : 0;

  if (reserveRatio < 0.5) {
    return "Critical";
  }

  if (reserveRatio < 1) {
    return "Low";
  }

  if (reserveRatio < 2) {
    return "Stable";
  }

  if (reserveRatio < 4) {
    return "Strong";
  }

  return "Excellent";
}

function determineGrowthPhase(
  profile: PlayerProfile,
  empire: EmpireModel
): AtlasGrowthPhase {
  const businessCount =
    profile.ownedBusinesses.length;

  const totalAssets =
    businessCount +
    profile.ownedVehicles.length +
    (profile.ownedProperties?.length ?? 0);

  if (
    businessCount === 0 &&
    totalAssets <= 2
  ) {
    return "Foundation";
  }

  if (
    businessCount <= 1 &&
    empire.overallScore < 50
  ) {
    return "Early Growth";
  }

  if (
    empire.overallScore < 70 ||
    businessCount < 4
  ) {
    return "Expansion";
  }

  if (empire.overallScore < 90) {
    return "Optimization";
  }

  return "Dominance";
}

function determineExpansionReadiness(
  liquidityStatus: AtlasLiquidityStatus,
  empire: EmpireModel
): AtlasExpansionReadiness {
  if (
    liquidityStatus === "Critical" ||
    liquidityStatus === "Low"
  ) {
    return "Not Ready";
  }

  if (
    liquidityStatus === "Stable" ||
    empire.growthPotential.score < 55
  ) {
    return "Cautious";
  }

  if (
    liquidityStatus === "Excellent" &&
    empire.growthPotential.score >= 80
  ) {
    return "Highly Ready";
  }

  return "Ready";
}

function determineRiskLevel(
  liquidityStatus: AtlasLiquidityStatus,
  empire: EmpireModel
): AtlasSituationRisk {
  if (
    liquidityStatus === "Critical" ||
    empire.financialStrength.score < 35
  ) {
    return "High";
  }

  if (
    liquidityStatus === "Low" ||
    empire.efficiency.score < 45
  ) {
    return "Elevated";
  }

  if (
    liquidityStatus === "Stable" ||
    empire.overallScore < 70
  ) {
    return "Moderate";
  }

  return "Low";
}

function determineUrgency(
  riskLevel: AtlasSituationRisk,
  empire: EmpireModel
): AtlasUrgency {
  if (
    riskLevel === "High" ||
    empire.financialStrength.score < 30
  ) {
    return "Immediate";
  }

  if (
    riskLevel === "Elevated" ||
    empire.efficiency.score < 45
  ) {
    return "High";
  }

  if (
    empire.overallScore >= 85 &&
    riskLevel === "Low"
  ) {
    return "Low";
  }

  return "Normal";
}

function determineMomentum(
  empire: EmpireModel
): AtlasMomentum {
  const growthScore =
    empire.growthPotential.score;

  const efficiencyScore =
    empire.efficiency.score;

  if (
    growthScore < 35 &&
    efficiencyScore < 35
  ) {
    return "Stalled";
  }

  if (
    growthScore < 60 ||
    efficiencyScore < 60
  ) {
    return "Building";
  }

  if (
    growthScore >= 85 &&
    efficiencyScore >= 80
  ) {
    return "Accelerating";
  }

  return "Strong";
}

function buildInvestmentReadiness(
  profile: PlayerProfile,
  recommendedReserve: number,
  expansionReadiness: AtlasExpansionReadiness
): AtlasInvestmentReadiness {
  const deployableCapital =
    Math.max(
      0,
      profile.cash -
        recommendedReserve
    );

  const reserveRatio =
    recommendedReserve > 0
      ? profile.cash /
        recommendedReserve
      : 0;

  let status:
    AtlasInvestmentReadiness["status"] =
      "Selective Investment";

  if (
    expansionReadiness ===
    "Not Ready"
  ) {
    status = "Preserve Cash";
  }

  if (
    expansionReadiness === "Ready"
  ) {
    status = "Expansion Ready";
  }

  if (
    expansionReadiness ===
    "Highly Ready"
  ) {
    status = "Aggressive Growth";
  }

  return {
    status,

    availableCapital:
      profile.cash,

    recommendedReserve,

    deployableCapital,

    reserveRatio:
      Number(
        reserveRatio.toFixed(2)
      ),
  };
}

function buildBottlenecks(
  profile: PlayerProfile,
  empire: EmpireModel,
  liquidityStatus: AtlasLiquidityStatus
): AtlasSituationBottleneck[] {
  const bottlenecks:
    AtlasSituationBottleneck[] = [];

  if (
    liquidityStatus === "Critical" ||
    liquidityStatus === "Low"
  ) {
    bottlenecks.push({
      id: "liquidity-reserve",

      category: "Liquidity",

      title: "Cash reserves are limiting growth",

      description:
        "Build a stronger liquidity buffer before making another major investment.",

      severity: "High",
    });
  }

  if (
    profile.ownedBusinesses.length === 0
  ) {
    bottlenecks.push({
      id: "business-foundation",

      category: "Business Portfolio",

      title: "No income-producing businesses owned",

      description:
        "Your empire lacks a recurring-income foundation and remains dependent on active earnings.",

      severity: "High",
    });
  } else if (
    empire.businessPortfolio.score < 55
  ) {
    bottlenecks.push({
      id: "business-diversification",

      category: "Business Portfolio",

      title: "Business portfolio needs diversification",

      description:
        "Additional complementary businesses could improve income stability and expansion options.",

      severity: "Medium",
    });
  }

  if (
    empire.growthPotential.score < 50
  ) {
    bottlenecks.push({
      id: "growth-potential",

      category: "Growth",

      title: "Growth potential is constrained",

      description:
        "Current assets and available capital are not yet creating enough expansion leverage.",

      severity: "Medium",
    });
  }

  if (
    empire.efficiency.score < 50
  ) {
    bottlenecks.push({
      id: "empire-efficiency",

      category: "Efficiency",

      title: "Empire efficiency is below target",

      description:
        "Prioritize higher-return activities and reduce low-impact spending before expanding further.",

      severity: "Medium",
    });
  }

  if (
    profile.ownedVehicles.length === 0
  ) {
    bottlenecks.push({
      id: "vehicle-capability",

      category: "Assets",

      title: "Vehicle capability is limited",

      description:
        "A dependable mission and travel vehicle could improve execution speed and overall efficiency.",

      severity: "Low",
    });
  }

  return bottlenecks;
}

function buildStrengths(
  profile: PlayerProfile,
  empire: EmpireModel,
  liquidityStatus: AtlasLiquidityStatus
): string[] {
  const strengths: string[] = [];

  if (
    liquidityStatus === "Strong" ||
    liquidityStatus === "Excellent"
  ) {
    strengths.push(
      "Strong cash flexibility"
    );
  }

  if (
    empire.businessPortfolio.score >= 70
  ) {
    strengths.push(
      "Diversified business portfolio"
    );
  }

  if (
    empire.growthPotential.score >= 75
  ) {
    strengths.push(
      "High expansion potential"
    );
  }

  if (
    empire.efficiency.score >= 75
  ) {
    strengths.push(
      "Efficient empire operation"
    );
  }

  if (
    profile.ownedVehicles.length >= 5
  ) {
    strengths.push(
      "Strong vehicle capability"
    );
  }

  if (strengths.length === 0) {
    strengths.push(
      "Atlas has identified clear opportunities for improvement"
    );
  }

  return strengths;
}

function determinePrimaryFocus(
  expansionReadiness: AtlasExpansionReadiness,
  riskLevel: AtlasSituationRisk,
  empire: EmpireModel
): string {
  if (
    riskLevel === "High" ||
    expansionReadiness === "Not Ready"
  ) {
    return "Rebuild liquidity and protect current progress.";
  }

  if (
    empire.efficiency.score <
    empire.growthPotential.score
  ) {
    return "Improve empire efficiency before expanding further.";
  }

  if (
    empire.businessPortfolio.score < 65
  ) {
    return "Strengthen and diversify recurring income.";
  }

  if (
    expansionReadiness ===
    "Highly Ready"
  ) {
    return "Deploy capital into high-return expansion opportunities.";
  }

  return "Continue balanced, controlled empire growth.";
}

function calculateSituationConfidence(
  profile: PlayerProfile,
  empire: EmpireModel
): number {
  const availableDataSignals = [
    Number.isFinite(profile.cash),
    Number.isFinite(
      empire.overallScore
    ),
    Number.isFinite(
      empire.financialStrength.score
    ),
    Number.isFinite(
      empire.businessPortfolio.score
    ),
    Number.isFinite(
      empire.growthPotential.score
    ),
    Number.isFinite(
      empire.efficiency.score
    ),
  ];

  const completenessScore =
    availableDataSignals.filter(
      Boolean
    ).length /
    availableDataSignals.length;

  const assetSignal =
    Math.min(
      12,
      profile.ownedBusinesses.length *
        3 +
        profile.ownedVehicles.length
    );

  return clampScore(
    74 +
      completenessScore * 14 +
      assetSignal
  );
}

function buildSituationSummary(
  growthPhase: AtlasGrowthPhase,
  liquidityStatus: AtlasLiquidityStatus,
  expansionReadiness: AtlasExpansionReadiness,
  momentum: AtlasMomentum
): string {
  return [
    `Your empire is currently in the ${growthPhase.toLowerCase()} phase.`,
    `Liquidity is ${liquidityStatus.toLowerCase()}.`,
    `Expansion readiness is ${expansionReadiness.toLowerCase()}.`,
    `Current momentum is ${momentum.toLowerCase()}.`,
  ].join(" ");
}

export function analyzeAtlasSituation({
  profile,
  empire,
}: AnalyzeAtlasSituationInput): AtlasSituation {
  const recommendedReserve =
    getRecommendedReserve(
      profile
    );

  const liquidityStatus =
    determineLiquidityStatus(
      profile.cash,
      recommendedReserve
    );

  const growthPhase =
    determineGrowthPhase(
      profile,
      empire
    );

  const expansionReadiness =
    determineExpansionReadiness(
      liquidityStatus,
      empire
    );

  const riskLevel =
    determineRiskLevel(
      liquidityStatus,
      empire
    );

  const urgency =
    determineUrgency(
      riskLevel,
      empire
    );

  const momentum =
    determineMomentum(
      empire
    );

  const investmentReadiness =
    buildInvestmentReadiness(
      profile,
      recommendedReserve,
      expansionReadiness
    );

  const bottlenecks =
    buildBottlenecks(
      profile,
      empire,
      liquidityStatus
    );

  const strengths =
    buildStrengths(
      profile,
      empire,
      liquidityStatus
    );

  const primaryFocus =
    determinePrimaryFocus(
      expansionReadiness,
      riskLevel,
      empire
    );

  return {
    liquidityStatus,

    growthPhase,

    expansionReadiness,

    riskLevel,

    urgency,

    momentum,

    investmentReadiness,

    efficiencyScore:
      clampScore(
        empire.efficiency.score
      ),

    confidence:
      calculateSituationConfidence(
        profile,
        empire
      ),

    primaryFocus,

    summary:
      buildSituationSummary(
        growthPhase,
        liquidityStatus,
        expansionReadiness,
        momentum
      ),

    strengths,

    bottlenecks,
  };
}