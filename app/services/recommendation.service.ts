/**
 * Atlas Recommendation Service
 *
 * Generates related vehicle recommendations using class,
 * manufacturer, drivetrain, price, and Atlas Score similarity.
 */

import { vehicles } from "@/app/data";
import type { Vehicle } from "@/app/types";
import { getAtlasVehicleScore } from "./atlas-score.service";

export type VehicleRecommendation = {
  vehicle: Vehicle;
  score: number;
  reasons: string[];
};

function getPriceDifferenceScore(source: Vehicle, candidate: Vehicle) {
  const difference = Math.abs(source.price - candidate.price);
  return Math.max(0, 30 - difference / 100000);
}

function getAtlasScoreDifferenceScore(source: Vehicle, candidate: Vehicle) {
  const sourceScore = getAtlasVehicleScore(source).overall;
  const candidateScore = getAtlasVehicleScore(candidate).overall;
  const difference = Math.abs(sourceScore - candidateScore);

  return Math.max(0, 20 - difference);
}

function getRecommendationScore(source: Vehicle, candidate: Vehicle) {
  let score = 0;
  const reasons: string[] = [];

  if (source.class === candidate.class) {
    score += 30;
    reasons.push(`Same class: ${candidate.class}`);
  }

  if (source.manufacturer === candidate.manufacturer) {
    score += 20;
    reasons.push(`Same manufacturer: ${candidate.manufacturer}`);
  }

  if (source.drivetrain === candidate.drivetrain) {
    score += 15;
    reasons.push(`Same drivetrain: ${candidate.drivetrain}`);
  }

  const priceScore = getPriceDifferenceScore(source, candidate);
  if (priceScore > 0) {
    score += priceScore;
    reasons.push("Similar price range");
  }

  const atlasScoreScore = getAtlasScoreDifferenceScore(source, candidate);
  if (atlasScoreScore > 0) {
    score += atlasScoreScore;
    reasons.push("Similar Atlas Score");
  }

  return {
    score: Math.round(score),
    reasons,
  };
}

export function getVehicleRecommendations(
  sourceVehicle: Vehicle,
  limit = 4
): VehicleRecommendation[] {
  return vehicles
    .filter((candidate) => candidate.slug !== sourceVehicle.slug)
    .map((candidate) => {
      const result = getRecommendationScore(sourceVehicle, candidate);

      return {
        vehicle: candidate,
        score: result.score,
        reasons: result.reasons,
      };
    })
    .filter((recommendation) => recommendation.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}