import type {
  EmpireGrade,
  EmpireMetric,
  EmpireModel,
} from "@/app/types";

export type FinancialHealth =
  | "Excellent"
  | "Strong"
  | "Stable"
  | "Developing";

export type EconomyFocus =
  | "Financial Strength"
  | "Business Portfolio"
  | "Growth Potential"
  | "Efficiency";

export type EconomyMetricAnalysis = {
  label: string;

  score: number;

  grade: EmpireGrade;

  status: FinancialHealth;

  recommendation: string;
};

export type EconomyAnalysis = {
  financialHealth: FinancialHealth;

  economyScore: number;

  economyGrade: EmpireGrade;

  strongestArea: EconomyFocus;

  weakestArea: EconomyFocus;

  primaryRecommendation: string;

  savingsGuidance: string;

  growthGuidance: string;

  metrics: EconomyMetricAnalysis[];

  warnings: string[];

  summary: string;
};

export type EconomyEngineInput = {
  empire: EmpireModel;
};

type NamedEconomyMetric = {
  focus: EconomyFocus;

  metric: EmpireMetric;
};

function normalizeScore(
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

function determineFinancialHealth(
  score: number
): FinancialHealth {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Strong";
  }

  if (score >= 60) {
    return "Stable";
  }

  return "Developing";
}

function buildMetricRecommendation(
  focus: EconomyFocus,
  score: number
): string {
  if (score >= 90) {
    return `${focus} is performing at an elite level. Preserve this advantage while investing in weaker areas.`;
  }

  if (score >= 75) {
    return `${focus} is strong. Continue improving it without sacrificing liquidity or operational balance.`;
  }

  if (score >= 60) {
    return `${focus} is stable but has room to improve. Prioritize upgrades with clear progression or efficiency benefits.`;
  }

  switch (focus) {
    case "Financial Strength":
      return "Prioritize income-generating activities and delay optional purchases until financial strength improves.";

    case "Business Portfolio":
      return "Expand the business portfolio with assets that improve reliable income and unlock future opportunities.";

    case "Growth Potential":
      return "Focus on progression activities that unlock stronger missions, businesses, properties, or equipment.";

    case "Efficiency":
      return "Reduce low-value spending and prioritize purchases that save time or increase earnings per session.";
  }
}

function getEconomyMetrics(
  empire: EmpireModel
): NamedEconomyMetric[] {
  return [
    {
      focus:
        "Financial Strength",

      metric:
        empire.financialStrength,
    },
    {
      focus:
        "Business Portfolio",

      metric:
        empire.businessPortfolio,
    },
    {
      focus:
        "Growth Potential",

      metric:
        empire.growthPotential,
    },
    {
      focus:
        "Efficiency",

      metric:
        empire.efficiency,
    },
  ];
}

function getStrongestMetric(
  metrics: NamedEconomyMetric[]
): NamedEconomyMetric {
  return metrics.reduce(
    (
      strongest,
      current
    ) =>
      current.metric.score >
      strongest.metric.score
        ? current
        : strongest
  );
}

function getWeakestMetric(
  metrics: NamedEconomyMetric[]
): NamedEconomyMetric {
  return metrics.reduce(
    (
      weakest,
      current
    ) =>
      current.metric.score <
      weakest.metric.score
        ? current
        : weakest
  );
}

function calculateEconomyScore(
  empire: EmpireModel
): number {
  return normalizeScore(
    (
      empire
        .financialStrength
        .score *
        0.35 +
      empire
        .businessPortfolio
        .score *
        0.25 +
      empire
        .growthPotential
        .score *
        0.2 +
      empire
        .efficiency
        .score *
        0.2
    )
  );
}

function buildWarnings(
  metrics: NamedEconomyMetric[]
): string[] {
  return metrics
    .filter(
      ({ metric }) =>
        metric.score < 60
    )
    .map(
      ({ focus, metric }) =>
        `${focus} is currently rated ${metric.grade} with a score of ${normalizeScore(
          metric.score
        )}. ${buildMetricRecommendation(
          focus,
          metric.score
        )}`
    );
}

function buildSavingsGuidance(
  financialStrength: number,
  efficiency: number
): string {
  if (
    financialStrength >= 80 &&
    efficiency >= 75
  ) {
    return "Your empire is positioned to consider strategic purchases while maintaining a reasonable reserve.";
  }

  if (financialStrength < 60) {
    return "Build a stronger financial reserve before committing to optional vehicles, cosmetics, or luxury purchases.";
  }

  if (efficiency < 60) {
    return "Avoid purchases that do not improve income, mission completion, travel time, or progression.";
  }

  return "Continue balancing progression purchases with enough reserve to protect future flexibility.";
}

function buildGrowthGuidance(
  businessPortfolio: number,
  growthPotential: number
): string {
  if (
    businessPortfolio < 60
  ) {
    return "Prioritize a business or property that adds reliable income and unlocks additional progression paths.";
  }

  if (
    growthPotential < 60
  ) {
    return "Focus on missions, unlocks, and strategic assets that expand the empire's future earning potential.";
  }

  return "Continue strengthening the portfolio through purchases that compound income, access, and long-term flexibility.";
}

export function buildEconomyAnalysis({
  empire,
}: EconomyEngineInput): EconomyAnalysis {
  const economyMetrics =
    getEconomyMetrics(
      empire
    );

  const strongestMetric =
    getStrongestMetric(
      economyMetrics
    );

  const weakestMetric =
    getWeakestMetric(
      economyMetrics
    );

  const economyScore =
    calculateEconomyScore(
      empire
    );

  const financialHealth =
    determineFinancialHealth(
      economyScore
    );

  const metrics =
    economyMetrics.map(
      ({
        focus,
        metric,
      }): EconomyMetricAnalysis => ({
        label:
          metric.label,

        score:
          normalizeScore(
            metric.score
          ),

        grade:
          metric.grade,

        status:
          determineFinancialHealth(
            metric.score
          ),

        recommendation:
          buildMetricRecommendation(
            focus,
            metric.score
          ),
      })
    );

  const primaryRecommendation =
    buildMetricRecommendation(
      weakestMetric.focus,
      weakestMetric.metric.score
    );

  return {
    financialHealth,

    economyScore,

    economyGrade:
      empire.overallGrade,

    strongestArea:
      strongestMetric.focus,

    weakestArea:
      weakestMetric.focus,

    primaryRecommendation,

    savingsGuidance:
      buildSavingsGuidance(
        empire
          .financialStrength
          .score,
        empire
          .efficiency
          .score
      ),

    growthGuidance:
      buildGrowthGuidance(
        empire
          .businessPortfolio
          .score,
        empire
          .growthPotential
          .score
      ),

    metrics,

    warnings:
      buildWarnings(
        economyMetrics
      ),

    summary:
      `Atlas rates the empire economy as ${financialHealth.toLowerCase()} with a weighted score of ${economyScore}. ` +
      `${strongestMetric.focus} is currently the strongest economic area, while ${weakestMetric.focus} should receive the next investment focus.`,
  };
}