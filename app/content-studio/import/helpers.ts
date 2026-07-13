import type {
  AtlasContentSource,
  AtlasContentStatus,
} from "@/app/content-studio";

import type {
  VehicleDrivetrain,
} from "@/app/types";

import type {
  ImportRecord,
} from "./types";


export const VALID_DRIVETRAINS:
  VehicleDrivetrain[] = [
    "RWD",
    "FWD",
    "AWD",
    "4WD",
  ];


const VALID_CONTENT_SOURCES:
  AtlasContentSource[] = [
    "Rockstar Games",
    "Official Trailer",
    "Official Screenshot",
    "Official Website",
    "Gameplay",
    "Community Research",
    "Legacy GTA Data",
    "Unknown",
  ];


const VALID_CONTENT_STATUSES:
  AtlasContentStatus[] = [
    "draft",
    "review",
    "verified",
    "published",
  ];


export function isRecord(
  value: unknown
): value is ImportRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}


export function slugify(
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


export function toIdentifier(
  value: string
): string {
  const words =
    value
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(
        /[^a-zA-Z0-9]+/g,
        " "
      )
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    words.length ===
    0
  ) {
    return "unknown";
  }

  const [
    firstWord,
    ...remainingWords
  ] = words;

  const identifier =
    firstWord.toLowerCase() +
    remainingWords
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
      )
      .join("");

  return /^\d/.test(
    identifier
  )
    ? `manufacturer${identifier}`
    : identifier;
}


export function normalizeHeader(
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


export function normalizeRecord(
  record: ImportRecord
): ImportRecord {
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


export function getValue(
  record: ImportRecord,
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


export function parseString(
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


export function parseOptionalString(
  value: unknown
): string | undefined {
  const parsedValue =
    parseString(
      value
    );

  return parsedValue ||
    undefined;
}


export function parseNumber(
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


export function parseInteger(
  value: unknown
): number {
  return Math.round(
    parseNumber(
      value
    )
  );
}


export function parseBoolean(
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
    "verified",
    "published",
  ].includes(
    normalizedValue
  );
}


export function parseStringArray(
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
          (item) =>
            String(
              item
            ).trim()
        )
        .filter(Boolean)
    )
  );
}


export function parseTags(
  value: unknown
): string[] {
  return parseStringArray(
    value
  ).map(
    (tag) =>
      tag.toLowerCase()
  );
}


export function parseDrivetrain(
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


export function parseConfidence(
  value: unknown,
  fallback = 50
): number {
  const parsedValue =
    parseNumber(
      value
    );

  const confidence =
    parsedValue === 0 &&
    parseString(
      value
    ) === ""
      ? fallback
      : parsedValue;

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        confidence
      )
    )
  );
}


export function parseContentSource(
  value: unknown
): AtlasContentSource {
  const normalizedValue =
    parseString(
      value
    ).toLowerCase();

  const matchingSource =
    VALID_CONTENT_SOURCES.find(
      (source) =>
        source.toLowerCase() ===
        normalizedValue
    );

  return matchingSource ??
    "Unknown";
}


export function parseContentStatus(
  value: unknown
): AtlasContentStatus {
  const normalizedValue =
    parseString(
      value
    ).toLowerCase();

  const matchingStatus =
    VALID_CONTENT_STATUSES.find(
      (status) =>
        status ===
        normalizedValue
    );

  return matchingStatus ??
    "draft";
}