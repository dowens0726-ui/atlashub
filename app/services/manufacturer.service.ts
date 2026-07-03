/**
 * Atlas Manufacturer Service
 *
 * Centralized manufacturer intelligence for Atlas vehicles.
 *
 * Consumers:
 * - Manufacturer Hub
 * - Manufacturer Detail Pages
 * - Atlas Intelligence
 * - Future AI
 */

import { vehicles } from "@/app/data";
import type { Vehicle } from "@/app/types";
import { getAtlasVehicleScore } from "./atlas-score.service";

export type ManufacturerSummary = {
  slug: string;
  name: string;
  vehicles: Vehicle[];
  vehicleCount: number;
  averageAtlasScore: number;
  fastestVehicle: Vehicle | null;
  cheapestVehicle: Vehicle | null;
  mostExpensiveVehicle: Vehicle | null;
  bestOverallVehicle: Vehicle | null;
};

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function average(values: number[]) {
  if (values.length === 0) return 0;

  return Math.round(
    values.reduce((total, value) => total + value, 0) / values.length
  );
}

function sortByDescending(
  manufacturerVehicles: Vehicle[],
  selector: (vehicle: Vehicle) => number
) {
  return [...manufacturerVehicles].sort((a, b) => selector(b) - selector(a));
}

function sortByAscending(
  manufacturerVehicles: Vehicle[],
  selector: (vehicle: Vehicle) => number
) {
  return [...manufacturerVehicles].sort((a, b) => selector(a) - selector(b));
}

export function getManufacturerSlug(name: string) {
  return slugify(name);
}

export function getManufacturers(): ManufacturerSummary[] {
  const manufacturerNames = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.manufacturer))
  ).sort((a, b) => a.localeCompare(b));

  return manufacturerNames.map((name) => {
    const manufacturerVehicles = vehicles.filter(
      (vehicle) => vehicle.manufacturer === name
    );

    const averageAtlasScore = average(
      manufacturerVehicles.map((vehicle) => getAtlasVehicleScore(vehicle).overall)
    );

    return {
      slug: getManufacturerSlug(name),
      name,
      vehicles: manufacturerVehicles,
      vehicleCount: manufacturerVehicles.length,
      averageAtlasScore,
      fastestVehicle:
        sortByDescending(manufacturerVehicles, (vehicle) => vehicle.topSpeed)[0] ??
        null,
      cheapestVehicle:
        sortByAscending(manufacturerVehicles, (vehicle) => vehicle.price)[0] ??
        null,
      mostExpensiveVehicle:
        sortByDescending(manufacturerVehicles, (vehicle) => vehicle.price)[0] ??
        null,
      bestOverallVehicle:
        sortByDescending(
          manufacturerVehicles,
          (vehicle) => getAtlasVehicleScore(vehicle).overall
        )[0] ?? null,
    };
  });
}

export function getManufacturerBySlug(slug: string) {
  return getManufacturers().find((manufacturer) => manufacturer.slug === slug);
}