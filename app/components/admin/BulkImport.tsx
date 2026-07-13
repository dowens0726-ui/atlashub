"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  vehicles,
} from "@/app/data";

import type {
  VehicleDrivetrain,
} from "@/app/types";

import GeneratedCode from "./GeneratedCode";


type ImportFormat =
  | "csv"
  | "json"
  | "unknown";


type VehicleImportCandidate = {
  slug: string;

  name: string;

  manufacturer: string;

  class: string;

  image: string;

  price: number;

  topSpeed: number;

  acceleration: number;

  handling: number;

  braking: number;

  drivetrain: VehicleDrivetrain;

  seats: number;

  location: string;

  description: string;

  featured: boolean;

  tags: string[];
};


type VehicleImportRow = {
  rowNumber: number;

  vehicle:
    VehicleImportCandidate | null;

  errors: string[];

  warnings: string[];
};


type ParsedImport = {
  format: ImportFormat;

  rows: VehicleImportRow[];

  fatalError:
    string | null;
};


const REQUIRED_FIELDS = [
  "name",
  "manufacturer",
  "class",
  "price",
  "topSpeed",
  "acceleration",
  "handling",
  "braking",
  "seats",
  "location",
  "description",
] as const;


const VALID_DRIVETRAINS:
  VehicleDrivetrain[] = [
    "RWD",
    "FWD",
    "AWD",
    "4WD",
  ];


const CSV_TEMPLATE = `name,manufacturer,class,price,topSpeed,acceleration,handling,braking,drivetrain,seats,location,description,featured,tags
Banshee,Bravado,Sports,105000,117,80,75,70,RWD,2,Legendary Motorsport,"An iconic American sports car famous for street racing.",true,"sports,street-racing,iconic"
Buffalo,Bravado,Sports,35000,112,75,72,68,RWD,4,Southern San Andreas Super Autos,"A practical four-door performance sedan.",false,"sports,sedan,bravado"`;


const JSON_TEMPLATE = `[
  {
    "name": "Banshee",
    "manufacturer": "Bravado",
    "class": "Sports",
    "price": 105000,
    "topSpeed": 117,
    "acceleration": 80,
    "handling": 75,
    "braking": 70,
    "drivetrain": "RWD",
    "seats": 2,
    "location": "Legendary Motorsport",
    "description": "An iconic American sports car famous for street racing.",
    "featured": true,
    "tags": ["sports", "street-racing", "iconic"]
  }
]`;


function slugify(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}


function normalizeHeader(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]/g,
      ""
    );
}


function detectFormat(
  value: string
): ImportFormat {
  const trimmedValue =
    value.trim();

  if (!trimmedValue) {
    return "unknown";
  }

  if (
    trimmedValue.startsWith(
      "["
    ) ||
    trimmedValue.startsWith(
      "{"
    )
  ) {
    return "json";
  }

  return "csv";
}


function parseCsv(
  input: string
): string[][] {
  const rows:
    string[][] = [];

  let row:
    string[] = [];

  let field =
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
        field += '"';

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
      row.push(
        field.trim()
      );

      field =
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

      row.push(
        field.trim()
      );

      if (
        row.some(
          (value) =>
            value.length > 0
        )
      ) {
        rows.push(
          row
        );
      }

      row =
        [];

      field =
        "";

      continue;
    }


    field +=
      character;
  }


  row.push(
    field.trim()
  );

  if (
    row.some(
      (value) =>
        value.length > 0
    )
  ) {
    rows.push(
      row
    );
  }


  return rows;
}


function csvRowsToRecords(
  input: string
): Record<string, unknown>[] {
  const rows =
    parseCsv(
      input
    );

  if (
    rows.length < 2
  ) {
    throw new Error(
      "CSV input must contain a header row and at least one vehicle row."
    );
  }


  const headers =
    rows[0].map(
      normalizeHeader
    );


  return rows
    .slice(1)
    .map(
      (row) => {
        const record:
          Record<string, unknown> = {};

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


function jsonToRecords(
  input: string
): Record<string, unknown>[] {
  const parsedValue:
    unknown = JSON.parse(
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
    "JSON input must be an object, an array of objects, or an object containing a vehicles array."
  );
}


function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value ===
      "object" &&
    value !== null &&
    !Array.isArray(
      value
    )
  );
}


function normalizedRecord(
  record: Record<string, unknown>
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(
      record
    ).map(
      (
        [
          key,
          value,
        ]
      ) => [
        normalizeHeader(
          key
        ),
        value,
      ]
    )
  );
}


function getValue(
  record: Record<string, unknown>,
  keys: string[]
): unknown {
  for (
    const key of keys
  ) {
    const value =
      record[
        normalizeHeader(
          key
        )
      ];

    if (
      value !==
      undefined
    ) {
      return value;
    }
  }

  return undefined;
}


function parseString(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(
    value
  ).trim();
}


