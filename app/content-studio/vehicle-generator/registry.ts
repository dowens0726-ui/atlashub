import type {
  GeneratedManufacturerModule,
  GeneratedVehicleRegistry,
  VehicleRegistryEntry,
} from "./types";

function buildRegistryEntries(
  manufacturers: GeneratedManufacturerModule[]
): VehicleRegistryEntry[] {
  return manufacturers
    .map((manufacturer) => ({
      manufacturer:
        manufacturer.manufacturer,

      filename:
        manufacturer.filename,

      exportName:
        manufacturer.exportName,
    }))
    .sort(
      (
        firstEntry,
        secondEntry
      ) =>
        firstEntry.manufacturer.localeCompare(
          secondEntry.manufacturer
        )
    );
}

function buildImportCode(
  entries: VehicleRegistryEntry[]
): string {
  return entries
    .map((entry) => {
      const moduleName =
        entry.filename.replace(
          /\.ts$/,
          ""
        );

      return `import { ${entry.exportName} } from "./${moduleName}";`;
    })
    .join("\n");
}

function buildVehicleArrayCode(
  entries: VehicleRegistryEntry[]
): string {
  return entries
    .map(
      (entry) =>
        `  ...${entry.exportName},`
    )
    .join("\n");
}

export function generateVehicleRegistry(
  manufacturers: GeneratedManufacturerModule[]
): GeneratedVehicleRegistry {
  const entries =
    buildRegistryEntries(
      manufacturers
    );

  if (entries.length === 0) {
    return {
      entries: [],
      code: `import type { Vehicle } from "@/app/types";

export const vehicles: Vehicle[] = [];
`,
    };
  }

  const importCode =
    buildImportCode(
      entries
    );

  const vehicleArrayCode =
    buildVehicleArrayCode(
      entries
    );

  return {
    entries,
    code: `import type { Vehicle } from "@/app/types";

${importCode}

export const vehicles: Vehicle[] = [
${vehicleArrayCode}
];
`,
  };
}