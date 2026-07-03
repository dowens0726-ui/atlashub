/**
 * Atlas Score Service
 *
 * Computes explainable vehicle scores for Atlas Intelligence.
 *
 * Scores:
 * - Performance Score
 * - Value Score
 * - Daily Driver Score
 * - Beginner Score
 * - Overall Atlas Score
 */

import type { Vehicle } from "@/app/types";

export type AtlasVehicleScore = {
  performance: number;
  value: number;
  dailyDriver: number;
  beginner: number;
  overall: number;
};

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getPerformanceScore(vehicle: Vehicle): number {
  return clampScore(
    vehicle.topSpeed * 0.35 +
      vehicle.acceleration * 0.3 +
      vehicle.handling * 0.25 +
      vehicle.braking * 0.1
  );
}

export function getValueScore(vehicle: Vehicle): number {
  const performanceScore = getPerformanceScore(vehicle);

  if (vehicle.price <= 0) {
    return performanceScore;
  }

  const affordabilityScore = clampScore(100 - vehicle.price / 30000);

  return clampScore(performanceScore * 0.65 + affordabilityScore * 0.35);
}

export function getDailyDriverScore(vehicle: Vehicle): number {
  const seatScore = vehicle.seats >= 4 ? 100 : 75;
  const drivetrainScore = vehicle.drivetrain === "AWD" ? 100 : 80;

  return clampScore(
    vehicle.handling * 0.35 +
      vehicle.braking * 0.25 +
      seatScore * 0.2 +
      drivetrainScore * 0.2
  );
}

export function getBeginnerScore(vehicle: Vehicle): number {
  const affordabilityScore = clampScore(100 - vehicle.price / 25000);
  const handlingScore = vehicle.handling;
  const brakingScore = vehicle.braking;
  const drivetrainScore = vehicle.drivetrain === "AWD" ? 100 : 75;

  return clampScore(
    affordabilityScore * 0.35 +
      handlingScore * 0.3 +
      brakingScore * 0.2 +
      drivetrainScore * 0.15
  );
}

export function getAtlasVehicleScore(vehicle: Vehicle): AtlasVehicleScore {
  const performance = getPerformanceScore(vehicle);
  const value = getValueScore(vehicle);
  const dailyDriver = getDailyDriverScore(vehicle);
  const beginner = getBeginnerScore(vehicle);

  const overall = clampScore(
    performance * 0.35 +
      value * 0.25 +
      dailyDriver * 0.2 +
      beginner * 0.2
  );

  return {
    performance,
    value,
    dailyDriver,
    beginner,
    overall,
  };
}