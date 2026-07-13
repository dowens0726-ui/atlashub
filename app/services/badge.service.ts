/**
 * Atlas Badge Service
 *
 * Generates visual badges from vehicle data and Atlas Intelligence.
 *
 * Performance badges are only awarded when the underlying Atlas score
 * is available and confirmed enough to calculate.
 */

import type {
  Vehicle,
} from "@/app/types";

import {
  getAtlasVehicleScore,
} from "./atlas-score.service";


export type AtlasBadgeVariant =
  | "gold"
  | "emerald"
  | "blue"
  | "purple"
  | "zinc";


export type AtlasBadge = {
  label:
    string;

  emoji:
    string;

  variant:
    AtlasBadgeVariant;
};


export function getVehicleBadges(
  vehicle:
    Vehicle
): AtlasBadge[] {
  const atlasScore =
    getAtlasVehicleScore(
      vehicle
    );

  const badges:
    AtlasBadge[] = [];


  if (
    atlasScore.overall !==
      null &&
    atlasScore.overall >=
      85
  ) {
    badges.push({
      label:
        "Atlas Pick",

      emoji:
        "★",

      variant:
        "purple",
    });
  }


  if (
    vehicle.featured
  ) {
    badges.push({
      label:
        "Featured",

      emoji:
        "◆",

      variant:
        "zinc",
    });
  }


  return badges.slice(
    0,
    4
  );
}