/**
 * Atlas Badge Service
 *
 * Generates visual badges from vehicle data and Atlas Intelligence.
 */

import type { Vehicle } from "@/app/types";
import {
  getAtlasVehicleScore,
  getBeginnerScore,
  getPerformanceScore,
  getValueScore,
} from "./atlas-score.service";

export type AtlasBadgeVariant = "gold" | "emerald" | "blue" | "purple" | "zinc";

export type AtlasBadge = {
  label: string;
  emoji: string;
  variant: AtlasBadgeVariant;
};

export function getVehicleBadges(vehicle: Vehicle): AtlasBadge[] {
  const atlasScore = getAtlasVehicleScore(vehicle);
  const badges: AtlasBadge[] = [];

  if (atlasScore.overall >= 85) {
    badges.push({
      label: "Atlas Pick",
      emoji: "⭐",
      variant: "gold",
    });
  }

  if (getValueScore(vehicle) >= 80) {
    badges.push({
      label: "Best Value",
      emoji: "💰",
      variant: "emerald",
    });
  }

  if (getBeginnerScore(vehicle) >= 80) {
    badges.push({
      label: "Beginner Friendly",
      emoji: "🌱",
      variant: "blue",
    });
  }

  if (getPerformanceScore(vehicle) >= 85) {
    badges.push({
      label: "Performance Legend",
      emoji: "🏁",
      variant: "purple",
    });
  }

  if (vehicle.featured) {
    badges.push({
      label: "Featured",
      emoji: "🔥",
      variant: "zinc",
    });
  }

  return badges.slice(0, 4);
}