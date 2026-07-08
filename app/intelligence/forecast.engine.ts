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
};

export function buildEmpireForecast(
  profile: PlayerProfile,
  empire: EmpireModel,
  impact: AtlasImpact
): EmpireForecast {
  return {
    currentScore: empire.overallScore,
    projectedScore: Math.min(100, empire.overallScore + impact.empireScoreGain),
    currentCash: profile.cash,
    projectedCash: Math.max(0, profile.cash + impact.estimatedIncomeGain),
    incomeGain: impact.estimatedIncomeGain,
    unlocks: impact.estimatedUnlocks,
    risk: impact.risk,
  };
}