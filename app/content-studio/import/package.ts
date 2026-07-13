import type {
  ImportPackageReport,
  VehicleImportRow,
  GeneratedVehicleFile,
} from "./types";


function average(
  values: number[]
): number {
  if (
    values.length === 0
  ) {
    return 0;
  }

  return Math.round(
    values.reduce(
      (
        total,
        value
      ) =>
        total +
        value,
      0
    ) /
      values.length
  );
}


export function buildImportPackageReport(
  rows:
    VehicleImportRow[],
  generatedFiles:
    GeneratedVehicleFile[]
): ImportPackageReport {
  const validRows =
    rows.filter(
      (row) =>
        row.errors.length ===
        0
    );

  const invalidRows =
    rows.filter(
      (row) =>
        row.errors.length >
        0
    );

  const warnings =
    rows.flatMap(
      (row) =>
        row.warnings.map(
          (warning) =>
            `Row ${row.rowNumber}: ${warning}`
        )
    );

  const validationScores =
    rows
      .filter(
        (row) =>
          row.content !==
          null
      )
      .map(
        (row) =>
          row.validationScore
      );


  return {
    importedAt:
      new Date().toISOString(),

    totalRows:
      rows.length,

    validRows:
      validRows.length,

    invalidRows:
      invalidRows.length,

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

    averageValidationScore:
      average(
        validationScores
      ),

    warnings:
      Array.from(
        new Set(
          warnings
        )
      ),

    generatedFiles:
      generatedFiles.map(
        (file) =>
          file.filename
      ),
  };
}