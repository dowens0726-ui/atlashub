import type { Mission } from "@/app/types";

export const missions: Mission[] = [
  {
    id: "mission:first-contact",
    slug: "first-contact",

    title: "First Contact",

    description:
      "Atlas introductory mission entry designed to establish early progression strategy and prepare players for larger objectives.",

    reward:
      "$500,000",

    difficulty:
      "Easy",

    category:
      "Story",

    estimatedTime:
      "20 minutes",

    recommendedVehicle:
      "armored-vehicle",

    recommendedWeapon:
      "assault-rifle",

    unlocks: [
      "Advanced Missions",
      "Additional Equipment",
    ],

    atlasTips: [
      "Prioritize efficiency over speed during early progression.",
      "Build cash reserves before larger investments.",
    ],

    relatedMissions: [],

    featured: true,

    tags: [
      "story",
      "beginner",
      "progression",
    ],

    verified: false,
  },
];