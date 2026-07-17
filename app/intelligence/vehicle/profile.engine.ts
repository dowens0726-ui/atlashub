import type {
  Vehicle,
} from "@/app/types";

import {
  scoreVehicle,
} from "./score.engine";

import type {
  VehicleIntelligenceProfile,
  VehicleUseCaseRatings,
} from "./types";

function clampScore(
  value: number
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        value
      )
    )
  );
}

function normalizeClass(
  vehicleClass: string
): string {
  return vehicleClass
    .trim()
    .toLowerCase();
}

function includesAny(
  value: string,
  terms: string[]
): boolean {
  return terms.some(
    (term) =>
      value.includes(
        term
      )
  );
}

function getOffRoadClassBonus(
  vehicleClass: string
): number {
  if (
    includesAny(
      vehicleClass,
      [
        "off-road",
        "suv",
        "motorcycle",
      ]
    )
  ) {
    return 24;
  }

  return 0;
}

function getBusinessClassBonus(
  vehicleClass: string
): number {
  if (
    includesAny(
      vehicleClass,
      [
        "commercial",
        "van",
        "helicopter",
        "aircraft",
        "suv",
      ]
    )
  ) {
    return 18;
  }

  return 4;
}

function getCombatTagBonus(
  vehicle: Vehicle
): number {
  const tags =
    vehicle.tags?.map(
      (tag) =>
        tag.toLowerCase()
    ) ?? [];

  if (
    tags.some(
      (tag) =>
        tag.includes(
          "weaponized"
        )
    )
  ) {
    return 28;
  }

  if (
    tags.some(
      (tag) =>
        tag.includes(
          "armored"
        )
    )
  ) {
    return 18;
  }

  return 0;
}

function buildRatings(
  vehicle: Vehicle
): VehicleUseCaseRatings {
  const breakdown =
    scoreVehicle(
      vehicle
    );

  const vehicleClass =
    normalizeClass(
      vehicle.class
    );

  const offRoadBonus =
    getOffRoadClassBonus(
      vehicleClass
    );

  const businessBonus =
    getBusinessClassBonus(
      vehicleClass
    );

  const combatBonus =
    getCombatTagBonus(
      vehicle
    );

  const drivetrainBonus =
    vehicle.drivetrain ===
      "AWD" ||
    vehicle.drivetrain ===
      "4WD"
      ? 14
      : 4;

  const passengerBonus =
    Math.min(
      vehicle.seats *
        6,
      24
    );

  return {
    getaway:
      clampScore(
        breakdown.score.performance *
          0.5 +
          breakdown.score.versatility *
            0.25 +
          drivetrainBonus +
          combatBonus *
            0.25
      ),

    offRoad:
      clampScore(
        breakdown.score.utility *
          0.35 +
          breakdown.score.versatility *
            0.25 +
          offRoadBonus +
          drivetrainBonus
      ),

    racing:
      clampScore(
        breakdown.score.performance *
          0.7 +
          breakdown.score.versatility *
            0.2 +
          (
            includesAny(
              vehicleClass,
              [
                "sports",
                "super",
                "muscle",
                "motorcycle",
              ]
            )
              ? 10
              : 0
          )
      ),

    business:
      clampScore(
        breakdown.score.utility *
          0.45 +
          breakdown.score.accessibility *
            0.2 +
          businessBonus +
          passengerBonus
      ),

    crew:
      clampScore(
        breakdown.score.utility *
          0.45 +
          breakdown.score.versatility *
            0.25 +
          passengerBonus +
          combatBonus *
            0.2
      ),

    pvp:
      clampScore(
        breakdown.score.performance *
          0.35 +
          breakdown.score.versatility *
            0.2 +
          combatBonus +
          drivetrainBonus
      ),

    pve:
      clampScore(
        breakdown.score.utility *
          0.3 +
          breakdown.score.performance *
            0.25 +
          breakdown.score.versatility *
            0.2 +
          combatBonus *
            0.75 +
          passengerBonus *
            0.5
      ),
  };
}

function buildBestUses(
  ratings: VehicleUseCaseRatings
): string[] {
  const entries:
    Array<
      [
        string,
        number,
      ]
    > = [
      [
        "Getaway Driving",
        ratings.getaway,
      ],
      [
        "Off-Road Exploration",
        ratings.offRoad,
      ],
      [
        "Racing",
        ratings.racing,
      ],
      [
        "Business Operations",
        ratings.business,
      ],
      [
        "Crew Transport",
        ratings.crew,
      ],
      [
        "PvP Combat",
        ratings.pvp,
      ],
      [
        "PvE Missions",
        ratings.pve,
      ],
    ];

  return entries
    .sort(
      (
        first,
        second
      ) =>
        second[1] -
        first[1]
    )
    .slice(
      0,
      3
    )
    .map(
      (
        [
          label,
        ]
      ) =>
        label
    );
}

function buildSummary(
  vehicle: Vehicle,
  ratings: VehicleUseCaseRatings,
  bestUses: string[]
): string {
  const highestRating =
    Math.max(
      ...Object.values(
        ratings
      )
    );

  const primaryUse =
    bestUses[0] ??
    "general use";

  if (
    highestRating >=
    90
  ) {
    return `${vehicle.name} is an elite specialist for ${primaryUse.toLowerCase()} and one of the strongest choices in its role.`;
  }

  if (
    highestRating >=
    80
  ) {
    return `${vehicle.name} is a strong option for ${primaryUse.toLowerCase()} with useful secondary capabilities.`;
  }

  if (
    highestRating >=
    70
  ) {
    return `${vehicle.name} performs reliably in ${primaryUse.toLowerCase()} but is best selected for a specific need.`;
  }

  return `${vehicle.name} is primarily a collection or niche vehicle with limited high-priority use cases.`;
}

export function buildVehicleIntelligenceProfile(
  vehicle: Vehicle
): VehicleIntelligenceProfile {
  const scoreBreakdown =
    scoreVehicle(
      vehicle
    );

  const ratings =
    buildRatings(
      vehicle
    );

  const bestUses =
    buildBestUses(
      ratings
    );

  return {
    vehicle,
    ratings,
    bestUses,
    strengths:
      scoreBreakdown.strengths,
    weaknesses:
      scoreBreakdown.weaknesses,
    summary:
      buildSummary(
        vehicle,
        ratings,
        bestUses
      ),
  };
}
