import type {
  AtlasContentRelationship,
} from "@/app/content-studio";

import type {
  GeneratedVehicleFile,
  VehicleImportCandidate,
  VehicleImportRow,
} from "./types";

import {
  slugify,
  toIdentifier,
} from "./helpers";


function formatStringArray(
  values: string[]
): string {
  return JSON.stringify(
    values
  );
}


function relationshipTargets(
  relationships:
    AtlasContentRelationship[],
  type:
    AtlasContentRelationship["type"]
): string[] {
  return relationships
    .filter(
      (relationship) =>
        relationship.type ===
        type
    )
    .map(
      (relationship) =>
        relationship.targetSlug
    );
}


function formatVehicleCode(
  row: VehicleImportRow
): string {
  if (
    !row.vehicle ||
    !row.content
  ) {
    return "";
  }

  const vehicle =
    row.vehicle;

  const document =
    row.content.document;

  const relatedVehicles =
    relationshipTargets(
      document.relationships,
      "related"
    );

  const recommendedMissions =
    relationshipTargets(
      document.relationships,
      "recommended"
    );


  return `  createVehicle({
    slug: ${JSON.stringify(
      document.content.slug
    )},
    name: ${JSON.stringify(
      vehicle.name
    )},
    manufacturer: ${JSON.stringify(
      vehicle.manufacturer
    )},
    class: ${JSON.stringify(
      vehicle.class
    )},
    image: ${JSON.stringify(
      vehicle.image
    )},
    price: ${vehicle.price},
    topSpeed: ${vehicle.topSpeed},
    acceleration: ${vehicle.acceleration},
    handling: ${vehicle.handling},
    braking: ${vehicle.braking},
    drivetrain: ${JSON.stringify(
      vehicle.drivetrain
    )},
    seats: ${vehicle.seats},
    location: ${JSON.stringify(
      vehicle.location
    )},
    description: ${JSON.stringify(
      document.content.description
    )},
    featured: ${vehicle.featured},
    verified: ${document.metadata.verified},
    tags: ${formatStringArray(
      document.content.tags
    )},
    relatedVehicles: ${formatStringArray(
      relatedVehicles
    )},
    recommendedMissions: ${formatStringArray(
      recommendedMissions
    )},
    notes: ${formatStringArray([
      `Content status: ${document.metadata.status}`,
      `Content source: ${document.metadata.source}`,
      `Content confidence: ${document.metadata.confidence}`,
      `SEO title: ${document.seo.title}`,
      `SEO description: ${document.seo.description}`,
      `Canonical path: ${document.seo.canonicalPath}`,
    ])},
  }),`;
}


function buildManufacturerFile(
  manufacturer: string,
  manufacturerRows:
    VehicleImportRow[]
): GeneratedVehicleFile {
  const filename =
    `${slugify(
      manufacturer
    )}.ts`;

  const exportName =
    `${toIdentifier(
      manufacturer
    )}Vehicles`;

  const vehicleCode =
    manufacturerRows
      .map(
        formatVehicleCode
      )
      .filter(Boolean)
      .join(
        "\n\n"
      );

  const code = `import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const ${exportName}: Vehicle[] = [
${vehicleCode}
];
`;


  return {
    filename,

    exportName,

    manufacturer,

    code,

    vehicleCount:
      manufacturerRows.length,
  };
}


export function buildManufacturerFiles(
  rows:
    VehicleImportRow[]
): GeneratedVehicleFile[] {
  const validRows =
    rows.filter(
      (row) =>
        row.errors.length ===
          0 &&
        row.vehicle !==
          null &&
        row.content !==
          null
    );


  const groupedRows =
    new Map<
      string,
      VehicleImportRow[]
    >();


  validRows.forEach(
    (row) => {
      const manufacturer =
        row.vehicle?.manufacturer;

      if (!manufacturer) {
        return;
      }

      const currentGroup =
        groupedRows.get(
          manufacturer
        ) ??
        [];

      groupedRows.set(
        manufacturer,
        [
          ...currentGroup,
          row,
        ]
      );
    }
  );


  return Array.from(
    groupedRows.entries()
  )
    .sort(
      (
        [
          firstManufacturer,
        ],
        [
          secondManufacturer,
        ]
      ) =>
        firstManufacturer.localeCompare(
          secondManufacturer
        )
    )
    .map(
      (
        [
          manufacturer,
          manufacturerRows,
        ]
      ) =>
        buildManufacturerFile(
          manufacturer,
          manufacturerRows
        )
    );
}


export function buildVehicleIndexCode(
  generatedFiles:
    GeneratedVehicleFile[]
): string {
  if (
    generatedFiles.length ===
    0
  ) {
    return "// Import valid vehicles to generate an index suggestion.";
  }


  const imports =
    generatedFiles
      .map(
        (file) =>
          `import { ${file.exportName} } from "./${file.filename.replace(
            /\.ts$/,
            ""
          )}";`
      )
      .join(
        "\n"
      );

  const arrayEntries =
    generatedFiles
      .map(
        (file) =>
          `  ...${file.exportName},`
      )
      .join(
        "\n"
      );


  return `import type { Vehicle } from "@/app/types";

${imports}

export const manufacturerVehicles: Vehicle[] = [
${arrayEntries}
];
`;
}


export function getValidImportedVehicles(
  rows:
    VehicleImportRow[]
): VehicleImportCandidate[] {
  return rows
    .filter(
      (row) =>
        row.errors.length ===
          0 &&
        row.vehicle !==
          null
    )
    .map(
      (row) =>
        row.vehicle as VehicleImportCandidate
    );
}