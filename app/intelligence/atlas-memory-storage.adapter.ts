import {
  ATLAS_MEMORY_LEDGER_VERSION,
  DEFAULT_ATLAS_MEMORY_RETENTION_LIMIT,
} from "./atlas-persistent-memory.engine";

import type {
  AtlasPersistentMemoryLedger,
  AtlasPersistentMemoryRecord,
  AtlasPersistentMemoryStatus,
} from "./atlas-persistent-memory.engine";

import type {
  AtlasBrainChangeCategory,
  AtlasBrainChangeSeverity,
} from "./atlas-brain-change-detection.engine";

import type {
  AtlasReactiveTimelineEventType,
} from "./atlas-reactive-timeline.engine";


export const ATLAS_MEMORY_STORAGE_KEY =
  "atlas:persistent-memory-ledger";


export type AtlasMemoryStorageLoadStatus =
  | "loaded"
  | "empty"
  | "unavailable"
  | "corrupted"
  | "unsupported-version";


export type AtlasMemoryStorageSaveStatus =
  | "saved"
  | "unavailable"
  | "failed";


export type AtlasMemoryStorageClearStatus =
  | "cleared"
  | "unavailable"
  | "failed";


export type AtlasMemoryStorageLoadResult = {
  status:
    AtlasMemoryStorageLoadStatus;

  ledger:
    AtlasPersistentMemoryLedger | null;

  recovered:
    boolean;

  error:
    string | null;
};


export type AtlasMemoryStorageSaveResult = {
  status:
    AtlasMemoryStorageSaveStatus;

  ledger:
    AtlasPersistentMemoryLedger | null;

  error:
    string | null;
};


export type AtlasMemoryStorageClearResult = {
  status:
    AtlasMemoryStorageClearStatus;

  error:
    string | null;
};


type BrowserStorage = Pick<
  Storage,
  | "getItem"
  | "setItem"
  | "removeItem"
>;


const MEMORY_STATUSES:
  AtlasPersistentMemoryStatus[] = [
    "active",
    "acknowledged",
    "resolved",
    "archived",
  ];


const MEMORY_SEVERITIES:
  AtlasBrainChangeSeverity[] = [
    "low",
    "medium",
    "high",
    "critical",
  ];


const MEMORY_EVENT_TYPES:
  AtlasReactiveTimelineEventType[] = [
    "progress",
    "milestone",
    "opportunity",
    "warning",
    "setback",
    "strategy-shift",
  ];


function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}


function isNonEmptyString(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}


function isFiniteNumber(
  value: unknown
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}


function isNonNegativeInteger(
  value: unknown
): value is number {
  return (
    isFiniteNumber(value) &&
    Number.isInteger(value) &&
    value >= 0
  );
}


function isValidTimestamp(
  value: unknown
): value is string {
  if (
    typeof value !== "string"
  ) {
    return false;
  }

  return !Number.isNaN(
    new Date(value).getTime()
  );
}


function isStringArray(
  value: unknown
): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string"
    )
  );
}


function isMemoryStatus(
  value: unknown
): value is AtlasPersistentMemoryStatus {
  return (
    typeof value === "string" &&
    MEMORY_STATUSES.includes(
      value as AtlasPersistentMemoryStatus
    )
  );
}


function isMemorySeverity(
  value: unknown
): value is AtlasBrainChangeSeverity {
  return (
    typeof value === "string" &&
    MEMORY_SEVERITIES.includes(
      value as AtlasBrainChangeSeverity
    )
  );
}


function isMemoryEventType(
  value: unknown
): value is AtlasReactiveTimelineEventType {
  return (
    typeof value === "string" &&
    MEMORY_EVENT_TYPES.includes(
      value as AtlasReactiveTimelineEventType
    )
  );
}


function isMemoryCategory(
  value: unknown
): value is AtlasBrainChangeCategory {
  return isNonEmptyString(
    value
  );
}


