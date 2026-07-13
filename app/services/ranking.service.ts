/**
 * Atlas Rankings Service
 *
 * Centralized ranking logic for Atlas entities.
 *
 * Vehicles are only included in rankings when the required underlying data
 * is available and trusted enough to compare.
 */

import {
  vehicles,
} from "@/app/data";

import type {
  Vehicle,
} from "@/app/types";

import {
  getAtlasVehicleScore,
  getBeginnerScore,
  getDailyDriverScore,
  getPerformanceScore,
  getValueScore,
} from "./atlas-score.service";

import {
  canDisplayVehicleAcceleration,
  canDisplayVehicleHandling,
  canDisplayVehiclePrice,
  canDisplayVehicleTopSpeed,
} from "./vehicle-data";


type VehicleScoreSelector = (
  vehicle: Vehicle
) => number | null;


function sortByAvailableScoreDescending(
  selector:
    VehicleScoreSelector
): Vehicle[] {
  return vehicles
    .map(
      (
        vehicle
      ) => ({
        vehicle,

        score:
          selector(
            vehicle
          ),
      })
    )
    .filter(
      (
        result
      ): result is {
        vehicle:
          Vehicle;

        score:
          number;
      } =>
        result.score !==
        null
    )
    .sort(
      (
        firstResult,
        secondResult
      ) =>
        secondResult.score -
        firstResult.score
    )
    .map(
      (
        result
      ) =>
        result.vehicle
    );
}


export function getFastestVehicles(
  limit = 10
): Vehicle[] {
  return vehicles
    .filter(
      canDisplayVehicleTopSpeed
    )
    .sort(
      (
        firstVehicle,
        secondVehicle
      ) =>
        secondVehicle.topSpeed -
        firstVehicle.topSpeed
    )
    .slice(
      0,
      limit
    );
}


export function getBestAccelerationVehicles(
  limit = 10
): Vehicle[] {
  return vehicles
    .filter(
      canDisplayVehicleAcceleration
    )
    .sort(
      (
        firstVehicle,
        secondVehicle
      ) =>
        secondVehicle.acceleration -
        firstVehicle.acceleration
    )
    .slice(
      0,
      limit
    );
}


export function getBestHandlingVehicles(
  limit = 10
): Vehicle[] {
  return vehicles
    .filter(
      canDisplayVehicleHandling
    )
    .sort(
      (
        firstVehicle,
        secondVehicle
      ) =>
        secondVehicle.handling -
        firstVehicle.handling
    )
    .slice(
      0,
      limit
    );
}


export function getMostExpensiveVehicles(
  limit = 10
): Vehicle[] {
  return vehicles
    .filter(
      canDisplayVehiclePrice
    )
    .sort(
      (
        firstVehicle,
        secondVehicle
      ) =>
        secondVehicle.price -
        firstVehicle.price
    )
    .slice(
      0,
      limit
    );
}


export function getCheapestVehicles(
  limit = 10
): Vehicle[] {
  return vehicles
    .filter(
      canDisplayVehiclePrice
    )
    .sort(
      (
        firstVehicle,
        secondVehicle
      ) =>
        firstVehicle.price -
        secondVehicle.price
    )
    .slice(
      0,
      limit
    );
}


export function getBestOverallVehicles(
  limit = 10
): Vehicle[] {
  return sortByAvailableScoreDescending(
    (
      vehicle
    ) =>
      getAtlasVehicleScore(
        vehicle
      ).overall
  ).slice(
    0,
    limit
  );
}


export function getBestPerformanceVehicles(
  limit = 10
): Vehicle[] {
  return sortByAvailableScoreDescending(
    getPerformanceScore
  ).slice(
    0,
    limit
  );
}


export function getBestValueVehicles(
  limit = 10
): Vehicle[] {
  return sortByAvailableScoreDescending(
    getValueScore
  ).slice(
    0,
    limit
  );
}


export function getBestDailyDriverVehicles(
  limit = 10
): Vehicle[] {
  return sortByAvailableScoreDescending(
    getDailyDriverScore
  ).slice(
    0,
    limit
  );
}


export function getBestBeginnerVehicles(
  limit = 10
): Vehicle[] {
  return sortByAvailableScoreDescending(
    getBeginnerScore
  ).slice(
    0,
    limit
  );
}