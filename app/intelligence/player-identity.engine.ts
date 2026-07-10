import type {
  PlayerProfile,
} from "@/app/types";


export type AtlasPlayerIdentity = {
  archetype:
    | "Empire Builder"
    | "Solo Operator"
    | "Competitive Driver"
    | "Crew Specialist";

  strategy:
    | "Long-Term Growth"
    | "Fast Progression"
    | "Performance Focus"
    | "Team Expansion";

  riskProfile:
    | "Calculated"
    | "Aggressive"
    | "Conservative";

  strengths: string[];

  focus: string;

  confidence: number;

  summary: string;
};


export function buildPlayerIdentity(
  profile: PlayerProfile
): AtlasPlayerIdentity {

  const strengths: string[] = [];


  let archetype:
    AtlasPlayerIdentity["archetype"] =
      "Empire Builder";


  let strategy:
    AtlasPlayerIdentity["strategy"] =
      "Long-Term Growth";


  let riskProfile:
    AtlasPlayerIdentity["riskProfile"] =
      "Calculated";


  if (
    profile.playstyle === "solo"
  ) {
    archetype = "Solo Operator";
    strategy = "Fast Progression";

    strengths.push(
      "Independent decision making"
    );
  }


  if (
    profile.playstyle === "crew"
  ) {
    archetype = "Crew Specialist";
    strategy = "Team Expansion";

    strengths.push(
      "Team-based progression"
    );
  }


  if (
    profile.playstyle === "racing"
  ) {
    archetype = "Competitive Driver";
    strategy = "Performance Focus";

    strengths.push(
      "Vehicle optimization"
    );
  }


  if (
    profile.playstyle === "business"
  ) {
    strengths.push(
      "Building scalable income assets"
    );

    strengths.push(
      "Strategic investment decisions"
    );
  }


  if (
    profile.cash > 5_000_000
  ) {
    riskProfile = "Aggressive";

    strengths.push(
      "Strong financial flexibility"
    );
  }


  if (
    profile.cash < 500_000
  ) {
    riskProfile = "Conservative";
  }


  return {
    archetype,

    strategy,

    riskProfile,

    strengths,

    focus:
      profile.playstyle === "business"
        ? "Growing your empire through smart investments."
        : "Optimizing your preferred playstyle.",

    confidence:
      Math.min(
        95,
        60 +
          profile.ownedBusinesses.length * 5 +
          profile.ownedVehicles.length * 3
      ),

    summary:
      "Atlas is building your player identity from your decisions, assets, and progression style.",
  };
}
