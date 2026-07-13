import type {
  GeneratedVehicleFile,
  VehicleImportRow,
} from "@/app/content-studio/import";

import {
  buildRegistryManifest,
} from "@/app/content-studio/registry";

import type {
  RegistryManifest,
  RegistrySnapshot,
} from "@/app/content-studio/registry";


type BuildPackageRegistryManifestInput = {
  registry:
    RegistrySnapshot;

  generatedFiles:
    GeneratedVehicleFile[];

  rows:
    VehicleImportRow[];
};


export function buildPackageRegistryManifest({
  registry,
  generatedFiles,
  rows,
}: BuildPackageRegistryManifestInput):
  RegistryManifest {
  return buildRegistryManifest(
    registry,
    generatedFiles,
    rows
  );
}