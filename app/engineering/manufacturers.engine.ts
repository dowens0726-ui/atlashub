import {
  vehicles,
} from "@/app/data";

import {
  getAtlasVehicleScore,
} from "@/app/services/atlas-score.service";

import type {
  Vehicle,
} from "@/app/types";

import type {
  ManufacturerStatistic,
} from "./types";


function average(
  values: number[]
): number {
  if (
    values.length ===
    0
  ) {
    return 0;
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


function getAvailableOverallScores(
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


function buildManufacturerStatistic(
  name: string,
  manufacturerVehicles:
    Vehicle[]
): ManufacturerStatistic {
  const availableScores =
    getAvailableOverallScores(
      manufacturerVehicles
    );


  return {
    name,

    vehicleCount:
      manufacturerVehicles.length,

    featuredCount:
      manufacturerVehicles.filter(
        (
          vehicle
        ) =>
          vehicle.featured ===
          true
      ).length,

    verifiedCount:
      manufacturerVehicles.filter(
        (
          vehicle
        ) =>
          vehicle.verified ===
          true
      ).length,

    averageScore:
      average(
        availableScores
      ),
  };
}


export function getManufacturerStatistics():
  ManufacturerStatistic[] {
  const groupedVehicles =
    new Map<
      string,
      Vehicle[]
    >();


  vehicles.forEach(
    (
      vehicle
    ) => {
      const manufacturer =
        vehicle.manufacturer.trim() ||
        "Unknown";

      const currentVehicles =
        groupedVehicles.get(
          manufacturer
        ) ??
        [];

      groupedVehicles.set(
        manufacturer,
        [
          ...currentVehicles,
          vehicle,
        ]
      );
    }
  );


  return Array.from(
    groupedVehicles.entries()
  )
    .map(
      (
        [
          manufacturer,
          manufacturerVehicles,
        ]
      ) =>
        buildManufacturerStatistic(
          manufacturer,
          manufacturerVehicles
        )
    )
    .sort(
      (
        firstManufacturer,
        secondManufacturer
      ) => {
        const vehicleCountDifference =
          secondManufacturer.vehicleCount -
          firstManufacturer.vehicleCount;

        if (
          vehicleCountDifference !==
          0
        ) {
          return vehicleCountDifference;
        }

        return firstManufacturer.name.localeCompare(
          secondManufacturer.name
        );
      }
    );
}


export function getLargestManufacturer(
  statistics:
    ManufacturerStatistic[] =
      getManufacturerStatistics()
): ManufacturerStatistic | undefined {
  return [...statistics].sort(
    (
      firstManufacturer,
      secondManufacturer
    ) => {
      const vehicleCountDifference =
        secondManufacturer.vehicleCount -
        firstManufacturer.vehicleCount;

      if (
        vehicleCountDifference !==
        0
      ) {
        return vehicleCountDifference;
      }

      return firstManufacturer.name.localeCompare(
        secondManufacturer.name
      );
    }
  )[0];
}


export function getSmallestManufacturer(
  statistics:
    ManufacturerStatistic[] =
      getManufacturerStatistics()
): ManufacturerStatistic | undefined {
  return [...statistics].sort(
    (
      firstManufacturer,
      secondManufacturer
    ) => {
      const vehicleCountDifference =
        firstManufacturer.vehicleCount -
        secondManufacturer.vehicleCount;

      if (
        vehicleCountDifference !==
        0
      ) {
        return vehicleCountDifference;
      }

      return firstManufacturer.name.localeCompare(
        secondManufacturer.name
      );
    }
  )[0];
}


export function getAverageVehiclesPerManufacturer(
  statistics:
    ManufacturerStatistic[] =
      getManufacturerStatistics()
): number {
  return average(
    statistics.map(
      (
        manufacturer
      ) =>
        manufacturer.vehicleCount
    )
  );
}


export function getVehiclesMissingManufacturer():
  Vehicle[] {
  return vehicles.filter(
    (
      vehicle
    ) =>
      !vehicle.manufacturer.trim()
  );
}