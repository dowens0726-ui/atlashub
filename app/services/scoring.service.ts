import type { Business } from "@/app/types";

export type AtlasScore = {
  overall: number;
  profitability: number;
  beginner: number;
  solo: number;
  progression: number;
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function getBusinessScore(
  business: Business
): AtlasScore {
  const profitability = clamp(
    business.incomePotential +
      business.profitabilityRating * 3
  );

  const beginner =
    business.difficulty === "Easy"
      ? 95
      : business.difficulty === "Medium"
      ? 75
      : 55;

  const solo = business.soloFriendly ? 100 : 65;

  const progression = clamp(
    profitability * 0.5 +
      solo * 0.2 +
      beginner * 0.3
  );

  const overall = Math.round(
    profitability * 0.45 +
      beginner * 0.2 +
      solo * 0.2 +
      progression * 0.15
  );

  return {
    overall,
    profitability,
    beginner,
    solo,
    progression: Math.round(progression),
  };
}