function normalizeTimestamp(
  value: string
): string {
  return new Date(
    value
  ).toISOString();
}


function normalizeText(
  value: string
): string {
  return value
    .trim()
    .replace(
      /\s+/g,
      " "
    );
}


function normalizeStringArray(
  values: string[]
): string[] {
  return Array.from(
    new Set(
      values
        .map(
          normalizeText
        )
        .filter(
          Boolean
        )
    )
  );
}


function normalizeConfidence(
  value: number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value)
    )
  );
}


function normalizePriority(
  value: number
): number {
  return Math.max(
    0,
    Math.round(value)
  );
}


function createEmptyLedger(
  timestamp =
    new Date().toISOString()
): AtlasPersistentMemoryLedger {
  const normalizedTimestamp =
    normalizeTimestamp(
      timestamp
    );

  return {
    version:
      ATLAS_MEMORY_LEDGER_VERSION,

    createdAt:
      normalizedTimestamp,

    updatedAt:
      normalizedTimestamp,

    sessionCount: 0,

    totalEventsObserved: 0,

    totalRecords: 0,

    criticalRecordCount: 0,

    highPriorityRecordCount: 0,

    records: [],
  };
}


function isPersistentMemoryRecord(
  value: unknown
): value is AtlasPersistentMemoryRecord {
  if (
    !isRecord(value)
  ) {
    return false;
  }

  return (
    isNonEmptyString(
      value.id
    ) &&
    isNonEmptyString(
      value.fingerprint
    ) &&
    isValidTimestamp(
      value.occurredAt
    ) &&
    isValidTimestamp(
      value.recordedAt
    ) &&
    isValidTimestamp(
      value.lastSeenAt
    ) &&
    isMemoryEventType(
      value.type
    ) &&
    isMemoryCategory(
      value.category
    ) &&
    isMemorySeverity(
      value.severity
    ) &&
    isMemoryStatus(
      value.status
    ) &&
    typeof value.headline ===
      "string" &&
    typeof value.summary ===
      "string" &&
    typeof value.suggestedAction ===
      "string" &&
    isFiniteNumber(
      value.confidence
    ) &&
    isFiniteNumber(
      value.priority
    ) &&
    isStringArray(
      value.affectedSystems
    ) &&
    isNonEmptyString(
      value.sourceEventId
    ) &&
    isStringArray(
      value.sourceChangeIds
    ) &&
    isNonNegativeInteger(
      value.occurrenceCount
    )
  );
}


function isPersistentMemoryLedger(
  value: unknown
): value is AtlasPersistentMemoryLedger {
  if (
    !isRecord(value) ||
    !Array.isArray(
      value.records
    )
  ) {
    return false;
  }

  return (
    isNonNegativeInteger(
      value.version
    ) &&
    isValidTimestamp(
      value.createdAt
    ) &&
    isValidTimestamp(
      value.updatedAt
    ) &&
    isNonNegativeInteger(
      value.sessionCount
    ) &&
    isNonNegativeInteger(
      value.totalEventsObserved
    ) &&
    isNonNegativeInteger(
      value.totalRecords
    ) &&
    isNonNegativeInteger(
      value.criticalRecordCount
    ) &&
    isNonNegativeInteger(
      value.highPriorityRecordCount
    ) &&
    value.records.every(
      isPersistentMemoryRecord
    )
  );
}


function compareMemoryRecords(
  first:
    AtlasPersistentMemoryRecord,
  second:
    AtlasPersistentMemoryRecord
): number {
  if (
    second.priority !==
    first.priority
  ) {
    return (
      second.priority -
      first.priority
    );
  }

  return (
    new Date(
      second.lastSeenAt
    ).getTime() -
    new Date(
      first.lastSeenAt
    ).getTime()
  );
}


