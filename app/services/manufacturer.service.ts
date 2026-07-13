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
  canDisplayVehiclePrice,
  canDisplayVehicleTopSpeed,
} from "./vehicle-data";


export type ManufacturerSummary = {
  slug: string;

  name: string;

  vehicles: Vehicle[];

  vehicleCount: number;

  averageAtlasScore:
    number | null;

  fastestVehicle:
    Vehicle | null;

  cheapestVehicle:
    Vehicle | null;

  mostExpensiveVehicle:
    Vehicle | null;

  bestOverallVehicle:
    Vehicle | null;
};


type ScoredVehicle = {
  vehicle:
    Vehicle;

  score:
    number;
};


function slugify(
  text: string
): string {
  return text
    .trim()
    .toLowerCase()
    .normalize(
      "NFD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    );
}


function average(
  values: number[]
): number | null {
  if (
    values.length ===
    0
  ) {
    return null;
  }

  return Math.round(
    values.reduce(
      (
        total,
        value
      ) =>
        total +
        value,
      0
    ) /
      values.length
  );
}


function getAvailableAtlasScores(
  manufacturerVehicles:
    Vehicle[]
): number[] {
  return manufacturerVehicles
    .map(
      (
        vehicle
      ) =>
        getAtlasVehicleScore(
          vehicle
        ).overall
    )
    .filter(
      (
        score
      ): score is number =>
        score !==
        null
    );
}


function getFastestVehicle(
  manufacturerVehicles:
    Vehicle[]
): Vehicle | null {
  return manufacturerVehicles
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
    )[0] ??
    null;
}


function getCheapestVehicle(
  manufacturerVehicles:
    Vehicle[]
): Vehicle | null {
  return manufacturerVehicles
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
    )[0] ??
    null;
}


function getMostExpensiveVehicle(
  manufacturerVehicles:
    Vehicle[]
): Vehicle | null {
  return manufacturerVehicles
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
    )[0] ??
    null;
}


function getBestOverallVehicle(
  manufacturerVehicles:
    Vehicle[]
): Vehicle | null {
  return manufacturerVehicles
    .map(
      (
        vehicle
      ): ScoredVehicle | null => {
        const score =
          getAtlasVehicleScore(
            vehicle
          ).overall;

        if (
          score ===
          null
        ) {
          return null;
        }

        return {
          vehicle,
          score,
        };
      }
    )
    .filter(
      (
        result
      ): result is ScoredVehicle =>
        result !==
        null
    )
    .sort(
      (
        firstResult,
        secondResult
      ) =>
        secondResult.score -
        firstResult.score
    )[0]?.vehicle ??
    null;
}


export function getManufacturerSlug(
  name: string
): string {
  return slugify(
    name
  );
}


export function getManufacturers():
  ManufacturerSummary[] {
  const manufacturerNames =
    Array.from(
      new Set(
        vehicles.map(
          (
            vehicle
          ) =>
            vehicle.manufacturer
        )
      )
    ).sort(
      (
        firstName,
        secondName
      ) =>
        firstName.localeCompare(
          secondName
        )
    );


  return manufacturerNames.map(
    (
      name
    ) => {
      const manufacturerVehicles =
        vehicles.filter(
          (
            vehicle
          ) =>
            vehicle.manufacturer ===
            name
        );

      const averageAtlasScore =
        average(
          getAvailableAtlasScores(
            manufacturerVehicles
          )
        );


      return {
        slug:
          getManufacturerSlug(
            name
          ),

        name,

        vehicles:
          manufacturerVehicles,

        vehicleCount:
          manufacturerVehicles.length,

        averageAtlasScore,

        fastestVehicle:
          getFastestVehicle(
            manufacturerVehicles
          ),

        cheapestVehicle:
          getCheapestVehicle(
            manufacturerVehicles
          ),

        mostExpensiveVehicle:
          getMostExpensiveVehicle(
            manufacturerVehicles
          ),

        bestOverallVehicle:
          getBestOverallVehicle(
            manufacturerVehicles
          ),
      };
    }
  );
}


export function getManufacturerBySlug(
  slug: string
): ManufacturerSummary | undefined {
  return getManufacturers().find(
    (
      manufacturer
    ) =>
      manufacturer.slug ===
      slug
  );
}