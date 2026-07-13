/**
 * Atlas Recommendation Service
 *
 * Generates related vehicle recommendations using class,
 * manufacturer, drivetrain, price, and Atlas Score similarity.
 *
 * Unconfirmed price or score data is excluded from similarity calculations
 * instead of being treated as zero or assumed to match.
 */

import {
  vehicles,
} from "@/app/data";

import type {
  Vehicle,
} from "@/app/types";

import {
  getAtlasVehicleScore,
} from "./atlas-score.service";

import {
  canDisplayVehicleDrivetrain,
  canDisplayVehiclePrice,
} from "./vehicle-data";


export type VehicleRecommendation = {
  vehicle:
    Vehicle;

  score:
    number;

  reasons:
    string[];
};


function getPriceDifferenceScore(
  source:
    Vehicle,
  candidate:
    Vehicle
): number | null {
  if (
    !canDisplayVehiclePrice(
      source
    ) ||
    !canDisplayVehiclePrice(
      candidate
    )
  ) {
    return null;
  }

  const difference =
    Math.abs(
      source.price -
      candidate.price
    );

  return Math.max(
    0,
    30 -
      difference /
        100000
  );
}


function getAtlasScoreDifferenceScore(
  source:
    Vehicle,
  candidate:
    Vehicle
): number | null {
  const sourceScore =
    getAtlasVehicleScore(
      source
    ).overall;

  const candidateScore =
    getAtlasVehicleScore(
      candidate
    ).overall;


  if (
    sourceScore ===
      null ||
    candidateScore ===
      null
  ) {
    return null;
  }


  const difference =
    Math.abs(
      sourceScore -
      candidateScore
    );


  return Math.max(
    0,
    20 -
      difference
  );
}


function getRecommendationScore(
  source:
    Vehicle,
  candidate:
    Vehicle
): {
  score:
    number;

  reasons:
    string[];
} {
  let score =
    0;

  const reasons:
    string[] = [];


  if (
    source.class ===
    candidate.class
  ) {
    score +=
      30;

    reasons.push(
      `Same class: ${candidate.class}`
    );
  }


  if (
    source.manufacturer ===
    candidate.manufacturer
  ) {
    score +=
      20;

    reasons.push(
      `Same manufacturer: ${candidate.manufacturer}`
    );
  }


  if (
    canDisplayVehicleDrivetrain(
      source
    ) &&
    canDisplayVehicleDrivetrain(
      candidate
    ) &&
    source.drivetrain ===
      candidate.drivetrain
  ) {
    score +=
      15;

    reasons.push(
      `Same drivetrain: ${candidate.drivetrain}`
    );
  }


  const priceScore =
    getPriceDifferenceScore(
      source,
      candidate
    );


  if (
    priceScore !==
      null &&
    priceScore >
      0
  ) {
    score +=
      priceScore;

    reasons.push(
      "Similar price range"
    );
  }


  const atlasScoreScore =
    getAtlasScoreDifferenceScore(
      source,
      candidate
    );


  if (
    atlasScoreScore !==
      null &&
    atlasScoreScore >
      0
  ) {
    score +=
      atlasScoreScore;

    reasons.push(
      "Similar Atlas Score"
    );
  }


  return {
    score:
      Math.round(
        score
      ),

    reasons,
  };
}


export function getVehicleRecommendations(
  sourceVehicle:
    Vehicle,
  limit =
    4
): VehicleRecommendation[] {
  return vehicles
    .filter(
      (
        candidate
      ) =>
        candidate.slug !==
        sourceVehicle.slug
    )
    .map(
      (
        candidate
      ) => {
        const result =
          getRecommendationScore(
            sourceVehicle,
            candidate
          );

        return {
          vehicle:
            candidate,

          score:
            result.score,

          reasons:
            result.reasons,
        };
      }
    )
    .filter(
      (
        recommendation
      ) =>
        recommendation.score >
        0
    )
    .sort(
      (
        firstRecommendation,
        secondRecommendation
      ) =>
        secondRecommendation.score -
        firstRecommendation.score
    )
    .slice(
      0,
      limit
    );
}