function normalizeMemoryRecord(
  record:
    AtlasPersistentMemoryRecord
): AtlasPersistentMemoryRecord {
  return {
    ...record,

    id:
      normalizeText(
        record.id
      ),

    fingerprint:
      normalizeText(
        record.fingerprint
      ),

    occurredAt:
      normalizeTimestamp(
        record.occurredAt
      ),

    recordedAt:
      normalizeTimestamp(
        record.recordedAt
      ),

    lastSeenAt:
      normalizeTimestamp(
        record.lastSeenAt
      ),

    headline:
      normalizeText(
        record.headline
      ),

    summary:
      normalizeText(
        record.summary
      ),

    suggestedAction:
      normalizeText(
        record.suggestedAction
      ),

    confidence:
      normalizeConfidence(
        record.confidence
      ),

    priority:
      normalizePriority(
        record.priority
      ),

    affectedSystems:
      normalizeStringArray(
        record.affectedSystems
      ),

    sourceEventId:
      normalizeText(
        record.sourceEventId
      ),

    sourceChangeIds:
      normalizeStringArray(
        record.sourceChangeIds
      ),

    occurrenceCount:
      Math.max(
        1,
        Math.round(
          record.occurrenceCount
        )
      ),
  };
}


function normalizeLedger(
  ledger:
    AtlasPersistentMemoryLedger
): AtlasPersistentMemoryLedger {
  const records =
    ledger.records
      .map(
        normalizeMemoryRecord
      )
      .sort(
        compareMemoryRecords
      )
      .slice(
        0,
        DEFAULT_ATLAS_MEMORY_RETENTION_LIMIT
      );

  const criticalRecordCount =
    records.filter(
      (record) =>
        record.severity ===
        "critical"
    ).length;

  const highPriorityRecordCount =
    records.filter(
      (record) =>
        record.severity ===
          "critical" ||
        record.severity ===
          "high"
    ).length;

  return {
    version:
      ATLAS_MEMORY_LEDGER_VERSION,

    createdAt:
      normalizeTimestamp(
        ledger.createdAt
      ),

    updatedAt:
      normalizeTimestamp(
        ledger.updatedAt
      ),

    sessionCount:
      Math.max(
        0,
        Math.round(
          ledger.sessionCount
        )
      ),

    totalEventsObserved:
      Math.max(
        0,
        Math.round(
          ledger.totalEventsObserved
        )
      ),

    totalRecords:
      records.length,

    criticalRecordCount,

    highPriorityRecordCount,

    records,
  };
}


function getBrowserStorage():
  BrowserStorage | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  try {
    const storage =
      window.localStorage;

    const testKey =
      `${ATLAS_MEMORY_STORAGE_KEY}:availability-test`;

    storage.setItem(
      testKey,
      "1"
    );

    storage.removeItem(
      testKey
    );

    return storage;
  } catch {
    return null;
  }
}


function getErrorMessage(
  error: unknown
): string {
  if (
    error instanceof Error
  ) {
    return error.message;
  }

  return "An unknown storage error occurred.";
}


function removeInvalidStoredLedger(
  storage: BrowserStorage
): boolean {
  try {
    storage.removeItem(
      ATLAS_MEMORY_STORAGE_KEY
    );

    return true;
  } catch {
    return false;
  }
}


function migrateLedger(
  value: unknown
): AtlasPersistentMemoryLedger | null {
  if (
    !isPersistentMemoryLedger(
      value
    )
  ) {
    return null;
  }

  if (
    value.version ===
    ATLAS_MEMORY_LEDGER_VERSION
  ) {
    return normalizeLedger(
      value
    );
  }

  /*
   * Future ledger migrations belong here.
   *
   * Example:
   *
   * if (value.version === 1) {
   *   return migrateVersionOneToVersionTwo(value);
   * }
   */

  return null;
}


export function isAtlasMemoryLedgerAvailable(): boolean {
  return (
    getBrowserStorage() !==
    null
  );
}


