import type {
  GeneratedVehicleFile,
  VehicleImportRow,
} from "@/app/content-studio/import";

import {
  findIncomingPackageDuplicates,
  findRegistryDuplicates,
  mergeRegistryDuplicates,
} from "./duplicates";

import {
  classifyGeneratedFiles,
} from "./classification";

import type {
  RegistryFileClassification,
  RegistryManifest,
  RegistrySnapshot,
} from "./types";


function countByStatus(
  classifications:
    RegistryFileClassification[],
  status:
    RegistryFileClassification["status"]
): number {
  return classifications.filter(
    (
      classification
    ) =>
      classification.status ===
      status
  ).length;
}


function calculateManifestScore({
  classifications,
  duplicateCount,
  warningCount,
}: {
  classifications:
    RegistryFileClassification[];

  duplicateCount:
    number;

  warningCount:
    number;
}): number {
  const invalidFiles =
    countByStatus(
      classifications,
      "invalid"
    );

  const duplicateFiles =
    countByStatus(
      classifications,
      "duplicate"
    );

  const mergeFiles =
    countByStatus(
      classifications,
      "merge"
    );

  const deductions =
    invalidFiles *
      25 +
    duplicateFiles *
      15 +
    duplicateCount *
      10 +
    mergeFiles *
      2 +
    warningCount *
      1;


  return Math.max(
    0,
    Math.round(
      100 -
      deductions
    )
  );
}


function buildWarnings(
  classifications:
    RegistryFileClassification[],
  duplicates:
    ReturnType<
      typeof mergeRegistryDuplicates
    >
): string[] {
  const warnings:
    string[] = [];


  classifications.forEach(
    (
      classification
    ) => {
      if (
        classification.status ===
        "invalid"
      ) {
        warnings.push(
          `${classification.filename}: ${classification.message}`
        );
      }

      if (
        classification.status ===
        "duplicate"
      ) {
        warnings.push(
          `${classification.filename}: all incoming vehicles already exist.`
        );
      }

      if (
        classification.duplicateVehicleSlugs.length >
        0 &&
        classification.status !==
          "duplicate"
      ) {
        warnings.push(
          `${classification.filename}: duplicate slugs will be excluded or require review: ${classification.duplicateVehicleSlugs.join(
            ", "
          )}.`
        );
      }
    }
  );


  duplicates.forEach(
    (
      duplicate
    ) => {
      warnings.push(
        duplicate.message
      );
    }
  );


  return Array.from(
    new Set(
      warnings
    )
  ).sort(
    (
      firstWarning,
      secondWarning
    ) =>
      firstWarning.localeCompare(
        secondWarning
      )
  );
}


export function buildRegistryManifest(
  snapshot:
    RegistrySnapshot,
  generatedFiles:
    GeneratedVehicleFile[],
  rows:
    VehicleImportRow[]
): RegistryManifest {
  const classifications =
    classifyGeneratedFiles(
      generatedFiles,
      rows,
      snapshot
    );

  const registryDuplicates =
    findRegistryDuplicates(
      snapshot
    );

  const packageDuplicates =
    findIncomingPackageDuplicates(
      generatedFiles
    );

  const duplicates =
    mergeRegistryDuplicates(
      registryDuplicates,
      packageDuplicates
    );

  const warnings =
    buildWarnings(
      classifications,
      duplicates
    );


  return {
    generatedAt:
      new Date().toISOString(),

    registry: {
      manufacturerCount:
        snapshot.manufacturerCount,

      vehicleCount:
        snapshot.vehicleCount,

      files:
        snapshot.files,
    },

    package: {
      manufacturerCount:
        generatedFiles.length,

      vehicleCount:
        generatedFiles.reduce(
          (
            total,
            file
          ) =>
            total +
            file.vehicleCount,
          0
        ),

      newFiles:
        countByStatus(
          classifications,
          "new"
        ),

      mergeFiles:
        countByStatus(
          classifications,
          "merge"
        ),

      duplicateFiles:
        countByStatus(
          classifications,
          "duplicate"
        ),

      invalidFiles:
        countByStatus(
          classifications,
          "invalid"
        ),
    },

    classifications,

    duplicates,

    warnings,

    score:
      calculateManifestScore({
        classifications,

        duplicateCount:
          duplicates.length,

        warningCount:
          warnings.length,
      }),
  };
}