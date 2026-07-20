import type {
  AtlasSessionPersistenceResult,
  AtlasSessionPersistenceStatus,
  AtlasSnapshotStorageStatus,
} from "./atlas-session-persistence.engine";

import type {
  AtlasMemoryStorageLoadStatus,
  AtlasMemoryStorageSaveStatus,
} from "./atlas-memory-storage.adapter";


export type AtlasIntelligenceHealth =
  | "healthy"
  | "warning"
  | "degraded";


export type AtlasIntelligenceDiagnostics = {
  generatedAt: string;

  health:
    AtlasIntelligenceHealth;

  sessionStatus:
    AtlasSessionPersistenceStatus;

  storage: {
    snapshotLoad:
      AtlasSnapshotStorageStatus;

    snapshotSave:
      AtlasSnapshotStorageStatus;

    ledgerLoad:
      AtlasMemoryStorageLoadStatus;

    ledgerSave:
      AtlasMemoryStorageSaveStatus |
      "not-run";

    degraded:
      boolean;
  };

  eventBus: {
    available:
      boolean;

    totalEvents:
      number;

    critical:
      number;

    high:
      number;

    medium:
      number;

    low:
      number;
  };

  ledger: {
    available:
      boolean;

    totalRecords:
      number;

    sessions:
      number;

    totalEventsObserved:
      number;

    criticalRecords:
      number;

    highPriorityRecords:
      number;
  };

  ingestion: {
    added:
      number;

    updated:
      number;

    ignored:
      number;

    duplicates:
      number;

    pruned:
      number;
  };

  errors:
    string[];
};


type UnknownRecord =
  Record<string, unknown>;


function isRecord(
  value: unknown
): value is UnknownRecord {
  return (
    typeof value ===
      "object" &&
    value !== null &&
    !Array.isArray(
      value
    )
  );
}


function readFiniteNumber(
  record:
    UnknownRecord | null,
  keys:
    string[]
): number {
  if (!record) {
    return 0;
  }

  for (
    const key of keys
  ) {
    const value =
      record[key];

    if (
      typeof value ===
        "number" &&
      Number.isFinite(
        value
      )
    ) {
      return Math.max(
        0,
        value
      );
    }
  }

  return 0;
}


function readArray(
  record:
    UnknownRecord | null,
  keys:
    string[]
): unknown[] {
  if (!record) {
    return [];
  }

  for (
    const key of keys
  ) {
    const value =
      record[key];

    if (
      Array.isArray(
        value
      )
    ) {
      return value;
    }
  }

  return [];
}