export function createEmptyAtlasMemoryLedger(
  timestamp?: string
): AtlasPersistentMemoryLedger {
  return createEmptyLedger(
    timestamp
  );
}


export function loadAtlasMemoryLedger(): AtlasMemoryStorageLoadResult {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return {
      status:
        "unavailable",

      ledger: null,

      recovered: false,

      error:
        "Browser storage is unavailable.",
    };
  }

  let serializedLedger:
    string | null;

  try {
    serializedLedger =
      storage.getItem(
        ATLAS_MEMORY_STORAGE_KEY
      );
  } catch (error) {
    return {
      status:
        "unavailable",

      ledger: null,

      recovered: false,

      error:
        getErrorMessage(
          error
        ),
    };
  }

  if (!serializedLedger) {
    return {
      status:
        "empty",

      ledger: null,

      recovered: false,

      error: null,
    };
  }

  let parsedLedger:
    unknown;

  try {
    parsedLedger =
      JSON.parse(
        serializedLedger
      );
  } catch (error) {
    const recovered =
      removeInvalidStoredLedger(
        storage
      );

    return {
      status:
        "corrupted",

      ledger: null,

      recovered,

      error:
        getErrorMessage(
          error
        ),
    };
  }

  if (
    isRecord(
      parsedLedger
    ) &&
    isNonNegativeInteger(
      parsedLedger.version
    ) &&
    parsedLedger.version !==
      ATLAS_MEMORY_LEDGER_VERSION
  ) {
    const migratedLedger =
      migrateLedger(
        parsedLedger
      );

    if (migratedLedger) {
      const saveResult =
        saveAtlasMemoryLedger(
          migratedLedger
        );

      return {
        status:
          "loaded",

        ledger:
          migratedLedger,

        recovered:
          saveResult.status ===
          "saved",

        error:
          saveResult.error,
      };
    }

    return {
      status:
        "unsupported-version",

      ledger: null,

      recovered: false,

      error:
        `Stored Atlas memory version ${parsedLedger.version} is not supported.`,
    };
  }

  const ledger =
    migrateLedger(
      parsedLedger
    );

  if (!ledger) {
    const recovered =
      removeInvalidStoredLedger(
        storage
      );

    return {
      status:
        "corrupted",

      ledger: null,

      recovered,

      error:
        "Stored Atlas memory did not match the expected ledger schema.",
    };
  }

  return {
    status:
      "loaded",

    ledger,

    recovered: false,

    error: null,
  };
}


export function saveAtlasMemoryLedger(
  ledger:
    AtlasPersistentMemoryLedger
): AtlasMemoryStorageSaveResult {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return {
      status:
        "unavailable",

      ledger: null,

      error:
        "Browser storage is unavailable.",
    };
  }

  if (
    !isPersistentMemoryLedger(
      ledger
    )
  ) {
    return {
      status:
        "failed",

      ledger: null,

      error:
        "Atlas memory ledger failed schema validation.",
    };
  }

  const normalizedLedger =
    normalizeLedger(
      ledger
    );

  try {
    storage.setItem(
      ATLAS_MEMORY_STORAGE_KEY,
      JSON.stringify(
        normalizedLedger
      )
    );

    return {
      status:
        "saved",

      ledger:
        normalizedLedger,

      error: null,
    };
  } catch (error) {
    return {
      status:
        "failed",

      ledger: null,

      error:
        getErrorMessage(
          error
        ),
    };
  }
}


export function clearAtlasMemoryLedger(): AtlasMemoryStorageClearResult {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return {
      status:
        "unavailable",

      error:
        "Browser storage is unavailable.",
    };
  }

  try {
    storage.removeItem(
      ATLAS_MEMORY_STORAGE_KEY
    );

    return {
      status:
        "cleared",

      error: null,
    };
  } catch (error) {
    return {
      status:
        "failed",

      error:
        getErrorMessage(
          error
        ),
    };
  }
}