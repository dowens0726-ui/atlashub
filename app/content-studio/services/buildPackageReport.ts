import {
  buildImportPackageReport,
} from "@/app/content-studio/import";

import type {
  GeneratedVehicleFile,
  ImportPackageReport,
  VehicleImportRow,
} from "@/app/content-studio/import";

import type {
  RegistryManifest,
} from "@/app/content-studio/registry";


export type ProductionPackageReport =
  ImportPackageReport & {
    registryScore: number;

    registryWarnings:
      string[];

    newFiles: number;

    mergeFiles: number;

    duplicateFiles: number;

    invalidFiles: number;
  };


type BuildPackageReportInput = {
  rows:
    VehicleImportRow[];

  generatedFiles:
    GeneratedVehicleFile[];

  manifest:
    RegistryManifest;
};


export function buildPackageReport({
  rows,
  generatedFiles,
  manifest,
}: BuildPackageReportInput):
  ProductionPackageReport {
  const baseReport =
    buildImportPackageReport(
      rows,
      generatedFiles
    );

  return {
    ...baseReport,

    warnings:
      Array.from(
        new Set([
          ...baseReport.warnings,
          ...manifest.warnings,
        ])
      ),

    registryScore:
      manifest.score,

    registryWarnings:
      manifest.warnings,

    newFiles:
      manifest.package.newFiles,

    mergeFiles:
      manifest.package.mergeFiles,

    duplicateFiles:
      manifest.package.duplicateFiles,

    invalidFiles:
      manifest.package.invalidFiles,
  };
}