import type { PlayerProfile } from "@/app/types";

export type BusinessOpportunity = {
  id: string;
  name: string;
  roiScore: number;
  estimatedProfit: number;
  recommended: boolean;
  reason: string;
};

export function evaluateBusinesses(
  profile: PlayerProfile
): BusinessOpportunity[] {
  const opportunities: BusinessOpportunity[] = [];

  if (
    !profile.ownedBusinesses.includes("agency") &&
    profile.cash >= 2_000_000
  ) {
    opportunities.push({
      id: "agency",
      name: "Agency",
      roiScore: 94,
      estimatedProfit: 750000,
      recommended: true,
      reason:
        "High solo ROI with strong progression value.",
    });
  }

  if (
    profile.ownedBusinesses.includes("agency")
  ) {
    opportunities.push({
      id: "agency",
      name: "Agency",
      roiScore: 90,
      estimatedProfit: 600000,
      recommended: false,
      reason:
        "Already owned. Continue running contracts.",
    });
  }

  return opportunities.sort(
    (a, b) => b.roiScore - a.roiScore
  );
}