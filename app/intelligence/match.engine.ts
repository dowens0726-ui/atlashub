import type {
  Business,
  PlayerProfile,
  Vehicle,
} from "@/app/types";

import { getAtlasVehicleScore } from "@/app/services/atlas-score.service";
import { getBusinessScore } from "@/app/services/scoring.service";

export type AtlasMatch = {
  overall: number;

  factors: {
    performance: number;
    budget: number;
    playstyle: number;
    progression: number;
  };

  reasons: string[];
};

function clamp(value: number) {
  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}


export function getVehicleMatch(
  profile: PlayerProfile,
  vehicle: Vehicle
): AtlasMatch {
  const score =
    getAtlasVehicleScore(vehicle);

  const reasons: string[] = [];


  const performance =
    score.overall;


  if (performance >= 80) {
    reasons.push(
      "High Atlas performance rating."
    );
  }


  const budget =
    vehicle.price <= profile.cash
      ? 95
      : 40;


  if (budget >= 90) {
    reasons.push(
      "Fits your current budget."
    );
  }


  let playstyle = 70;

  if (
    profile.playstyle === "solo"
  ) {
    playstyle = score.beginner;

    if (playstyle >= 80) {
      reasons.push(
        "Matches your solo playstyle."
      );
    }
  }


  let progression = 70;

  if (
    vehicle.price >= 500000
  ) {
    progression += 15;

    reasons.push(
      "Provides meaningful progression."
    );
  }


  const overall = clamp(
    performance * 0.35 +
      budget * 0.25 +
      playstyle * 0.2 +
      progression * 0.2
  );


  return {
    overall,

    factors: {
      performance: clamp(performance),
      budget,
      playstyle: clamp(playstyle),
      progression: clamp(progression),
    },

    reasons,
  };
}


export function getBusinessMatch(
  profile: PlayerProfile,
  business: Business
): AtlasMatch {
  const score =
    getBusinessScore(business);

  const reasons: string[] = [];


  const performance =
    score.overall;


  if (score.profitability >= 80) {
    reasons.push(
      "Strong income potential."
    );
  }


  const budget =
    business.price <= profile.cash
      ? 95
      : 40;


  if (budget >= 90) {
    reasons.push(
      "Affordable with your current funds."
    );
  }


  const playstyle =
    profile.playstyle === "solo" &&
    business.soloFriendly
      ? 95
      : 70;


  if (playstyle >= 90) {
    reasons.push(
      "Fits your empire strategy."
    );
  }


  const progression =
    score.progression;


  if (progression >= 80) {
    reasons.push(
      "Improves long-term empire growth."
    );
  }


  return {
    overall: clamp(
      performance * 0.4 +
        budget * 0.2 +
        playstyle * 0.2 +
        progression * 0.2
    ),

    factors: {
      performance: clamp(performance),
      budget,
      playstyle,
      progression,
    },

    reasons,
  };
}