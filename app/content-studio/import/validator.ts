import {
  buildAtlasContent,
} from "@/app/content-studio";

import type {
  VehicleImportCandidate,
  VehicleImportRow,
} from "./types";


function mergeUniqueMessages(
  messages: string[]
): string[] {
  return Array.from(
    new Set(
      messages
    )
  );
}


export function validateVehicleCandidate(
  vehicle:
    VehicleImportCandidate,
  rowNumber:
    number,
  seenSlugs:
    Set<string>,
  existingSlugs:
    Set<string>
): VehicleImportRow {
  const errors:
    string[] = [];

  const warnings:
    string[] = [];


  if (!vehicle.name) {
    errors.push(
      "Vehicle name is required."
    );
  }

  if (
    !vehicle.manufacturer
  ) {
    errors.push(
      "Manufacturer is required."
    );
  }

  if (!vehicle.class) {
    errors.push(
      "Vehicle class is required."
    );
  }

  if (!vehicle.slug) {
    errors.push(
      "A slug could not be generated."
    );
  }

  if (
    !vehicle.location
  ) {
    errors.push(
      "Location is required."
    );
  }

  if (
    !vehicle.description
  ) {
    errors.push(
      "Description is required."
    );
  }

  if (
    vehicle.price < 0
  ) {
    errors.push(
      "Price cannot be negative."
    );
  }

  if (
    vehicle.topSpeed < 0
  ) {
    errors.push(
      "Top speed cannot be negative."
    );
  }

  if (
    vehicle.acceleration < 0
  ) {
    errors.push(
      "Acceleration cannot be negative."
    );
  }

  if (
    vehicle.handling < 0
  ) {
    errors.push(
      "Handling cannot be negative."
    );
  }

  if (
    vehicle.braking < 0
  ) {
    errors.push(
      "Braking cannot be negative."
    );
  }

  if (
    vehicle.seats < 1
  ) {
    errors.push(
      "Seats must be at least 1."
    );
  }

  if (
    seenSlugs.has(
      vehicle.slug
    )
  ) {
    errors.push(
      `Duplicate slug inside this import: ${vehicle.slug}.`
    );
  } else if (
    vehicle.slug
  ) {
    seenSlugs.add(
      vehicle.slug
    );
  }

  if (
    existingSlugs.has(
      vehicle.slug
    )
  ) {
    warnings.push(
      `Atlas already contains a vehicle with slug "${vehicle.slug}".`
    );
  }

  if (
    vehicle.tags.length ===
    0
  ) {
    warnings.push(
      "No tags were supplied. Atlas generated searchable tags automatically."
    );
  }

  if (
    vehicle.topSpeed ===
    0
  ) {
    warnings.push(
      "Top speed is set to 0."
    );
  }

  if (
    vehicle.acceleration ===
    0
  ) {
    warnings.push(
      "Acceleration is set to 0."
    );
  }

  if (
    vehicle.handling ===
    0
  ) {
    warnings.push(
      "Handling is set to 0."
    );
  }

  if (
    vehicle.braking ===
    0
  ) {
    warnings.push(
      "Braking is set to 0."
    );
  }

  if (
    vehicle.source ===
    "Unknown"
  ) {
    warnings.push(
      "Content source is unknown."
    );
  }

  if (
    vehicle.confidence < 50
  ) {
    warnings.push(
      "Content confidence is below 50."
    );
  }

  if (
    vehicle.verified &&
    vehicle.status !==
      "verified" &&
    vehicle.status !==
      "published"
  ) {
    warnings.push(
      "The vehicle is marked verified but its content status is not verified or published."
    );
  }


  const content =
    buildAtlasContent(
      vehicle,
      {
        contentType:
          "vehicle",

        source:
          vehicle.source,

        sourceUrl:
          vehicle.sourceUrl,

        status:
          vehicle.status,

        verified:
          vehicle.verified,

        confidence:
          vehicle.confidence,

        canonicalBasePath:
          "/vehicles",
      }
    );


  const contentErrors =
    content.validation.errors.map(
      (issue) =>
        issue.message
    );

  const contentWarnings =
    content.validation.warnings.map(
      (issue) =>
        issue.message
    );


  const mergedErrors =
    mergeUniqueMessages([
      ...errors,
      ...contentErrors,
    ]);

  const mergedWarnings =
    mergeUniqueMessages([
      ...warnings,
      ...contentWarnings,
    ]);


  return {
    rowNumber,

    vehicle,

    content,

    errors:
      mergedErrors,

    warnings:
      mergedWarnings,

    validationScore:
      content.validation.score,
  };
}