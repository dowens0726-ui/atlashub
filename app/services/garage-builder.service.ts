/**
 * Atlas Garage Builder Service
 *
 * Builds suggested vehicle garages based on budget and play style.
 *
 * Vehicles with unconfirmed prices are excluded from budget-based garage
 * recommendations. Vehicles with unavailable score categories are excluded
 * from the corresponding score-based selection.
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
  canDisplayVehiclePrice,
} from "./vehicle-data";


export type GaragePlayStyle =
  | "balanced"
  | "racing"
  | "missions"
  | "beginner";


export type GarageRecommendation = {
  role: string;
  vehicle: Vehicle;
  reason: string;
};


export type GarageBuild = {
  budget: number;
  totalCost: number;
  remainingBudget: number;
  score: number;
  recommendations: GarageRecommendation[];
};


type VehicleScoreSelector = (
  vehicle: Vehicle
) => number | null;


function getAffordableVehicles(
  budget: number
): Vehicle[] {
  return vehicles.filter(
    (
      vehicle
    ) =>
      canDisplayVehiclePrice(
        vehicle
      ) &&
      vehicle.price <=
        budget
  );
}


function pickBestVehicle(
  candidates: Vehicle[],
  selector: VehicleScoreSelector,
  excludedSlugs: string[]
): Vehicle | undefined {
  return candidates
    .filter(
      (
        vehicle
      ) =>
        !excludedSlugs.includes(
          vehicle.slug
        )
    )
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
        vehicle: Vehicle;
        score: number;
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
    )[0]?.vehicle;
}


function getGarageAverageScore(
  recommendations:
    GarageRecommendation[]
): number {
  const availableScores =
    recommendations
      .map(
        (
          recommendation
        ) =>
          getAtlasVehicleScore(
            recommendation.vehicle
          ).overall
      )
      .filter(
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
    return 0;
  }


  const total =
    availableScores.reduce(
      (
        sum,
        score
      ) =>
        sum +
        score,
      0
    );


  return Math.round(
    total /
      availableScores.length
  );
}


export function buildGarage(
  budget: number,
  playStyle:
    GaragePlayStyle =
      "balanced"
): GarageBuild {
  const affordableVehicles =
    getAffordableVehicles(
      budget
    );

  const recommendations:
    GarageRecommendation[] = [];

  const selectedSlugs:
    string[] = [];


  function addRecommendation(
    role: string,
    vehicle:
      Vehicle | undefined,
    reason: string
  ): void {
    if (!vehicle) {
      return;
    }


    recommendations.push({
      role,
      vehicle,
      reason,
    });

    selectedSlugs.push(
      vehicle.slug
    );
  }


  if (
    playStyle ===
    "racing"
  ) {
    addRecommendation(
      "Performance Pick",

      pickBestVehicle(
        affordableVehicles,
        getPerformanceScore,
        selectedSlugs
      ),

      "Chosen for strong speed, acceleration, handling, and braking."
    );


    addRecommendation(
      "Best Value",

      pickBestVehicle(
        affordableVehicles,
        getValueScore,
        selectedSlugs
      ),

      "Chosen for strong performance relative to cost."
    );
  } else if (
    playStyle ===
    "missions"
  ) {
    addRecommendation(
      "Daily Driver",

      pickBestVehicle(
        affordableVehicles,
        getDailyDriverScore,
        selectedSlugs
      ),

      "Chosen for handling, braking, seating, and drivetrain versatility."
    );


    addRecommendation(
      "Performance Backup",

      pickBestVehicle(
        affordableVehicles,
        getPerformanceScore,
        selectedSlugs
      ),

      "Chosen as a faster option for urgent mission travel."
    );
  } else if (
    playStyle ===
    "beginner"
  ) {
    addRecommendation(
      "Beginner Pick",

      pickBestVehicle(
        affordableVehicles,
        getBeginnerScore,
        selectedSlugs
      ),

      "Chosen for affordability, stability, braking, and handling."
    );


    addRecommendation(
      "Budget Upgrade",

      pickBestVehicle(
        affordableVehicles,
        getValueScore,
        selectedSlugs
      ),

      "Chosen as a strong value upgrade as your garage grows."
    );
  } else {
    addRecommendation(
      "Best Overall",

      pickBestVehicle(
        affordableVehicles,

        (
          vehicle
        ) =>
          getAtlasVehicleScore(
            vehicle
          ).overall,

        selectedSlugs
      ),

      "Chosen for the strongest overall Atlas Score within budget."
    );


    addRecommendation(
      "Daily Driver",

      pickBestVehicle(
        affordableVehicles,
        getDailyDriverScore,
        selectedSlugs
      ),

      "Chosen for everyday usability and versatility."
    );


    addRecommendation(
      "Best Value",

      pickBestVehicle(
        affordableVehicles,
        getValueScore,
        selectedSlugs
      ),

      "Chosen for performance relative to cost."
    );
  }


  const totalCost =
    recommendations.reduce(
      (
        sum,
        recommendation
      ) =>
        sum +
        recommendation.vehicle.price,
      0
    );


  return {
    budget,

    totalCost,

    remainingBudget:
      budget -
      totalCost,

    score:
      getGarageAverageScore(
        recommendations
      ),

    recommendations,
  };
}