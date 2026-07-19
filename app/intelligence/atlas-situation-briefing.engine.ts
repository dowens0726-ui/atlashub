import type {
  AtlasSituation,
  AtlasSituationBottleneck,
} from "./situation-analysis.engine";

export type AtlasSituationBriefingPriority =
  | "Critical"
  | "High"
  | "Normal"
  | "Low";

export type AtlasSituationBriefingItem = {
  label: string;
  value: string;
};

export type AtlasSituationBriefing = {
  title: string;

  headline: string;

  summary: string;

  primaryFocus: string;

  priority: AtlasSituationBriefingPriority;

  statusItems: AtlasSituationBriefingItem[];

  strengths: string[];

  warnings: string[];

  nextStep: string;

  confidence: number;
};

function determinePriority(
  situation: AtlasSituation
): AtlasSituationBriefingPriority {
  if (
    situation.urgency === "Immediate" ||
    situation.riskLevel === "High"
  ) {
    return "Critical";
  }

  if (
    situation.urgency === "High" ||
    situation.riskLevel === "Elevated"
  ) {
    return "High";
  }

  if (
    situation.urgency === "Low" &&
    situation.riskLevel === "Low"
  ) {
    return "Low";
  }

  return "Normal";
}

function buildHeadline(
  situation: AtlasSituation
): string {
  if (
    situation.expansionReadiness === "Highly Ready"
  ) {
    return "Your empire is positioned for aggressive expansion.";
  }

  if (
    situation.expansionReadiness === "Ready"
  ) {
    return "Your empire is ready for controlled expansion.";
  }

  if (
    situation.expansionReadiness === "Cautious"
  ) {
    return "Your empire can grow, but capital should be deployed selectively.";
  }

  return "Protect liquidity before making another major investment.";
}

function buildStatusItems(
  situation: AtlasSituation
): AtlasSituationBriefingItem[] {
  return [
    {
      label: "Liquidity",
      value: situation.liquidityStatus,
    },
    {
      label: "Growth Phase",
      value: situation.growthPhase,
    },
    {
      label: "Expansion Readiness",
      value: situation.expansionReadiness,
    },
    {
      label: "Risk",
      value: situation.riskLevel,
    },
    {
      label: "Momentum",
      value: situation.momentum,
    },
    {
      label: "Investment Status",
      value:
        situation.investmentReadiness.status,
    },
  ];
}

function buildWarning(
  bottleneck: AtlasSituationBottleneck
): string {
  return `${bottleneck.title}: ${bottleneck.description}`;
}

function buildWarnings(
  situation: AtlasSituation
): string[] {
  const warnings =
    situation.bottlenecks
      .filter(
        (bottleneck) =>
          bottleneck.severity === "High" ||
          bottleneck.severity === "Medium"
      )
      .map(buildWarning);

  if (warnings.length > 0) {
    return warnings.slice(0, 3);
  }

  return [
    "No major strategic bottlenecks are currently limiting progression.",
  ];
}

function buildNextStep(
  situation: AtlasSituation
): string {
  if (
    situation.investmentReadiness.status ===
    "Preserve Cash"
  ) {
    return "Prioritize high-return activities and rebuild reserves before purchasing another major asset.";
  }

  if (
    situation.investmentReadiness.status ===
    "Selective Investment"
  ) {
    return "Only pursue investments that preserve the recommended reserve and clearly improve recurring income or efficiency.";
  }

  if (
    situation.investmentReadiness.status ===
    "Expansion Ready"
  ) {
    return "Evaluate the strongest available expansion opportunity and confirm that projected returns justify the capital deployment.";
  }

  return "Deploy excess capital toward the highest-return opportunity that supports long-term empire growth.";
}

export function buildAtlasSituationBriefing(
  situation: AtlasSituation
): AtlasSituationBriefing {
  return {
    title: "Atlas Situation Briefing",

    headline:
      buildHeadline(
        situation
      ),

    summary:
      situation.summary,

    primaryFocus:
      situation.primaryFocus,

    priority:
      determinePriority(
        situation
      ),

    statusItems:
      buildStatusItems(
        situation
      ),

    strengths:
      situation.strengths,

    warnings:
      buildWarnings(
        situation
      ),

    nextStep:
      buildNextStep(
        situation
      ),

    confidence:
      situation.confidence,
  };
}