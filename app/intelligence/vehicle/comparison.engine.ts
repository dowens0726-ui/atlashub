import type {
  Vehicle,
} from "@/app/types";

import {
  scoreVehicle,
} from "./score.engine";

import type {
  VehicleComparisonResult,
  VehicleScoreBreakdown,
} from "./types";

function getScoreDifference(
  first: VehicleScoreBreakdown,
  second: VehicleScoreBreakdown
): number {
  return (
    first.score.overall -
    second.score.overall
  );
}

function buildConclusion(
  first: VehicleScoreBreakdown,
  second: VehicleScoreBreakdown
): string {
  const difference =
    getScoreDifference(
      first,
      second
    );

  if (
    Math.abs(
      difference
    ) <= 2
  ) {
    return `${first.vehicle.name} and ${second.vehicle.name} are closely matched overall. The better choice depends on whether the player prioritizes ${first.score.performance >= second.score.performance ? "performance" : "utility and accessibility"}.`;
  }

  const winner =
    difference > 0
      ? first
      : second;

  const loser =
    difference > 0
      ? second
      : first;

  if (
    winner.score.performance >
      loser.score.performance &&
    winner.score.utility >
      loser.score.utility
  ) {
    return `${winner.vehicle.name} is the stronger all-around choice, outperforming ${loser.vehicle.name} in both performance and practical utility.`;
  }

  if (
    winner.score.performance >
    loser.score.performance
  ) {
    return `${winner.vehicle.name} is the better choice for players who prioritize speed and driving performance, while ${loser.vehicle.name} may still offer better practicality or value.`;
  }

  if (
    winner.score.utility >
    loser.score.utility
  ) {
    return `${winner.vehicle.name} wins through stronger practicality and versatility, while ${loser.vehicle.name} is better suited to a more specialized performance role.`;
  }

  return `${winner.vehicle.name} earns the higher Atlas score and is the stronger overall purchase for most players.`;
}

function determineWinnerSlug(
  first: VehicleScoreBreakdown,
  second: VehicleScoreBreakdown
): string | null {
  const difference =
    getScoreDifference(
      first,
      second
    );

  if (
    Math.abs(
      difference
    ) <= 2
  ) {
    return null;
  }

  return difference > 0
    ? first.vehicle.slug
    : second.vehicle.slug;
}

export function compareVehicles(
  firstVehicle: Vehicle,
  secondVehicle: Vehicle
): VehicleComparisonResult {
  const first =
    scoreVehicle(
      firstVehicle
    );

  const second =
    scoreVehicle(
      secondVehicle
    );

  return {
    first,
    second,
    winnerSlug:
      determineWinnerSlug(
        first,
        second
      ),
    conclusion:
      buildConclusion(
        first,
        second
      ),
  };
}