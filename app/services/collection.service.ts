/**
 * Atlas Collection Service
 *
 * Curated discovery paths powered by Atlas vehicle data,
 * rankings, and Atlas Score.
 */

import type { Vehicle } from "@/app/types";
import {
  getBestBeginnerVehicles,
  getBestOverallVehicles,
  getBestPerformanceVehicles,
  getBestValueVehicles,
  getFastestVehicles,
  getMostExpensiveVehicles,
} from "./ranking.service";

export type AtlasCollection = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  vehicles: Vehicle[];
};

export function getCollections(): AtlasCollection[] {
  return [
    {
      slug: "atlas-picks",
      title: "Atlas Picks",
      emoji: "⭐",
      description: "Top overall recommendations based on Atlas Score.",
      vehicles: getBestOverallVehicles(10),
    },
    {
      slug: "fastest",
      title: "Fastest Vehicles",
      emoji: "🏎",
      description: "The quickest vehicles currently available in Atlas.",
      vehicles: getFastestVehicles(10),
    },
    {
      slug: "best-value",
      title: "Best Value",
      emoji: "💰",
      description: "Vehicles with strong performance relative to price.",
      vehicles: getBestValueVehicles(10),
    },
    {
      slug: "beginner-friendly",
      title: "Beginner Friendly",
      emoji: "🌱",
      description: "Great choices for players starting their garage.",
      vehicles: getBestBeginnerVehicles(10),
    },
    {
      slug: "performance-legends",
      title: "Performance Legends",
      emoji: "🏁",
      description: "Vehicles with elite performance ratings.",
      vehicles: getBestPerformanceVehicles(10),
    },
    {
      slug: "luxury",
      title: "Luxury Collection",
      emoji: "💎",
      description: "Premium vehicles with high price tags and prestige.",
      vehicles: getMostExpensiveVehicles(10),
    },
  ];
}

export function getCollectionBySlug(slug: string) {
  return getCollections().find((collection) => collection.slug === slug);
}