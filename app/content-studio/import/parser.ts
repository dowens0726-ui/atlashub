import {
  getValue,
  isRecord,
  normalizeHeader,
  normalizeRecord,
  parseBoolean,
  parseConfidence,
  parseContentSource,
  parseContentStatus,
  parseDrivetrain,
  parseInteger,
  parseNumber,
  parseOptionalString,
  parseString,
  parseStringArray,
  parseTags,
  slugify,
} from "./helpers";

import type {
  ImportFormat,
  ImportRecord,
  ParsedImport,
  VehicleImportCandidate,
  VehicleImportParseOptions,
} from "./types";

import {
  validateVehicleCandidate,
} from "./validator";


export function detectImportFormat(
  value: string
): ImportFormat {
  const trimmedValue =
    value.trim();

  if (!trimmedValue) {
    return "unknown";
  }

  if (
    trimmedValue.startsWith("[") ||
    trimmedValue.startsWith("{")
  ) {
    return "json";
  }

  return "csv";
}


export function parseCsv(
  input: string
): string[][] {
  const rows:
    string[][] = [];

  let currentRow:
    string[] = [];

  let currentField =
    "";

  let insideQuotes =
    false;


  for (
    let index = 0;
    index < input.length;
    index += 1
  ) {
    const character =
      input[index];

    const nextCharacter =
      input[index + 1];


    if (
      character === '"'
    ) {
      if (
        insideQuotes &&
        nextCharacter === '"'
      ) {
        currentField +=
          '"';

        index += 1;
      } else {
        insideQuotes =
          !insideQuotes;
      }

      continue;
    }


    if (
      character === "," &&
      !insideQuotes
    ) {
      currentRow.push(
        currentField.trim()
      );

      currentField =
        "";

      continue;
    }


    if (
      (
        character === "\n" ||
        character === "\r"
      ) &&
      !insideQuotes
    ) {
      if (
        character === "\r" &&
        nextCharacter === "\n"
      ) {
        index += 1;
      }

      currentRow.push(
        currentField.trim()
      );

      if (
        currentRow.some(
          (value) =>
            value.length > 0
        )
      ) {
        rows.push(
          currentRow
        );
      }

      currentRow =
        [];

      currentField =
        "";

      continue;
    }


    currentField +=
      character;
  }


  if (insideQuotes) {
    throw new Error(
      "CSV input contains an unclosed quoted field."
    );
  }


  currentRow.push(
    currentField.trim()
  );

  if (
    currentRow.some(
      (value) =>
        value.length > 0
    )
  ) {
    rows.push(
      currentRow
    );
  }


  return rows;
}


export function csvRowsToRecords(
  input: string
): ImportRecord[] {
  const rows =
    parseCsv(
      input
    );

  if (
    rows.length < 2
  ) {
    throw new Error(
      "CSV input must include a header row and at least one vehicle row."
    );
  }


  const headers =
    rows[0].map(
      normalizeHeader
    );


  if (
    headers.some(
      (header) =>
        !header
    )
  ) {
    throw new Error(
      "CSV input contains an empty column header."
    );
  }


  const duplicateHeaders =
    headers.filter(
      (
        header,
        index
      ) =>
        headers.indexOf(
          header
        ) !== index
    );

  if (
    duplicateHeaders.length >
    0
  ) {
    throw new Error(
      `CSV input contains duplicate headers: ${Array.from(
        new Set(
          duplicateHeaders
        )
      ).join(", ")}.`
    );
  }


  return rows
    .slice(1)
    .map(
      (row) => {
        const record:
          ImportRecord = {};

        headers.forEach(
          (
            header,
            index
          ) => {
            record[header] =
              row[index] ??
              "";
          }
        );

        return record;
      }
    );
}


export function jsonToRecords(
  input: string
): ImportRecord[] {
  const parsedValue:
    unknown =
      JSON.parse(
        input
      );


  if (
    Array.isArray(
      parsedValue
    )
  ) {
    return parsedValue.map(
      (
        value,
        index
      ) => {
        if (
          !isRecord(
            value
          )
        ) {
          throw new Error(
            `JSON item ${index + 1} must be an object.`
          );
        }

        return value;
      }
    );
  }


  if (
    isRecord(
      parsedValue
    )
  ) {
    const nestedVehicles =
      parsedValue.vehicles;

    if (
      Array.isArray(
        nestedVehicles
      )
    ) {
      return nestedVehicles.map(
        (
          value,
          index
        ) => {
          if (
            !isRecord(
              value
            )
          ) {
            throw new Error(
              `Vehicle item ${index + 1} must be an object.`
            );
          }

          return value;
        }
      );
    }

    return [
      parsedValue,
    ];
  }


  throw new Error(
    "JSON input must be a vehicle object, an array of vehicle objects, or an object containing a vehicles array."
  );
}


