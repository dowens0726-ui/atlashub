/**
 * Atlas Rankings Service
 *
 * Centralized ranking logic for Atlas entities.
 *
 * Consumers:
 * - Rankings Page
 * - Atlas Intelligence
 * - Search
 * - Future AI
 */

import { vehicles } from "@/app/data";
import type { Vehicle } from "@/app/types";

function sortDescending(
  selector: (vehicle: Vehicle) => number
): Vehicle[] {
  return [...vehicles].sort(
    (a, b) => selector(b) - selector(a)
  );
}

export function getFastestVehicles(limit = 10): Vehicle[] {
  return sortDescending((vehicle) => vehicle.topSpeed).slice(0, limit);
}

export function getBestAccelerationVehicles(limit = 10): Vehicle[] {
  return sortDescending((vehicle) => vehicle.acceleration).slice(0, limit);
}

export function getBestHandlingVehicles(limit = 10): Vehicle[] {
  return sortDescending((vehicle) => vehicle.handling).slice(0, limit);
}

export function getMostExpensiveVehicles(limit = 10): Vehicle[] {
  return [...vehicles]
    .sort((a, b) => b.price - a.price)
    .slice(0, limit);
}

export function getCheapestVehicles(limit = 10): Vehicle[] {
  return [...vehicles]
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
}