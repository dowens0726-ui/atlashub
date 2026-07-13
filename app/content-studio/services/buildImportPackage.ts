import {
  vehicles,
} from "@/app/data";

import {
  buildManufacturerFiles,
  buildVehicleIndexCode,
  parseVehicleImport,
} from "@/app/content-studio/import";

import {
  scanVehicleRegistry,
} from "@/app/content-studio/registry";

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
        (
          vehicle
        ) =>
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
      (
        row
      ) =>
        row.errors.length ===
        0
    );

  const invalidRows =
    parsedImport.rows.filter(
      (
        row
      ) =>
        row.errors.length >
        0
    );

  const generatedFiles =
    buildManufacturerFiles(
      parsedImport.rows
    );

  const indexCode =
    buildVehicleIndexCode(
      generatedFiles
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
    indexCode,
    registry,
    manifest,
    packageReport,
  };
}