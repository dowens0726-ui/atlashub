import {
  vehicles,
} from "@/app/data";

import {
  parseVehicleImport,
} from "@/app/content-studio/import";

import {
  scanVehicleRegistry,
} from "@/app/content-studio/registry";

import {
  generateVehiclePackage,
} from "@/app/content-studio/vehicle-generator";

import {
  buildPackageReport,
} from "./buildPackageReport";

import {
  buildPackageRegistryManifest,
} from "./buildRegistryManifest";

export function buildImportPackage(
  input: string
) {
  const existingSlugs =
    new Set(
      vehicles.map(
        (vehicle) =>
          vehicle.slug
      )
    );

  const parsedImport =
    parseVehicleImport(
      input,
      {
        existingSlugs,
      }
    );

  const validRows =
    parsedImport.rows.filter(
      (row) =>
        row.errors.length === 0
    );

  const invalidRows =
    parsedImport.rows.filter(
      (row) =>
        row.errors.length > 0
    );

  const generatedPackage =
    generateVehiclePackage(
      parsedImport.rows
    );

  const generatedFiles =
    generatedPackage.manufacturers.map(
      (manufacturer) => ({
        filename:
          manufacturer.filename,

        exportName:
          manufacturer.exportName,

        manufacturer:
          manufacturer.manufacturer,

        code:
          manufacturer.code,

        vehicleCount:
          manufacturer.vehicleCount,
      })
    );

  const registry =
    scanVehicleRegistry();

  const manifest =
    buildPackageRegistryManifest({
      registry,
      generatedFiles,
      rows:
        parsedImport.rows,
    });

  const packageReport =
    buildPackageReport({
      rows:
        parsedImport.rows,

      generatedFiles,

      manifest,
    });

  return {
    parsedImport,
    validRows,
    invalidRows,

    generatedFiles,

    indexCode:
      generatedPackage.registry.code,

    generatorValidation:
      generatedPackage.validation,

    generatorSummary:
      generatedPackage.summary,

    registry,
    manifest,
    packageReport,
  };
}