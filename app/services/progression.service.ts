import { businesses } from "@/app/data";
import type {
  PlayerProfile,
  ProgressionPlan,
  ProgressionStage,
  ProgressionStep,
} from "@/app/types";
import { getBusinessScore } from "./scoring.service";

function getStage(profile: PlayerProfile): ProgressionStage {
  if (profile.cash < 1000000) return "Early";
  if (profile.cash < 5000000) return "Mid";

  return "Late";
}

export function getProgressionPlan(
  profile: PlayerProfile
): ProgressionPlan {
  const ownedBusinesses = new Set(profile.ownedBusinesses);

  const steps: ProgressionStep[] = businesses
    .filter((business) => !ownedBusinesses.has(business.slug))
    .sort(
      (a, b) =>
        getBusinessScore(b).overall - getBusinessScore(a).overall
    )
    .map((business) => ({
      id: `progression:${business.slug}`,
      title: business.name,
      entityType: "business",
      slug: business.slug,
      estimatedCost: business.price,
      estimatedROI: business.incomePotential,
      reason:
        business.soloFriendly && profile.playstyle === "solo"
          ? "Strong fit for solo progression and income growth."
          : "Recommended based on Atlas Score and progression value.",
    }));

  const totalInvestment = steps.reduce(
    (sum, step) => sum + step.estimatedCost,
    0
  );

  return {
    stage: getStage(profile),
    completion: Math.round(
      (profile.ownedBusinesses.length /
        Math.max(profile.ownedBusinesses.length + steps.length, 1)) *
        100
    ),
    totalInvestment,
    nextStep: steps[0] ?? null,
    steps,
  };
}