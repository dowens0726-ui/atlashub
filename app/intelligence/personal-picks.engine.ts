import { vehicles, businesses } from "@/app/data";
import type { PlayerProfile } from "@/app/types";

import { getAtlasVehicleScore } from "@/app/services/atlas-score.service";
import { getBusinessScore } from "@/app/services/scoring.service";

import type { AtlasRecommendation } from "./recommendation.engine";

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getVehicleRecommendation(
  profile: PlayerProfile
): AtlasRecommendation | null {
  const ownedVehicles = new Set(profile.ownedVehicles);

  const availableVehicles = vehicles.filter(
    (vehicle) => !ownedVehicles.has(vehicle.slug)
  );

  const rankedVehicles = availableVehicles
    .map((vehicle) => {
      const atlasScore = getAtlasVehicleScore(vehicle);

      let score = 0;

      const reasons: string[] = [];

      // Core performance intelligence
      score += atlasScore.overall * 0.4;

      if (atlasScore.overall >= 80) {
        reasons.push(
          "High Atlas performance rating."
        );
      }

      // Playstyle intelligence
      if (profile.playstyle === "solo") {
        score += atlasScore.beginner * 0.15;

        if (atlasScore.beginner >= 80) {
          reasons.push(
            "Strong solo-friendly performance."
          );
        }
      }

      // Budget efficiency
      if (vehicle.price <= profile.cash) {
        const affordability =
          100 -
          (vehicle.price /
            Math.max(profile.cash, 1)) *
            50;

        score += clamp(affordability) * 0.15;

        reasons.push(
          "Fits your current financial position."
        );
      } else {
        score -= 15;
      }

      // Upgrade value
      if (vehicle.price > 500000) {
        score += 10;
        reasons.push(
          "Represents a meaningful upgrade."
        );
      }

      // Avoid recommending cheap starter vehicles
      if (
        profile.cash > 2000000 &&
        vehicle.price < 100000
      ) {
        score -= 25;
      }

      return {
        vehicle,
        confidence: clamp(score),
        reasons,
      };
    })
    .sort(
      (a, b) =>
        b.confidence - a.confidence
    );

  const best = rankedVehicles[0];

  if (!best) {
    return null;
  }

  return {
    id: `vehicle:${best.vehicle.slug}`,
    title: `Buy the ${best.vehicle.name}`,
    summary: best.reasons.join(" "),
    category: "vehicle",
    priority: "medium",
    confidence: best.confidence,
    href: `/vehicles/${best.vehicle.slug}`,
  };
}

function getBusinessRecommendation(
  profile: PlayerProfile
): AtlasRecommendation | null {
  const ownedBusinesses = new Set(
    profile.ownedBusinesses
  );

  const rankedBusinesses = businesses
    .filter(
      (business) =>
        !ownedBusinesses.has(business.slug)
    )
    .map((business) => {
      const score = getBusinessScore(business);

      let confidence =
        score.overall * 0.4;

      const reasons: string[] = [];

      confidence +=
        business.incomePotential * 0.25;

      if (business.incomePotential >= 80) {
        reasons.push(
          "Strong income potential."
        );
      }

      if (
        profile.playstyle === "solo" &&
        business.soloFriendly
      ) {
        confidence += 15;

        reasons.push(
          "Matches your solo empire strategy."
        );
      }

      if (business.price <= profile.cash) {
        confidence += 10;

        reasons.push(
          "Affordable with current funds."
        );
      }

      return {
        business,
        confidence: clamp(confidence),
        reasons,
      };
    })
    .sort(
      (a, b) =>
        b.confidence - a.confidence
    );

  const best = rankedBusinesses[0];

  if (!best) {
    return null;
  }

  return {
    id: `business:${best.business.slug}`,
    title: `Buy the ${best.business.name}`,
    summary: best.reasons.join(" "),
    category: "business",
    priority: "high",
    confidence: best.confidence,
    estimatedProfit:
      best.business.incomePotential,
    href: `/data/businesses/${best.business.slug}`,
  };
}

export function getPersonalPicks(
  profile: PlayerProfile
): AtlasRecommendation[] {
  return [
    getBusinessRecommendation(profile),
    getVehicleRecommendation(profile),
  ]
    .filter(
      (
        recommendation
      ): recommendation is AtlasRecommendation =>
        Boolean(recommendation)
    )
    .sort(
      (a, b) =>
        b.confidence - a.confidence
    );
}