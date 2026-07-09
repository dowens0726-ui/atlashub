import type { EmpireModel, PlayerProfile } from "@/app/types";
import type { AtlasImpact } from "./impact.engine";

export type EmpireForecast = {
  currentScore: number;
  projectedScore: number;
  currentCash: number;
  projectedCash: number;
  incomeGain: number;
  unlocks: number;
  risk: AtlasImpact["risk"];

  trend: "Growing" | "Stable" | "Declining";
  outlook: string;
  strategy: string;
};

export function buildEmpireForecast(
  profile: PlayerProfile,
  empire: EmpireModel,
  impact: AtlasImpact
): EmpireForecast {
  const projectedScore = Math.min(
    100,
    empire.overallScore + impact.empireScoreGain
  );

  const projectedCash = Math.max(
    0,
    profile.cash + impact.estimatedIncomeGain
  );

  const scoreDifference =
    projectedScore - empire.overallScore;


  let trend: EmpireForecast["trend"] = "Stable";

  if (scoreDifference > 0) {
    trend = "Growing";
  }

  if (scoreDifference < 0) {
    trend = "Declining";
  }


  const outlook =
    trend === "Growing"
      ? "Your empire is moving toward a stronger growth position."
      : trend === "Declining"
        ? "Current decisions may slow future progression."
        : "Your empire position remains steady while Atlas evaluates the next opportunity.";


  const strategy =
    impact.risk === "Low"
      ? "Continue expanding income-producing assets while maintaining financial flexibility."
      : impact.risk === "Medium"
        ? "Grow carefully and preserve enough resources for future opportunities."
        : "Prioritize rebuilding resources before making major investments.";


  return {
    currentScore: empire.overallScore,

    projectedScore,

    currentCash: profile.cash,

    projectedCash,

    incomeGain: impact.estimatedIncomeGain,

    unlocks: impact.estimatedUnlocks,

    risk: impact.risk,

    trend,

    outlook,

    strategy,
  };
}