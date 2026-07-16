import type {
  Vehicle,
} from "@/app/types";

import {
  compareVehicles,
} from "./comparison.engine";

import {
  getGarageRecommendation,
} from "./garage.engine";

import {
  getTopVehicleRecommendation,
} from "./recommendation.engine";

import {
  scoreVehicle,
} from "./score.engine";

import type {
  VehicleRecommendationCategory,
} from "./types";

export type VehicleAdvisorInput = {
  ownedVehicles?: Vehicle[];
  availableVehicles: Vehicle[];
  comparedVehicles?: [
    Vehicle,
    Vehicle,
  ];
  recommendationCategory?:
    VehicleRecommendationCategory;
};

export type VehicleAdvisorResult = {
  headline: string;
  recommendation: string;
  supportingPoints: string[];
  recommendedVehicleSlug:
    string | null;
};

function buildVehicleAdvice(
  vehicle: Vehicle
): VehicleAdvisorResult {
  const breakdown =
    scoreVehicle(
      vehicle
    );

  const supportingPoints = [
    ...breakdown.strengths.map(
      (strength) =>
        `Strength: ${strength}`
    ),
    ...breakdown.weaknesses.map(
      (weakness) =>
        `Watchout: ${weakness}`
    ),
  ];

  return {
    headline:
      `${vehicle.name} Atlas Assessment`,
    recommendation:
      breakdown.summary,
    supportingPoints,
    recommendedVehicleSlug:
      vehicle.slug,
  };
}

export function getVehicleAdvisorResult({
  ownedVehicles = [],
  availableVehicles,
  comparedVehicles,
  recommendationCategory =
    "Best Overall",
}: VehicleAdvisorInput):
  VehicleAdvisorResult {
  if (
    comparedVehicles
  ) {
    const comparison =
      compareVehicles(
        comparedVehicles[0],
        comparedVehicles[1]
      );

    return {
      headline:
        comparison.winnerSlug
          ? "Atlas Comparison Winner"
          : "Atlas Comparison Draw",
      recommendation:
        comparison.conclusion,
      supportingPoints: [
        `${comparison.first.vehicle.name}: ${comparison.first.score.overall}/100`,
        `${comparison.second.vehicle.name}: ${comparison.second.score.overall}/100`,
      ],
      recommendedVehicleSlug:
        comparison.winnerSlug,
    };
  }

  if (
    ownedVehicles.length >
    0
  ) {
    const garageRecommendation =
      getGarageRecommendation(
        ownedVehicles,
        availableVehicles
      );

    if (
      garageRecommendation
    ) {
      return {
        headline:
          "Atlas Garage Recommendation",
        recommendation:
          garageRecommendation.reason,
        supportingPoints:
          garageRecommendation.gaps.map(
            (gap) =>
              `Garage gap: ${gap}`
          ),
        recommendedVehicleSlug:
          garageRecommendation
            .recommendedVehicle
            .slug,
      };
    }
  }

  const recommendation =
    getTopVehicleRecommendation(
      availableVehicles,
      recommendationCategory
    );

  if (
    recommendation
  ) {
    return {
      headline:
        recommendation.category,
      recommendation:
        recommendation.reason,
      supportingPoints: [
        `Overall: ${recommendation.score.overall}/100`,
        `Performance: ${recommendation.score.performance}/100`,
        `Value: ${recommendation.score.value}/100`,
        `Utility: ${recommendation.score.utility}/100`,
      ],
      recommendedVehicleSlug:
        recommendation.vehicle.slug,
    };
  }

  const fallbackVehicle =
    availableVehicles[0];

  if (
    fallbackVehicle
  ) {
    return buildVehicleAdvice(
      fallbackVehicle
    );
  }

  return {
    headline:
      "Atlas Vehicle Advisor",
    recommendation:
      "No eligible vehicles are available for analysis.",
    supportingPoints: [],
    recommendedVehicleSlug:
      null,
  };
}