import type { PlayerProfile } from "@/app/types";

export type EmpireHealth = {
  overall: number;
  cashScore: number;
  diversityScore: number;
  expansionScore: number;
  playstyleScore: number;
};

export function evaluateEmpire(
  profile: PlayerProfile
): EmpireHealth {
  const cashScore = Math.min(
    100,
    Math.round(profile.cash / 50000)
  );

  const diversityScore = Math.min(
    100,
    profile.ownedBusinesses.length * 15
  );

  const expansionScore =
    profile.cash >= 2_000_000 ? 100 : 60;

  const playstyleScore =
    profile.playstyle === "solo" ? 95 : 85;

  const overall = Math.round(
    (
      cashScore +
      diversityScore +
      expansionScore +
      playstyleScore
    ) / 4
  );

  return {
    overall,
    cashScore,
    diversityScore,
    expansionScore,
    playstyleScore,
  };
}