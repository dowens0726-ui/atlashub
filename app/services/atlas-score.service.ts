/**
 * Atlas Score Service
 *
 * Computes explainable vehicle scores for Atlas Intelligence.
 *
 * Unconfirmed or unavailable data is never treated as real performance data.
 */

import type {
  Vehicle,
} from "@/app/types";

import {
  canScoreVehicleBeginner,
  canScoreVehicleCompletely,
  canScoreVehicleDailyDriver,
  canScoreVehiclePerformance,
  canScoreVehicleValue,
} from "@/app/services/vehicle-data";


export type AtlasVehicleScore = {
  performance:
    number | null;

  value:
    number | null;

  dailyDriver:
    number | null;

  beginner:
    number | null;

  overall:
    number | null;

  confidence:
    number;

  complete:
    boolean;
};


function clampScore(
  score:
    number
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        score
      )
    )
  );
}


function averageAvailableScores(
  scores:
    Array<
      number | null
    >
): number | null {
  const availableScores =
    scores.filter(
      (
        score
      ): score is number =>
        score !==
        null
    );

  if (
    availableScores.length ===
    0
  ) {
    return null;
  }

  return clampScore(
    availableScores.reduce(
      (
        total,
        score
      ) =>
        total +
        score,
      0
    ) /
      availableScores.length
  );
}


export function getPerformanceScore(
  vehicle:
    Vehicle
): number | null {
  if (
    !canScoreVehiclePerformance(
      vehicle
    )
  ) {
    return null;
  }

  return clampScore(
    vehicle.topSpeed *
      0.35 +
      vehicle.acceleration *
        0.3 +
      vehicle.handling *
        0.25 +
      vehicle.braking *
        0.1
  );
}


export function getValueScore(
  vehicle:
    Vehicle
): number | null {
  if (
    !canScoreVehicleValue(
      vehicle
    )
  ) {
    return null;
  }

  const performanceScore =
    getPerformanceScore(
      vehicle
    );

  if (
    performanceScore ===
    null
  ) {
    return null;
  }

  const affordabilityScore =
    clampScore(
      100 -
        vehicle.price /
          30000
    );

  return clampScore(
    performanceScore *
      0.65 +
      affordabilityScore *
        0.35
  );
}


export function getDailyDriverScore(
  vehicle:
    Vehicle
): number | null {
  if (
    !canScoreVehicleDailyDriver(
      vehicle
    )
  ) {
    return null;
  }

  const seatScore =
    vehicle.seats >=
    4
      ? 100
      : 75;

  const drivetrainScore =
    vehicle.drivetrain ===
    "AWD"
      ? 100
      : 80;

  return clampScore(
    vehicle.handling *
      0.35 +
      vehicle.braking *
        0.25 +
      seatScore *
        0.2 +
      drivetrainScore *
        0.2
  );
}


export function getBeginnerScore(
  vehicle:
    Vehicle
): number | null {
  if (
    !canScoreVehicleBeginner(
      vehicle
    )
  ) {
    return null;
  }

  const affordabilityScore =
    clampScore(
      100 -
        vehicle.price /
          25000
    );

  const drivetrainScore =
    vehicle.drivetrain ===
    "AWD"
      ? 100
      : 75;

  return clampScore(
    affordabilityScore *
      0.35 +
      vehicle.handling *
        0.3 +
      vehicle.braking *
        0.2 +
      drivetrainScore *
        0.15
  );
}


export function getAtlasVehicleScore(
  vehicle:
    Vehicle
): AtlasVehicleScore {
  const performance =
    getPerformanceScore(
      vehicle
    );

  const value =
    getValueScore(
      vehicle
    );

  const dailyDriver =
    getDailyDriverScore(
      vehicle
    );

  const beginner =
    getBeginnerScore(
      vehicle
    );

  const overall =
    averageAvailableScores([
      performance,
      value,
      dailyDriver,
      beginner,
    ]);

  const availableScoreCount =
    [
      performance,
      value,
      dailyDriver,
      beginner,
    ].filter(
      (
        score
      ) =>
        score !==
        null
    ).length;

  return {
    performance,
    value,
    dailyDriver,
    beginner,
    overall,

    confidence:
      Math.round(
        (
          availableScoreCount /
          4
        ) *
          100
      ),

    complete:
      canScoreVehicleCompletely(
        vehicle
      ),
  };
}