import type {
  GeneratedManufacturerModule,
  GeneratedVehicleRegistry,
  VehicleGeneratorValidation,
} from "./types";

export function buildGeneratorSummary(
  manufacturers: GeneratedManufacturerModule[],
  registry: GeneratedVehicleRegistry,
  validation: VehicleGeneratorValidation
): string {
  const totalVehicles =
    manufacturers.reduce(
      (total, manufacturer) =>
        total +
        manufacturer.vehicleCount,
      0
    );

  const manufacturerLines =
    manufacturers.length > 0
      ? manufacturers
          .map(
            (manufacturer) =>
              `- ${manufacturer.manufacturer}: ${manufacturer.vehicleCount} vehicle${
                manufacturer.vehicleCount === 1
                  ? ""
                  : "s"
              }`
          )
          .join("\n")
      : "- No manufacturer modules generated.";

  const errorLines =
    validation.errors.length > 0
      ? validation.errors
          .map(
            (issue) =>
              `- [${issue.code}] ${issue.message}`
          )
          .join("\n")
      : "- None";

  const warningLines =
    validation.warnings.length > 0
      ? validation.warnings
          .map(
            (issue) =>
              `- [${issue.code}] ${issue.message}`
          )
          .join("\n")
      : "- None";

  return `# Atlas Vehicle Generation Report

## Summary

- Manufacturers: ${manufacturers.length}
- Vehicles: ${totalVehicles}
- Registry entries: ${registry.entries.length}
- Generation valid: ${validation.valid}
- Quality score: ${validation.score}/100

## Manufacturer Modules

${manufacturerLines}

## Errors

${errorLines}

## Warnings

${warningLines}
`;
}