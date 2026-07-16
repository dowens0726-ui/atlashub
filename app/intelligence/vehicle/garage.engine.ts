import type {
  Vehicle,
} from "@/app/types";

import {
  scoreVehicle,
} from "./score.engine";

import type {
  GarageGap,
  GarageRecommendation,
} from "./types";

function normalizeClass(
  vehicleClass: string
): string {
  return vehicleClass
    .trim()
    .toLowerCase();
}

function hasClassMatch(
  vehicles: Vehicle[],
  terms: string[]
): boolean {
  return vehicles.some(
    (vehicle) => {
      const vehicleClass =
        normalizeClass(
          vehicle.class
        );

      return terms.some(
        (term) =>
          vehicleClass.includes(
            term
          )
      );
    }
  );
}

function detectGarageGaps(
  ownedVehicles: Vehicle[]
): GarageGap[] {
  const gaps:
    GarageGap[] = [];

  if (
    ownedVehicles.length ===
    0
  ) {
    return [
      "Daily Driver",
      "Utility",
      "Performance",
      "Off-Road",
      "Passenger Capacity",
      "Budget Option",
    ];
  }

  const averagePerformance =
    ownedVehicles.reduce(
      (
        total,
        vehicle
      ) =>
        total +
        scoreVehicle(
          vehicle
        ).score.performance,
      0
    ) /
    ownedVehicles.length;

  const averagePrice =
    ownedVehicles.reduce(
      (
        total,
        vehicle
      ) =>
        total +
        Math.max(
          0,
          vehicle.price
        ),
      0
    ) /
    ownedVehicles.length;

  const maxSeats =
    Math.max(
      ...ownedVehicles.map(
        (vehicle) =>
          vehicle.seats
      )
    );

  const hasUtilityVehicle =
    hasClassMatch(
      ownedVehicles,
      [
        "suv",
        "van",
        "off-road",
        "utility",
      ]
    );

  const hasOffRoadVehicle =
    hasClassMatch(
      ownedVehicles,
      [
        "off-road",
      ]
    );

  const hasDailyDriver =
    hasClassMatch(
      ownedVehicles,
      [
        "sedan",
        "coupe",
        "compact",
        "sports",
      ]
    );

  const hasPremiumVehicle =
    ownedVehicles.some(
      (vehicle) =>
        vehicle.price >=
        1500000
    );

  const hasBudgetVehicle =
    ownedVehicles.some(
      (vehicle) =>
        vehicle.price >
          0 &&
        vehicle.price <=
          500000
    );

  if (
    averagePerformance <
    75
  ) {
    gaps.push(
      "Performance"
    );
  }

  if (
    !hasUtilityVehicle
  ) {
    gaps.push(
      "Utility"
    );
  }

  if (
    !hasOffRoadVehicle
  ) {
    gaps.push(
      "Off-Road"
    );
  }

  if (
    !hasDailyDriver
  ) {
    gaps.push(
      "Daily Driver"
    );
  }

  if (
    maxSeats <
    4
  ) {
    gaps.push(
      "Passenger Capacity"
    );
  }

  if (
    !hasBudgetVehicle &&
    averagePrice >
      750000
  ) {
    gaps.push(
      "Budget Option"
    );
  }

  if (
    !hasPremiumVehicle
  ) {
    gaps.push(
      "Premium Option"
    );
  }

  return gaps;
}

function getGapScore(
  vehicle: Vehicle,
  gaps: GarageGap[]
): number {
  const {
    score,
  } =
    scoreVehicle(
      vehicle
    );

  let total =
    score.overall;

  gaps.forEach(
    (gap) => {
      switch (gap) {
        case "Performance":
          total +=
            score.performance *
            0.45;
          break;

        case "Utility":
          total +=
            score.utility *
            0.5;
          break;

        case "Off-Road":
          total +=
            normalizeClass(
              vehicle.class
            ).includes(
              "off-road"
            )
              ? 40
              : (
                    vehicle.drivetrain ===
                      "AWD" ||
                    vehicle.drivetrain ===
                      "4WD"
                  )
                ? 18
                : 0;
          break;

        case "Daily Driver":
          total +=
            score.accessibility *
            0.4;
          break;

        case "Passenger Capacity":
          total +=
            Math.min(
              vehicle.seats *
                8,
              32
            );
          break;

        case "Budget Option":
          total +=
            score.value *
            0.55;
          break;

        case "Premium Option":
          total +=
            vehicle.price >=
            1500000
              ? 25
              : 0;
          break;
      }
    }
  );

  return total;
}

function buildGarageReason(
  vehicle: Vehicle,
  gaps: GarageGap[]
): string {
  if (
    gaps.length ===
    0
  ) {
    return `${vehicle.name} is the strongest overall addition to an already balanced garage.`;
  }

  const gapText =
    gaps
      .slice(
        0,
        3
      )
      .join(
        ", "
      );

  return `${vehicle.name} is the best next purchase because it helps address these garage gaps: ${gapText}.`;
}

export function getGarageRecommendation(
  ownedVehicles: Vehicle[],
  availableVehicles: Vehicle[]
): GarageRecommendation | null {
  const ownedSlugs =
    new Set(
      ownedVehicles.map(
        (vehicle) =>
          vehicle.slug
      )
    );

  const candidates =
    availableVehicles.filter(
      (vehicle) =>
        !ownedSlugs.has(
          vehicle.slug
        )
    );

  if (
    candidates.length ===
    0
  ) {
    return null;
  }

  const gaps =
    detectGarageGaps(
      ownedVehicles
    );

  const recommendedVehicle =
    [...candidates]
      .sort(
        (
          first,
          second
        ) =>
          getGapScore(
            second,
            gaps
          ) -
          getGapScore(
            first,
            gaps
          )
      )[0];

  if (
    !recommendedVehicle
  ) {
    return null;
  }

  return {
    recommendedVehicle,
    gaps,
    reason:
      buildGarageReason(
        recommendedVehicle,
        gaps
      ),
  };
}