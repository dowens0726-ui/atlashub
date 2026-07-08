import { businesses } from "@/app/data";
import type { PlayerProfile, ProgressionStage } from "@/app/types";
import { getProgressionPlan } from "./progression.service";

export type PlayerIntelligence = {
  profile: PlayerProfile;
  stage: ProgressionStage;
  cash: number;
  ownedBusinessCount: number;
  ownedVehicleCount: number;
  estimatedBusinessValue: number;
  estimatedIncomePotential: number;
  remainingBusinessCount: number;
};

export function getPlayerIntelligence(
  profile: PlayerProfile
): PlayerIntelligence {
  const ownedBusinesses = businesses.filter((business) =>
    profile.ownedBusinesses.includes(business.slug)
  );

  const progression = getProgressionPlan(profile);

  const estimatedBusinessValue = ownedBusinesses.reduce(
    (sum, business) => sum + business.price,
    0
  );

  const estimatedIncomePotential = ownedBusinesses.reduce(
    (sum, business) => sum + business.incomePotential,
    0
  );

  return {
    profile,
    stage: progression.stage,
    cash: profile.cash,
    ownedBusinessCount: profile.ownedBusinesses.length,
    ownedVehicleCount: profile.ownedVehicles.length,
    estimatedBusinessValue,
    estimatedIncomePotential,
    remainingBusinessCount: progression.steps.length,
  };
}