function parseNumber(
  value: unknown
): number {
  if (
    typeof value ===
      "number"
  ) {
    return Number.isFinite(
      value
    )
      ? value
      : 0;
  }

  const parsedValue =
    Number(
      String(
        value ?? ""
      )
        .replace(
          /\$/g,
          ""
        )
        .replace(
          /,/g,
          ""
        )
        .trim()
    );

  return Number.isFinite(
    parsedValue
  )
    ? parsedValue
    : 0;
}


function parseBoolean(
  value: unknown
): boolean {
  if (
    typeof value ===
      "boolean"
  ) {
    return value;
  }

  const normalizedValue =
    String(
      value ?? ""
    )
      .trim()
      .toLowerCase();

  return [
    "true",
    "yes",
    "1",
    "featured",
  ].includes(
    normalizedValue
  );
}


function parseTags(
  value: unknown
): string[] {
  const values =
    Array.isArray(
      value
    )
      ? value
      : String(
          value ?? ""
        ).split(
          /[,|;]/
        );

  return Array.from(
    new Set(
      values
        .map(
          (tag) =>
            String(
              tag
            )
              .trim()
              .toLowerCase()
        )
        .filter(
          Boolean
        )
    )
  );
}


function parseDrivetrain(
  value: unknown
): VehicleDrivetrain {
  const normalizedValue =
    parseString(
      value
    ).toUpperCase();

  return VALID_DRIVETRAINS.includes(
    normalizedValue as VehicleDrivetrain
  )
    ? (
        normalizedValue as VehicleDrivetrain
      )
    : "RWD";
}


