import type {
  Vehicle,
} from "@/app/types";

import {
  scoreVehicle,
} from "./score.engine";

import type {
  VehicleRecommendation,
  VehicleRecommendationCategory,
} from "./types";

function buildReason(
  category: VehicleRecommendationCategory,
  vehicle: Vehicle
): string {
  switch (category) {
    case "Best Overall":
      return `${vehicle.name} offers the strongest overall balance of performance, value, utility, accessibility, and versatility.`;

    case "Best Value":
      return `${vehicle.name} delivers the most useful performance and utility relative to its purchase price.`;

    case "Best Performance":
      return `${vehicle.name} ranks highest for speed, acceleration, handling, and braking.`;

    case "Best Utility":
      return `${vehicle.name} provides the strongest practical combination of seating, drivetrain, and vehicle class.`;

    case "Best Beginner Pick":
      return `${vehicle.name} is one of the easiest strong purchases for newer players because it combines affordability and practical usability.`;

    case "Best Specialist Pick":
      return `${vehicle.name} stands out as a focused option for players who value its specific strengths over general-purpose versatility.`;
  }
}

function getCategoryScore(
  category: VehicleRecommendationCategory,
  vehicle: Vehicle
): number {
  const {
    score,
  } =
    scoreVehicle(
      vehicle
    );

  switch (category) {
    case "Best Overall":
      return score.overall;

    case "Best Value":
      return score.value;

    case "Best Performance":
      return score.performance;

    case "Best Utility":
      return score.utility;

    case "Best Beginner Pick":
      return score.accessibility;

    case "Best Specialist Pick":
      return Math.max(
        score.performance,
        score.utility,
        score.versatility
      );
  }
}

export function rankVehiclesForCategory(
  vehicles: Vehicle[],
  category: VehicleRecommendationCategory
): VehicleRecommendation[] {
  return vehicles
    .map(
      (vehicle) => ({
        vehicle,
        score:
          scoreVehicle(
            vehicle
          ).score,
        category,
        reason:
          buildReason(
            category,
            vehicle
          ),
        categoryScore:
          getCategoryScore(
            category,
            vehicle
          ),
      })
    )
    .sort(
      (
        first,
        second
      ) =>
        second.categoryScore -
        first.categoryScore
    )
    .map(
      ({
        categoryScore: _categoryScore,
        ...recommendation
      }) =>
        recommendation
    );
}

export function getTopVehicleRecommendation(
  vehicles: Vehicle[],
  category: VehicleRecommendationCategory
): VehicleRecommendation | null {
  return (
    rankVehiclesForCategory(
      vehicles,
      category
    )[0] ??
    null
  );
}

export function getVehicleRecommendations(
  vehicles: Vehicle[],
  limit:
    number = 5
): VehicleRecommendation[] {
  const categories:
    VehicleRecommendationCategory[] = [
      "Best Overall",
      "Best Value",
      "Best Performance",
      "Best Utility",
      "Best Beginner Pick",
      "Best Specialist Pick",
    ];

  const recommendations =
    categories
      .map(
        (category) =>
          getTopVehicleRecommendation(
            vehicles,
            category
          )
      )
      .filter(
        (
          recommendation
        ): recommendation is VehicleRecommendation =>
          recommendation !==
          null
      );

  const uniqueRecommendations =
    new Map<
      string,
      VehicleRecommendation
    >();

  recommendations.forEach(
    (recommendation) => {
      if (
        !uniqueRecommendations.has(
          recommendation.vehicle.slug
        )
      ) {
        uniqueRecommendations.set(
          recommendation.vehicle.slug,
          recommendation
        );
      }
    }
  );

  return Array.from(
    uniqueRecommendations.values()
  ).slice(
    0,
    Math.max(
      0,
      limit
    )
  );
}