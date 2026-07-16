import type {
  VehicleImportCandidate,
  VehicleImportRow,
} from "@/app/content-studio/import";

import type {
  VehicleGeneratorIssue,
  VehicleGeneratorValidation,
} from "./types";

function createIssue(
  severity: VehicleGeneratorIssue["severity"],
  code: string,
  message: string,
  vehicleSlug?: string
): VehicleGeneratorIssue {
  return {
    severity,
    code,
    message,
    vehicleSlug,
  };
}

function getValidVehicles(
  rows: VehicleImportRow[]
): VehicleImportCandidate[] {
  return rows
    .filter(
      (
        row
      ): row is VehicleImportRow & {
        vehicle: VehicleImportCandidate;
      } =>
        row.errors.length === 0 &&
        row.vehicle !== null
    )
    .map((row) => row.vehicle);
}

function findDuplicateValues(
  values: string[]
): string[] {
  return Array.from(
    new Set(
      values.filter(
        (value, index) =>
          values.indexOf(value) !== index
      )
    )
  );
}

function validateDuplicateSlugs(
  vehicles: VehicleImportCandidate[]
): VehicleGeneratorIssue[] {
  return findDuplicateValues(
    vehicles.map((vehicle) => vehicle.slug)
  ).map((slug) =>
    createIssue(
      "error",
      "duplicate-slug",
      `Duplicate generated vehicle slug: "${slug}".`,
      slug
    )
  );
}

function validateDuplicateNames(
  vehicles: VehicleImportCandidate[]
): VehicleGeneratorIssue[] {
  const normalizedNames =
    vehicles.map((vehicle) =>
      vehicle.name
        .trim()
        .toLowerCase()
    );

  return findDuplicateValues(
    normalizedNames
  ).map((name) => {
    const matchingVehicle =
      vehicles.find(
        (vehicle) =>
          vehicle.name
            .trim()
            .toLowerCase() === name
      );

    return createIssue(
      "warning",
      "duplicate-name",
      `Duplicate generated vehicle name: "${matchingVehicle?.name ?? name}".`,
      matchingVehicle?.slug
    );
  });
}

function validateVehicleMetadata(
  vehicle: VehicleImportCandidate
): VehicleGeneratorIssue[] {
  const issues: VehicleGeneratorIssue[] = [];

  if (!vehicle.sourceGame) {
    issues.push(
      createIssue(
        "error",
        "missing-source-game",
        "Vehicle sourceGame is required.",
        vehicle.slug
      )
    );
  }

  if (!vehicle.verificationStatus) {
    issues.push(
      createIssue(
        "error",
        "missing-verification-status",
        "Vehicle verification status is required.",
        vehicle.slug
      )
    );
  }

  if (!vehicle.dataConfidence) {
    issues.push(
      createIssue(
        "error",
        "missing-data-confidence",
        "Vehicle data confidence is required.",
        vehicle.slug
      )
    );
  }

  if (!vehicle.image) {
    issues.push(
      createIssue(
        "warning",
        "missing-image",
        "Vehicle image path is missing.",
        vehicle.slug
      )
    );
  }

  if (
    vehicle.relatedSlugs.length === 0
  ) {
    issues.push(
      createIssue(
        "warning",
        "missing-related-vehicles",
        "Vehicle has no related vehicle relationships.",
        vehicle.slug
      )
    );
  }

  if (
    vehicle.verificationNotes.length === 0
  ) {
    issues.push(
      createIssue(
        "warning",
        "missing-verification-notes",
        "Vehicle has no verification notes.",
        vehicle.slug
      )
    );
  }

  if (
    vehicle.price <= 0 &&
    vehicle.availability.price
  ) {
    issues.push(
      createIssue(
        "warning",
        "invalid-price-availability",
        "Price availability is true while the price is zero or negative.",
        vehicle.slug
      )
    );
  }

  if (
    vehicle.topSpeed <= 0 &&
    vehicle.availability.topSpeed
  ) {
    issues.push(
      createIssue(
        "warning",
        "invalid-speed-availability",
        "Top-speed availability is true while topSpeed is zero or negative.",
        vehicle.slug
      )
    );
  }

  return issues;
}

function validateRelationships(
  vehicles: VehicleImportCandidate[]
): VehicleGeneratorIssue[] {
  const issues: VehicleGeneratorIssue[] = [];

  const knownSlugs =
    new Set(
      vehicles.map(
        (vehicle) =>
          vehicle.slug
      )
    );

  vehicles.forEach((vehicle) => {
    vehicle.relatedSlugs.forEach(
      (relatedSlug) => {
        if (
          relatedSlug ===
          vehicle.slug
        ) {
          issues.push(
            createIssue(
              "error",
              "self-relationship",
              "Vehicle cannot reference itself as a related vehicle.",
              vehicle.slug
            )
          );

          return;
        }

        if (
          !knownSlugs.has(
            relatedSlug
          )
        ) {
          issues.push(
            createIssue(
              "warning",
              "unresolved-related-vehicle",
              `Related vehicle "${relatedSlug}" is not included in this generation package.`,
              vehicle.slug
            )
          );
        }
      }
    );
  });

  return issues;
}

function calculateScore(
  errors: VehicleGeneratorIssue[],
  warnings: VehicleGeneratorIssue[]
): number {
  const errorPenalty =
    errors.length * 20;

  const warningPenalty =
    warnings.length * 3;

  return Math.max(
    0,
    Math.min(
      100,
      100 -
        errorPenalty -
        warningPenalty
    )
  );
}

export function validateVehicleGeneration(
  rows: VehicleImportRow[]
): VehicleGeneratorValidation {
  const vehicles =
    getValidVehicles(rows);

  const issues = [
    ...validateDuplicateSlugs(
      vehicles
    ),
    ...validateDuplicateNames(
      vehicles
    ),
    ...vehicles.flatMap(
      validateVehicleMetadata
    ),
    ...validateRelationships(
      vehicles
    ),
  ];

  const errors =
    issues.filter(
      (issue) =>
        issue.severity ===
        "error"
    );

  const warnings =
    issues.filter(
      (issue) =>
        issue.severity ===
        "warning"
    );

  return {
    valid:
      errors.length === 0,
    score:
      calculateScore(
        errors,
        warnings
      ),
    errors,
    warnings,
  };
}