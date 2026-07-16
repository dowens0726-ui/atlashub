import type {
  VehicleImportRow,
} from "@/app/content-studio/import";

import {
  slugify,
  toIdentifier,
} from "@/app/content-studio/import";

import {
  formatVehicleCandidate,
} from "./formatter";

import {
  generateVehicleRegistry,
} from "./registry";

import {
  buildGeneratorSummary,
} from "./templates";

import type {
  GeneratedManufacturerModule,
  VehicleGeneratorResult,
  VehicleGeneratorVehicle,
} from "./types";

import {
  validateVehicleGeneration,
} from "./validator";

function getValidRows(
  rows: VehicleImportRow[]
): VehicleImportRow[] {
  return rows.filter(
    (row) =>
      row.errors.length === 0 &&
      row.vehicle !== null
  );
}

function groupRowsByManufacturer(
  rows: VehicleImportRow[]
): Map<string, VehicleImportRow[]> {
  const groupedRows =
    new Map<
      string,
      VehicleImportRow[]
    >();

  rows.forEach(
    (row) => {
      const manufacturer =
        row.vehicle?.manufacturer;

      if (!manufacturer) {
        return;
      }

      const manufacturerRows =
        groupedRows.get(
          manufacturer
        ) ?? [];

      manufacturerRows.push(
        row
      );

      groupedRows.set(
        manufacturer,
        manufacturerRows
      );
    }
  );

  return groupedRows;
}

function buildManufacturerCode(
  exportName: string,
  vehicles:
    VehicleGeneratorVehicle[]
): string {
  const vehicleCode =
    vehicles
      .map(
        (vehicle) =>
          vehicle.code
      )
      .join(
        "\n\n"
      );

  return `import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const ${exportName}: Vehicle[] = [
${vehicleCode}
];
`;
}

function buildManufacturerModule(
  manufacturer: string,
  rows: VehicleImportRow[]
): GeneratedManufacturerModule {
  const filename =
    `${slugify(
      manufacturer
    )}.ts`;

  const exportName =
    `${toIdentifier(
      manufacturer
    )}Vehicles`;

  const vehicles =
    rows
      .filter(
        (
          row
        ): row is VehicleImportRow & {
          vehicle:
            NonNullable<
              VehicleImportRow["vehicle"]
            >;
        } =>
          row.vehicle !==
          null
      )
      .map(
        (row) => ({
          vehicle:
            row.vehicle,

          code:
            formatVehicleCandidate(
              row.vehicle
            ),
        })
      );

  return {
    manufacturer,
    filename,
    exportName,
    vehicleCount:
      vehicles.length,
    vehicles,
    code:
      buildManufacturerCode(
        exportName,
        vehicles
      ),
  };
}

export function generateManufacturerModules(
  rows: VehicleImportRow[]
): GeneratedManufacturerModule[] {
  const validRows =
    getValidRows(
      rows
    );

  const groupedRows =
    groupRowsByManufacturer(
      validRows
    );

  return Array.from(
    groupedRows.entries()
  )
    .sort(
      (
        [
          firstManufacturer,
        ],
        [
          secondManufacturer,
        ]
      ) =>
        firstManufacturer.localeCompare(
          secondManufacturer
        )
    )
    .map(
      (
        [
          manufacturer,
          manufacturerRows,
        ]
      ) =>
        buildManufacturerModule(
          manufacturer,
          manufacturerRows
        )
    );
}

export function generateVehiclePackage(
  rows: VehicleImportRow[]
): VehicleGeneratorResult {
  const validation =
    validateVehicleGeneration(
      rows
    );

  const manufacturers =
    generateManufacturerModules(
      rows
    );

  const registry =
    generateVehicleRegistry(
      manufacturers
    );

  const totalVehicles =
    manufacturers.reduce(
      (
        total,
        manufacturer
      ) =>
        total +
        manufacturer.vehicleCount,
      0
    );

  const summary =
    buildGeneratorSummary(
      manufacturers,
      registry,
      validation
    );

  return {
    manufacturers,
    registry,
    validation,
    totalVehicles,
    summary,
  };
}