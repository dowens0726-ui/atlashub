import type { PlayerProfile } from "@/app/types";
import type { AtlasRecommendation } from "./recommendation.engine";

export type EmpireSimulationRisk =
  | "Low"
  | "Medium"
  | "High";

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
  liquidityImpact: string;
};

export function buildEmpireSimulation(
  profile: PlayerProfile,
  recommendation: AtlasRecommendation
): EmpireSimulation {
  const purchaseCost =
    recommendation.category === "business"
      ? Math.round(
          (recommendation.estimatedProfit ?? 500000) * 1.25
        )
      : Math.round(
          (recommendation.estimatedProfit ?? 250000) * 0.75
        );

  const cashAfterPurchase =
    profile.cash - purchaseCost;

  const liquidityRatio =
    cashAfterPurchase / profile.cash;

  let risk: EmpireSimulationRisk = "Low";

  if (cashAfterPurchase < 0) {
    risk = "High";
  } else if (liquidityRatio < 0.25) {
    risk = "Medium";
  }

  const scoreDelta =
    risk === "Low"
      ? 8
      : risk === "Medium"
        ? 4
        : -5;

  const liquidityImpact =
    cashAfterPurchase >= 1_000_000
      ? "Maintains a strong cash reserve after investment."
      : cashAfterPurchase >= 0
        ? "Reduces liquidity but keeps the empire stable."
        : "Creates a cash shortage and limits flexibility.";

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
        ? "Atlas recommends waiting and building more resources first."
        : "Atlas believes this move improves your empire position.",

    projectedOutcome:
      risk === "High"
        ? "This purchase may slow future progression by reducing available capital."
        : "This investment should improve income potential and accelerate progression.",

    liquidityImpact,
  };
}