function normalizeLabel(
  value: unknown
): string {
  if (
    typeof value !==
      "string"
  ) {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .replaceAll(
      "_",
      "-"
    )
    .replaceAll(
      " ",
      "-"
    );
}


function readItemLabel(
  value: unknown
): string {
  if (
    !isRecord(
      value
    )
  ) {
    return "";
  }

  const possibleValues = [
    value.severity,
    value.priority,
    value.level,
    value.importance,
  ];

  for (
    const possibleValue
    of possibleValues
  ) {
    const normalized =
      normalizeLabel(
        possibleValue
      );

    if (normalized) {
      return normalized;
    }
  }

  return "";
}


function countLabels(
  items:
    unknown[],
  labels:
    string[]
): number {
  const normalizedLabels =
    new Set(
      labels.map(
        normalizeLabel
      )
    );

  return items.reduce<number>(
    (
      total,
      item
    ) => {
      const label =
        readItemLabel(
          item
        );

      return normalizedLabels.has(
        label
      )
        ? total + 1
        : total;
    },
    0
  );
}


function collectErrors(
  result:
    AtlasSessionPersistenceResult
): string[] {
  const errors =
    new Set<string>();

  const possibleErrors = [
    result.error,
    result.snapshotLoad.error,
    result.snapshotSave.error,
    result.ledgerLoad.error,
    result.ledgerSave?.error,
  ];

  for (
    const error
    of possibleErrors
  ) {
    if (
      typeof error ===
        "string" &&
      error.trim()
    ) {
      errors.add(
        error.trim()
      );
    }
  }

  return [
    ...errors,
  ];
}


function isUnavailableStatus(
  status: string
): boolean {
  return (
    status ===
      "unavailable" ||
    status ===
      "storage-unavailable"
  );
}


function isFailureStatus(
  status: string
): boolean {
  return (
    status ===
      "failed" ||
    status ===
      "corrupted" ||
    status ===
      "unsupported-version"
  );
}


function resolveHealth({
  result,
  errors,
  storageDegraded,
}: {
  result:
    AtlasSessionPersistenceResult;

  errors:
    string[];

  storageDegraded:
    boolean;
}): AtlasIntelligenceHealth {
  const statuses = [
    result.status,
    result.snapshotLoad.status,
    result.snapshotSave.status,
    result.ledgerLoad.status,
    result.ledgerSave?.status ??
      "not-run",
  ];

  if (
    result.status ===
      "failed" ||
    statuses.some(
      isFailureStatus
    )
  ) {
    return "degraded";
  }

  if (
    storageDegraded ||
    errors.length > 0 ||
    result.status ===
      "storage-unavailable"
  ) {
    return "warning";
  }

  return "healthy";
}


export function buildAtlasIntelligenceDiagnostics(
  result:
    AtlasSessionPersistenceResult,
  generatedAt: string =
    new Date().toISOString()
): AtlasIntelligenceDiagnostics {
  const eventBusRecord =
    isRecord(
      result.eventBus
    )
      ? result.eventBus
      : null;

  const eventItems =
    readArray(
      eventBusRecord,
      [
        "events",
        "items",
        "entries",
        "messages",
      ]
    );

  const eventCritical =
    countLabels(
      eventItems,
      [
        "critical",
      ]
    );

  const eventHigh =
    countLabels(
      eventItems,
      [
        "high",
        "high-priority",
      ]
    );

  const eventMedium =
    countLabels(
      eventItems,
      [
        "medium",
        "normal",
      ]
    );

  const eventLow =
    countLabels(
      eventItems,
      [
        "low",
        "informational",
        "info",
      ]
    );

  const eventTotalFromRecord =
    readFiniteNumber(
      eventBusRecord,
      [
        "totalEvents",
        "eventCount",
        "total",
        "count",
      ]
    );

  const eventTotal =
    eventItems.length > 0
      ? eventItems.length
      : eventTotalFromRecord;


  const ledgerRecord =
    isRecord(
      result.ledger
    )
      ? result.ledger
      : null;

  const ledgerItems =
    readArray(
      ledgerRecord,
      [
        "records",
        "entries",
        "memories",
        "items",
      ]
    );

  const ledgerCritical =
    countLabels(
      ledgerItems,
      [
        "critical",
      ]
    );

  const ledgerHigh =
    countLabels(
      ledgerItems,
      [
        "high",
        "high-priority",
      ]
    );

  const ledgerTotalFromRecord =
    readFiniteNumber(
      ledgerRecord,
      [
        "totalRecords",
        "recordCount",
        "memoryCount",
        "total",
        "count",
      ]
    );

  const ledgerTotal =
    ledgerItems.length > 0
      ? ledgerItems.length
      : ledgerTotalFromRecord;

  const ledgerSessions =
    readFiniteNumber(
      ledgerRecord,
      [
        "sessions",
        "sessionCount",
        "sessionsObserved",
        "totalSessions",
      ]
    );

  const totalEventsObserved =
    readFiniteNumber(
      ledgerRecord,
      [
        "totalEventsObserved",
        "eventsObserved",
        "eventCount",
        "totalEvents",
      ]
    );


  const ingestionRecord =
    isRecord(
      result.ingestion
    )
      ? result.ingestion
      : null;

  const ingestion = {
    added:
      readFiniteNumber(
        ingestionRecord,
        [
          "added",
          "addedCount",
          "created",
          "createdCount",
          "inserted",
        ]
      ),

    updated:
      readFiniteNumber(
        ingestionRecord,
        [
          "updated",
          "updatedCount",
          "merged",
          "mergedCount",
        ]
      ),

    ignored:
      readFiniteNumber(
        ingestionRecord,
        [
          "ignored",
          "ignoredCount",
          "skipped",
          "skippedCount",
        ]
      ),

    duplicates:
      readFiniteNumber(
        ingestionRecord,
        [
          "duplicates",
          "duplicateCount",
          "deduplicated",
          "deduplicatedCount",
        ]
      ),

    pruned:
      readFiniteNumber(
        ingestionRecord,
        [
          "pruned",
          "prunedCount",
          "removed",
          "removedCount",
        ]
      ),
  };


  const ledgerSaveStatus =
    result.ledgerSave?.status ??
    "not-run";

  const storageStatuses = [
    result.snapshotLoad.status,
    result.snapshotSave.status,
    result.ledgerLoad.status,
    ledgerSaveStatus,
  ];

  const storageDegraded =
    storageStatuses.some(
      (
        status
      ) =>
        isUnavailableStatus(
          status
        ) ||
        isFailureStatus(
          status
        )
    );

  const errors =
    collectErrors(
      result
    );

  const health =
    resolveHealth({
      result,
      errors,
      storageDegraded,
    });


  return {
    generatedAt,

    health,

    sessionStatus:
      result.status,

    storage: {
      snapshotLoad:
        result.snapshotLoad.status,

      snapshotSave:
        result.snapshotSave.status,

      ledgerLoad:
        result.ledgerLoad.status,

      ledgerSave:
        ledgerSaveStatus,

      degraded:
        storageDegraded,
    },

    eventBus: {
      available:
        result.eventBus !==
        null,

      totalEvents:
        eventTotal,

      critical:
        eventCritical,

      high:
        eventHigh,

      medium:
        eventMedium,

      low:
        eventLow,
    },

    ledger: {
      available:
        result.ledger !==
        null,

      totalRecords:
        ledgerTotal,

      sessions:
        ledgerSessions,

      totalEventsObserved,

      criticalRecords:
        ledgerCritical,

      highPriorityRecords:
        ledgerHigh,
    },

    ingestion,

    errors,
  };
}