export function parseImportRecords(
  input: string
): {
  format: ImportFormat;
  records: ImportRecord[];
} {
  const format =
    detectImportFormat(
      input
    );

  if (
    format ===
    "unknown"
  ) {
    return {
      format,
      records: [],
    };
  }

  return {
    format,
    records:
      format ===
      "json"
        ? jsonToRecords(
            input
          )
        : csvRowsToRecords(
            input
          ),
  };
}


export function buildVehicleCandidate(
  sourceRecord:
    ImportRecord
): VehicleImportCandidate {
  const record =
    normalizeRecord(
      sourceRecord
    );

  const name =
    parseString(
      getValue(
        record,
        [
          "name",
          "vehicleName",
          "vehicle",
        ]
      )
    );

  const suppliedSlug =
    parseString(
      getValue(
        record,
        [
          "slug",
        ]
      )
    );

  const slug =
    suppliedSlug ||
    slugify(
      name
    );

  const suppliedImage =
    parseString(
      getValue(
        record,
        [
          "image",
          "imagePath",
        ]
      )
    );


  return {
    slug,

    name,

    manufacturer:
      parseString(
        getValue(
          record,
          [
            "manufacturer",
            "brand",
          ]
        )
      ),

    class:
      parseString(
        getValue(
          record,
          [
            "class",
            "vehicleClass",
            "category",
          ]
        )
      ),

    image:
      suppliedImage ||
      (
        slug
          ? `/vehicles/${slug}.jpg`
          : ""
      ),

    price:
      parseNumber(
        getValue(
          record,
          [
            "price",
            "cost",
          ]
        )
      ),

    topSpeed:
      parseNumber(
        getValue(
          record,
          [
            "topSpeed",
            "speed",
          ]
        )
      ),

    acceleration:
      parseNumber(
        getValue(
          record,
          [
            "acceleration",
          ]
        )
      ),

    handling:
      parseNumber(
        getValue(
          record,
          [
            "handling",
          ]
        )
      ),

    braking:
      parseNumber(
        getValue(
          record,
          [
            "braking",
            "brakes",
          ]
        )
      ),

    drivetrain:
      parseDrivetrain(
        getValue(
          record,
          [
            "drivetrain",
            "drive",
          ]
        )
      ),

    seats:
      parseInteger(
        getValue(
          record,
          [
            "seats",
            "seatCount",
          ]
        )
      ),

    location:
      parseString(
        getValue(
          record,
          [
            "location",
            "dealer",
            "acquisitionSource",
          ]
        )
      ),

    description:
      parseString(
        getValue(
          record,
          [
            "description",
            "summary",
          ]
        )
      ),

    featured:
      parseBoolean(
        getValue(
          record,
          [
            "featured",
          ]
        )
      ),

    tags:
      parseTags(
        getValue(
          record,
          [
            "tags",
          ]
        )
      ),

    source:
      parseContentSource(
        getValue(
          record,
          [
            "source",
            "contentSource",
          ]
        )
      ),

    sourceUrl:
      parseOptionalString(
        getValue(
          record,
          [
            "sourceUrl",
            "sourceLink",
            "url",
          ]
        )
      ),

    status:
      parseContentStatus(
        getValue(
          record,
          [
            "status",
            "contentStatus",
          ]
        )
      ),

    verified:
      parseBoolean(
        getValue(
          record,
          [
            "verified",
          ]
        )
      ),

    confidence:
      parseConfidence(
        getValue(
          record,
          [
            "confidence",
            "confidenceScore",
          ]
        )
      ),

    relatedSlugs:
      parseStringArray(
        getValue(
          record,
          [
            "relatedSlugs",
            "relatedVehicles",
          ]
        )
      ),

    recommendedMissionSlugs:
      parseStringArray(
        getValue(
          record,
          [
            "recommendedMissionSlugs",
            "recommendedMissions",
          ]
        )
      ),
  };
}


export function parseVehicleImport(
  input: string,
  {
    existingSlugs,
  }: VehicleImportParseOptions
): ParsedImport {
  const trimmedInput =
    input.trim();

  if (!trimmedInput) {
    return {
      format:
        "unknown",

      rows:
        [],

      fatalError:
        null,
    };
  }


  const format =
    detectImportFormat(
      trimmedInput
    );


  try {
    const {
      records,
    } =
      parseImportRecords(
        trimmedInput
      );

    const seenSlugs =
      new Set<string>();

    const rows =
      records.map(
        (
          record,
          index
        ) => {
          const vehicle =
            buildVehicleCandidate(
              record
            );

          return validateVehicleCandidate(
            vehicle,
            index + 1,
            seenSlugs,
            existingSlugs
          );
        }
      );


    return {
      format,

      rows,

      fatalError:
        null,
    };
  } catch (
    error
  ) {
    return {
      format,

      rows:
        [],

      fatalError:
        error instanceof Error
          ? error.message
          : "Atlas could not parse the supplied content.",
    };
  }
}