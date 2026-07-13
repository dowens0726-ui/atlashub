import type {
  GeneratedVehicleFile,
  VehicleImportRow,
} from "@/app/content-studio/import";

import {
  slugify,
} from "@/app/content-studio/import";

import type {
  RegistryFileClassification,
  RegistrySnapshot,
} from "./types";


function getIncomingVehicleSlugs(
  file:
    GeneratedVehicleFile,
  rows:
    VehicleImportRow[]
): string[] {
  return rows
    .filter(
      (row) =>
        row.errors.length ===
          0 &&
        row.vehicle !==
          null &&
        slugify(
          row.vehicle.manufacturer
        ) ===
          slugify(
            file.manufacturer
          )
    )
    .map(
      (row) =>
        row.vehicle?.slug
    )
    .filter(
      (
        slug
      ): slug is string =>
        Boolean(
          slug
        )
    )
    .sort(
      (
        firstSlug,
        secondSlug
      ) =>
        firstSlug.localeCompare(
          secondSlug
        )
    );
}


function classifyFile(
  file:
    GeneratedVehicleFile,
  rows:
    VehicleImportRow[],
  snapshot:
    RegistrySnapshot
): RegistryFileClassification {
  const incomingVehicleSlugs =
    getIncomingVehicleSlugs(
      file,
      rows
    );

  const existingManufacturer =
    snapshot.manufacturers.find(
      (
        manufacturer
      ) =>
        manufacturer.filename ===
          file.filename ||
        manufacturer.exportName ===
          file.exportName ||
        manufacturer.slug ===
          slugify(
            file.manufacturer
          )
    );

  const existingVehicleSlugs =
    existingManufacturer?.vehicleSlugs ??
    [];

  const duplicateVehicleSlugs =
    incomingVehicleSlugs.filter(
      (
        slug
      ) =>
        snapshot.vehicles.some(
          (
            vehicle
          ) =>
            vehicle.slug ===
            slug
        )
    );

  const newVehicleSlugs =
    incomingVehicleSlugs.filter(
      (
        slug
      ) =>
        !duplicateVehicleSlugs.includes(
          slug
        )
    );


  if (
    !file.filename.trim() ||
    !file.exportName.trim() ||
    !file.manufacturer.trim() ||
    incomingVehicleSlugs.length ===
      0
  ) {
    return {
      manufacturer:
        file.manufacturer,

      filename:
        file.filename,

      exportName:
        file.exportName,

      status:
        "invalid",

      existingVehicleCount:
        existingVehicleSlugs.length,

      incomingVehicleCount:
        incomingVehicleSlugs.length,

      duplicateVehicleSlugs,

      newVehicleSlugs,

      message:
        "The generated manufacturer file is missing required data or contains no valid vehicles.",
    };
  }


  if (
    duplicateVehicleSlugs.length ===
      incomingVehicleSlugs.length &&
    incomingVehicleSlugs.length >
      0
  ) {
    return {
      manufacturer:
        file.manufacturer,

      filename:
        file.filename,

      exportName:
        file.exportName,

      status:
        "duplicate",

      existingVehicleCount:
        existingVehicleSlugs.length,

      incomingVehicleCount:
        incomingVehicleSlugs.length,

      duplicateVehicleSlugs,

      newVehicleSlugs,

      message:
        "Every incoming vehicle already exists in the registry.",
    };
  }


  if (
    existingManufacturer
  ) {
    return {
      manufacturer:
        file.manufacturer,

      filename:
        file.filename,

      exportName:
        file.exportName,

      status:
        "merge",

      existingVehicleCount:
        existingVehicleSlugs.length,

      incomingVehicleCount:
        incomingVehicleSlugs.length,

      duplicateVehicleSlugs,

      newVehicleSlugs,

      message:
        newVehicleSlugs.length >
        0
          ? `Merge ${newVehicleSlugs.length} new vehicle${
              newVehicleSlugs.length ===
              1
                ? ""
                : "s"
            } into the existing manufacturer module.`
          : "The manufacturer module already exists and contains no new vehicles.",
    };
  }


  return {
    manufacturer:
      file.manufacturer,

    filename:
      file.filename,

    exportName:
      file.exportName,

    status:
      "new",

    existingVehicleCount:
      0,

    incomingVehicleCount:
      incomingVehicleSlugs.length,

    duplicateVehicleSlugs,

    newVehicleSlugs,

    message:
      `Create a new manufacturer module containing ${incomingVehicleSlugs.length} vehicle${
        incomingVehicleSlugs.length ===
        1
          ? ""
          : "s"
      }.`,
  };
}


export function classifyGeneratedFiles(
  generatedFiles:
    GeneratedVehicleFile[],
  rows:
    VehicleImportRow[],
  snapshot:
    RegistrySnapshot
): RegistryFileClassification[] {
  return generatedFiles
    .map(
      (
        file
      ) =>
        classifyFile(
          file,
          rows,
          snapshot
        )
    )
    .sort(
      (
        firstClassification,
        secondClassification
      ) =>
        firstClassification.manufacturer.localeCompare(
          secondClassification.manufacturer
        )
    );
}