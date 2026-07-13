import {
  vehicles,
} from "@/app/data";

import {
  slugify,
  toIdentifier,
} from "@/app/content-studio/import";

import type {
  RegistryManufacturerRecord,
  RegistrySnapshot,
  RegistryVehicleRecord,
} from "./types";


function buildVehicleRecord(
  vehicle: (typeof vehicles)[number]
): RegistryVehicleRecord {
  const manufacturerSlug =
    slugify(
      vehicle.manufacturer
    );

  return {
    slug:
      vehicle.slug,

    name:
      vehicle.name,

    manufacturer:
      vehicle.manufacturer,

    filename:
      `${manufacturerSlug}.ts`,

    exportName:
      `${toIdentifier(
        vehicle.manufacturer
      )}Vehicles`,
  };
}


function buildManufacturerRecord(
  manufacturer:
    string,
  manufacturerVehicles:
    RegistryVehicleRecord[]
): RegistryManufacturerRecord {
  const slug =
    slugify(
      manufacturer
    );

  return {
    name:
      manufacturer,

    slug,

    filename:
      `${slug}.ts`,

    exportName:
      `${toIdentifier(
        manufacturer
      )}Vehicles`,

    vehicleSlugs:
      manufacturerVehicles
        .map(
          (
            vehicle
          ) =>
            vehicle.slug
        )
        .sort(
          (
            firstSlug,
            secondSlug
          ) =>
            firstSlug.localeCompare(
              secondSlug
            )
        ),

    vehicleCount:
      manufacturerVehicles.length,
  };
}


export function scanVehicleRegistry():
  RegistrySnapshot {
  const registryVehicles =
    vehicles
      .map(
        buildVehicleRecord
      )
      .sort(
        (
          firstVehicle,
          secondVehicle
        ) => {
          const manufacturerDifference =
            firstVehicle.manufacturer.localeCompare(
              secondVehicle.manufacturer
            );

          if (
            manufacturerDifference !==
            0
          ) {
            return manufacturerDifference;
          }

          return firstVehicle.slug.localeCompare(
            secondVehicle.slug
          );
        }
      );


  const groupedVehicles =
    new Map<
      string,
      RegistryVehicleRecord[]
    >();


  registryVehicles.forEach(
    (
      vehicle
    ) => {
      const currentVehicles =
        groupedVehicles.get(
          vehicle.manufacturer
        ) ??
        [];

      groupedVehicles.set(
        vehicle.manufacturer,
        [
          ...currentVehicles,
          vehicle,
        ]
      );
    }
  );


  const manufacturers =
    Array.from(
      groupedVehicles.entries()
    )
      .map(
        (
          [
            manufacturer,
            manufacturerVehicles,
          ]
        ) =>
          buildManufacturerRecord(
            manufacturer,
            manufacturerVehicles
          )
      )
      .sort(
        (
          firstManufacturer,
          secondManufacturer
        ) =>
          firstManufacturer.name.localeCompare(
            secondManufacturer.name
          )
      );


  return {
    generatedAt:
      new Date().toISOString(),

    manufacturers,

    vehicles:
      registryVehicles,

    manufacturerCount:
      manufacturers.length,

    vehicleCount:
      registryVehicles.length,

    files:
      manufacturers.map(
        (
          manufacturer
        ) =>
          manufacturer.filename
      ),
  };
}


export function getRegistryManufacturer(
  manufacturer:
    string,
  snapshot:
    RegistrySnapshot =
      scanVehicleRegistry()
): RegistryManufacturerRecord | undefined {
  const normalizedSlug =
    slugify(
      manufacturer
    );

  return snapshot.manufacturers.find(
    (
      record
    ) =>
      record.slug ===
      normalizedSlug
  );
}


export function getRegistryVehicle(
  slug:
    string,
  snapshot:
    RegistrySnapshot =
      scanVehicleRegistry()
): RegistryVehicleRecord | undefined {
  const normalizedSlug =
    slugify(
      slug
    );

  return snapshot.vehicles.find(
    (
      vehicle
    ) =>
      vehicle.slug ===
      normalizedSlug
  );
}


export function hasRegistryManufacturer(
  manufacturer:
    string,
  snapshot:
    RegistrySnapshot =
      scanVehicleRegistry()
): boolean {
  return Boolean(
    getRegistryManufacturer(
      manufacturer,
      snapshot
    )
  );
}


export function hasRegistryVehicle(
  slug:
    string,
  snapshot:
    RegistrySnapshot =
      scanVehicleRegistry()
): boolean {
  return Boolean(
    getRegistryVehicle(
      slug,
      snapshot
    )
  );
}