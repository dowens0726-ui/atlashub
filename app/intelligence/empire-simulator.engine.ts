import type { PlayerProfile } from "@/app/types";
import type { AtlasRecommendation } from "./recommendation.engine";

export type EmpireSimulationRisk = "Low" | "Medium" | "High";

export type EmpireSimulation = {
  title: string;
  targetName: string;
  purchaseCost: number;
  currentCash: number;
  cashAfterPurchase: number;
  scoreDelta: number;
  risk: EmpireSimulationRisk;
  recommendation: string;
  projectedOutcome: string;
};

export function buildEmpireSimulation(
  profile: PlayerProfile,
  recommendation: AtlasRecommendation
): EmpireSimulation {
  const purchaseCost = recommendation.estimatedProfit
    ? Math.round(recommendation.estimatedProfit * 1.5)
    : 250000;

  const cashAfterPurchase = profile.cash - purchaseCost;

  const risk: EmpireSimulationRisk =
    cashAfterPurchase >= 250000
      ? "Low"
      : cashAfterPurchase >= 0
        ? "Medium"
        : "High";

  const scoreDelta = risk === "Low" ? 8 : risk === "Medium" ? 4 : -6;

  return {
    title: "Empire Simulator",
    targetName: recommendation.title,
    purchaseCost,
    currentCash: profile.cash,
    cashAfterPurchase,
    scoreDelta,
    risk,
    recommendation:
      risk === "High"
        ? "Atlas recommends waiting before making this move."
        : "Atlas believes this move can strengthen your empire position.",
    projectedOutcome:
      risk === "High"
        ? "Acting now may leave you overextended and reduce flexibility."
        : "Acting now should improve your long-term earning potential.",
  };
}