function buildCandidate(
  sourceRecord:
    Record<string, unknown>
): VehicleImportCandidate {
  const record =
    normalizedRecord(
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
      parseNumber(
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
            "source",
            "dealer",
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
  };
}


function validateCandidate(
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


  for (
    const field of
      REQUIRED_FIELDS
  ) {
    const value =
      vehicle[field];

    if (
      typeof value ===
        "string" &&
      !value.trim()
    ) {
      errors.push(
        `Missing required field: ${field}.`
      );
    }

    if (
      typeof value ===
        "number" &&
      !Number.isFinite(
        value
      )
    ) {
      errors.push(
        `Invalid numeric field: ${field}.`
      );
    }
  }


  if (
    !vehicle.slug
  ) {
    errors.push(
      "A slug could not be generated."
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
    vehicle.price < 0
  ) {
    errors.push(
      "Price cannot be negative."
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
  } else {
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
      `A vehicle with slug "${vehicle.slug}" already exists in Atlas.`
    );
  }


  if (
    vehicle.tags.length ===
    0
  ) {
    warnings.push(
      "No tags were provided."
    );
  }


  if (
    vehicle.topSpeed === 0
  ) {
    warnings.push(
      "Top speed is set to 0."
    );
  }


  return {
    rowNumber,

    vehicle,

    errors,

    warnings,
  };
}


function parseImport(
  input: string,
  existingSlugs: Set<string>
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
    detectFormat(
      trimmedInput
    );


  try {
    const records =
      format === "json"
        ? jsonToRecords(
            trimmedInput
          )
        : csvRowsToRecords(
            trimmedInput
          );

    const seenSlugs =
      new Set<string>();

    const rows =
      records.map(
        (
          record,
          index
        ) =>
          validateCandidate(
            buildCandidate(
              record
            ),
            index + 1,
            seenSlugs,
            existingSlugs
          )
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


function formatVehicleCode(
  vehicle:
    VehicleImportCandidate
): string {
  return `  createVehicle({
    slug: ${JSON.stringify(
      vehicle.slug
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
      vehicle.description
    )},
    featured: ${vehicle.featured},
    tags: ${JSON.stringify(
      vehicle.tags
    )},
  }),`;
}


function buildGeneratedCode(
  rows: VehicleImportRow[]
): string {
  const validVehicles =
    rows
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


  if (
    validVehicles.length ===
    0
  ) {
    return "// Add valid CSV or JSON vehicle data to generate Atlas vehicle objects.";
  }


  return `import type { Vehicle } from "@/app/types";
import { createVehicle } from "../factories";

export const importedVehicles: Vehicle[] = [
${validVehicles
  .map(
    formatVehicleCode
  )
  .join(
    "\n\n"
  )}
];
`;
}


export default function BulkImport() {
  const [
    input,
    setInput,
  ] = useState(
    ""
  );


  const existingSlugs =
    useMemo(
      () =>
        new Set(
          vehicles.map(
            (vehicle) =>
              vehicle.slug
          )
        ),
      []
    );


  const parsedImport =
    useMemo(
      () =>
        parseImport(
          input,
          existingSlugs
        ),
      [
        input,
        existingSlugs,
      ]
    );


  const generatedCode =
    useMemo(
      () =>
        buildGeneratedCode(
          parsedImport.rows
        ),
      [
        parsedImport.rows,
      ]
    );


  const validRows =
    parsedImport.rows.filter(
      (row) =>
        row.errors.length ===
        0
    );


  const invalidRows =
    parsedImport.rows.filter(
      (row) =>
        row.errors.length >
        0
    );


  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
              Content Input
            </p>

            <h2 className="mt-3 text-2xl font-black text-white">
              Paste vehicle CSV or JSON
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Atlas automatically detects the format, validates each row, checks
              duplicate slugs, and generates production-ready vehicle objects.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-emerald-400 hover:text-white"
              type="button"
              onClick={() =>
                setInput(
                  CSV_TEMPLATE
                )
              }
            >
              Load CSV Example
            </button>

            <button
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-emerald-400 hover:text-white"
              type="button"
              onClick={() =>
                setInput(
                  JSON_TEMPLATE
                )
              }
            >
              Load JSON Example
            </button>

            <button
              className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-bold text-red-300 transition hover:border-red-400 hover:text-red-200"
              type="button"
              onClick={() =>
                setInput("")
              }
            >
              Clear
            </button>
          </div>
        </div>


        <textarea
          className="mt-6 min-h-[340px] w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400"
          placeholder="Paste CSV or JSON vehicle data here..."
          spellCheck={false}
          value={input}
          onChange={(event) =>
            setInput(
              event.target.value
            )
          }
        />


        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            label="Detected Format"
            value={
              parsedImport.format.toUpperCase()
            }
          />

          <Metric
            label="Total Rows"
            value={
              parsedImport.rows.length.toString()
            }
          />

          <Metric
            label="Valid Rows"
            value={
              validRows.length.toString()
            }
            tone="positive"
          />

          <Metric
            label="Invalid Rows"
            value={
              invalidRows.length.toString()
            }
            tone={
              invalidRows.length > 0
                ? "negative"
                : "default"
            }
          />
        </div>


        {parsedImport.fatalError ? (
          <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
              Import Error
            </p>

            <p className="mt-2 text-sm leading-6 text-red-100">
              {parsedImport.fatalError}
            </p>
          </div>
        ) : null}
      </section>


      {parsedImport.rows.length > 0 ? (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            Validation Results
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            Imported Vehicles
          </h2>

          <div className="mt-6 space-y-4">
            {parsedImport.rows.map(
              (row) => (
                <ImportRowCard
                  key={`${row.rowNumber}-${row.vehicle?.slug ?? "invalid"}`}
                  row={row}
                />
              )
            )}
          </div>
        </section>
      ) : null}


      <GeneratedCode
        code={
          generatedCode
        }
      />
    </div>
  );
}


function ImportRowCard({
  row,
}: {
  row: VehicleImportRow;
}) {
  const isValid =
    row.errors.length ===
    0;

  return (
    <article
      className={`rounded-2xl border p-5 ${
        isValid
          ? "border-emerald-400/20 bg-emerald-400/[0.04]"
          : "border-red-400/20 bg-red-400/[0.04]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Row {row.rowNumber}
          </p>

          <h3 className="mt-2 text-xl font-black text-white">
            {row.vehicle?.name ||
              "Unnamed Vehicle"}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {row.vehicle?.slug ||
              "No slug generated"}
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${
            isValid
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              : "border-red-400/30 bg-red-400/10 text-red-300"
          }`}
        >
          {isValid
            ? "Valid"
            : "Invalid"}
        </span>
      </div>


      {row.vehicle ? (
        <div className="mt-4 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
          <p>
            Manufacturer:{" "}
            <span className="font-bold text-white">
              {row.vehicle.manufacturer ||
                "Missing"}
            </span>
          </p>

          <p>
            Class:{" "}
            <span className="font-bold text-white">
              {row.vehicle.class ||
                "Missing"}
            </span>
          </p>

          <p>
            Price:{" "}
            <span className="font-bold text-white">
              $
              {row.vehicle.price.toLocaleString()}
            </span>
          </p>

          <p>
            Drivetrain:{" "}
            <span className="font-bold text-white">
              {row.vehicle.drivetrain}
            </span>
          </p>
        </div>
      ) : null}


      {row.errors.length > 0 ? (
        <div className="mt-4 space-y-2">
          {row.errors.map(
            (error) => (
              <p
                key={error}
                className="text-sm font-semibold text-red-300"
              >
                ✕ {error}
              </p>
            )
          )}
        </div>
      ) : null}


      {row.warnings.length > 0 ? (
        <div className="mt-4 space-y-2">
          {row.warnings.map(
            (warning) => (
              <p
                key={warning}
                className="text-sm font-semibold text-amber-300"
              >
                ! {warning}
              </p>
            )
          )}
        </div>
      ) : null}
    </article>
  );
}


function Metric({
  label,
  value,
  tone = "default",
}: {
  label: string;

  value: string;

  tone?:
    | "default"
    | "positive"
    | "negative";
}) {
  const valueClassName = {
    default:
      "text-white",

    positive:
      "text-emerald-400",

    negative:
      "text-red-400",
  }[tone];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}