import type {
  AtlasEvent,
  AtlasEventBus,
} from "./atlas-event-bus.engine";

import type {
  AtlasBrainChangeCategory,
  AtlasBrainChangeSeverity,
} from "./atlas-brain-change-detection.engine";

import type {
  AtlasReactiveTimelineEventType,
} from "./atlas-reactive-timeline.engine";


export const ATLAS_MEMORY_LEDGER_VERSION = 1;

export const DEFAULT_ATLAS_MEMORY_RETENTION_LIMIT = 250;


export type AtlasPersistentMemoryStatus =
  | "active"
  | "acknowledged"
  | "resolved"
  | "archived";


export type AtlasPersistentMemoryRecord = {
  id: string;

  fingerprint: string;

  occurredAt: string;

  recordedAt: string;

  lastSeenAt: string;

  type:
    AtlasReactiveTimelineEventType;

  category:
    AtlasBrainChangeCategory;

  severity:
    AtlasBrainChangeSeverity;

  status:
    AtlasPersistentMemoryStatus;

  headline: string;

  summary: string;

  suggestedAction: string;

  confidence: number;

  priority: number;

  affectedSystems: string[];

  sourceEventId: string;

  sourceChangeIds: string[];

  occurrenceCount: number;
};


export type AtlasPersistentMemoryLedger = {
  version: number;

  createdAt: string;

  updatedAt: string;

  sessionCount: number;

  totalEventsObserved: number;

  totalRecords: number;

  criticalRecordCount: number;

  highPriorityRecordCount: number;

  records:
    AtlasPersistentMemoryRecord[];
};


export type BuildAtlasPersistentMemoryLedgerInput = {
  existingLedger?:
    AtlasPersistentMemoryLedger | null;

  eventBus:
    AtlasEventBus;

  recordedAt?: string;

  retentionLimit?: number;
};


export type AtlasPersistentMemoryIngestionResult = {
  ledger:
    AtlasPersistentMemoryLedger;

  addedRecords:
    AtlasPersistentMemoryRecord[];

  updatedRecords:
    AtlasPersistentMemoryRecord[];

  ignoredEventCount: number;

  duplicateEventCount: number;

  prunedRecordCount: number;
};


function resolveTimestamp(
  value?: string
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed =
    new Date(value);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}


function normalizeConfidence(
  value: number
): number {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

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
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.round(value)
  );
}


function normalizeRetentionLimit(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return DEFAULT_ATLAS_MEMORY_RETENTION_LIMIT;
  }

  return Math.min(
    1_000,
    Math.max(
      25,
      Math.round(value)
    )
  );
}


function normalizeString(
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
          normalizeString
        )
        .filter(
          Boolean
        )
    )
  );
}


function createFingerprint(
  event: AtlasEvent
): string {
  return [
    event.type,
    event.category,
    normalizeString(
      event.headline
    ).toLowerCase(),
    normalizeString(
      event.summary
    ).toLowerCase(),
  ].join(
    "::"
  );
}


function createMemoryRecord(
  event: AtlasEvent,
  recordedAt: string
): AtlasPersistentMemoryRecord {
  return {
    id:
      `atlas-memory-${event.id}`,

    fingerprint:
      createFingerprint(
        event
      ),

    occurredAt:
      resolveTimestamp(
        event.occurredAt
      ),

    recordedAt,

    lastSeenAt:
      recordedAt,

    type:
      event.type,

    category:
      event.category,

    severity:
      event.severity,

    status:
      event.status ===
        "resolved"
        ? "resolved"
        : event.status ===
            "acknowledged"
          ? "acknowledged"
          : "active",

    headline:
      normalizeString(
        event.headline
      ),

    summary:
      normalizeString(
        event.summary
      ),

    suggestedAction:
      normalizeString(
        event.suggestedAction
      ),

    confidence:
      normalizeConfidence(
        event.confidence
      ),

    priority:
      normalizePriority(
        event.priority
      ),

    affectedSystems:
      normalizeStringArray(
        event.affectedSystems
      ),

    sourceEventId:
      event.id,

    sourceChangeIds:
      normalizeStringArray(
        event.sourceChangeIds
      ),

    occurrenceCount: 1,
  };
}


function isMeaningfulMemoryEvent(
  event: AtlasEvent
): boolean {
  if (
    !event.audiences.includes(
      "memory"
    )
  ) {
    return false;
  }

  if (
    event.severity ===
      "critical" ||
    event.severity ===
      "high"
  ) {
    return true;
  }

  if (
    event.type ===
      "milestone" ||
    event.type ===
      "warning" ||
    event.type ===
      "setback" ||
    event.type ===
      "opportunity" ||
    event.type ===
      "strategy-shift"
  ) {
    return true;
  }

  return (
    event.type ===
      "progress" &&
    event.confidence >= 75
  );
}


function mergeMemoryRecord(
  existing:
    AtlasPersistentMemoryRecord,
  event:
    AtlasEvent,
  recordedAt: string
): AtlasPersistentMemoryRecord {
  return {
    ...existing,

    occurredAt:
      resolveTimestamp(
        event.occurredAt
      ),

    lastSeenAt:
      recordedAt,

    severity:
      event.severity,

    status:
      event.status ===
        "resolved"
        ? "resolved"
        : event.status ===
            "acknowledged"
          ? "acknowledged"
          : existing.status,

    headline:
      normalizeString(
        event.headline
      ),

    summary:
      normalizeString(
        event.summary
      ),

    suggestedAction:
      normalizeString(
        event.suggestedAction
      ),

    confidence:
      Math.max(
        existing.confidence,
        normalizeConfidence(
          event.confidence
        )
      ),

    priority:
      Math.max(
        existing.priority,
        normalizePriority(
          event.priority
        )
      ),

    affectedSystems:
      normalizeStringArray([
        ...existing
          .affectedSystems,
        ...event
          .affectedSystems,
      ]),

    sourceChangeIds:
      normalizeStringArray([
        ...existing
          .sourceChangeIds,
        ...event
          .sourceChangeIds,
      ]),

    occurrenceCount:
      existing.occurrenceCount +
      1,
  };
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

  const firstTime =
    new Date(
      first.lastSeenAt
    ).getTime();

  const secondTime =
    new Date(
      second.lastSeenAt
    ).getTime();

  return (
    secondTime -
    firstTime
  );
}


function createEmptyLedger(
  timestamp: string
): AtlasPersistentMemoryLedger {
  return {
    version:
      ATLAS_MEMORY_LEDGER_VERSION,

    createdAt:
      timestamp,

    updatedAt:
      timestamp,

    sessionCount: 0,

    totalEventsObserved: 0,

    totalRecords: 0,

    criticalRecordCount: 0,

    highPriorityRecordCount: 0,

    records: [],
  };
}


function normalizeExistingLedger(
  ledger:
    AtlasPersistentMemoryLedger | null | undefined,
  timestamp: string
): AtlasPersistentMemoryLedger {
  if (!ledger) {
    return createEmptyLedger(
      timestamp
    );
  }

  return {
    version:
      ATLAS_MEMORY_LEDGER_VERSION,

    createdAt:
      resolveTimestamp(
        ledger.createdAt
      ),

    updatedAt:
      resolveTimestamp(
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
      ledger.records.length,

    criticalRecordCount:
      ledger.records.filter(
        (record) =>
          record.severity ===
          "critical"
      ).length,

    highPriorityRecordCount:
      ledger.records.filter(
        (record) =>
          record.severity ===
            "critical" ||
          record.severity ===
            "high"
      ).length,

    records:
      ledger.records.map(
        (record) => ({
          ...record,

          confidence:
            normalizeConfidence(
              record.confidence
            ),

          priority:
            normalizePriority(
              record.priority
            ),

          occurrenceCount:
            Math.max(
              1,
              Math.round(
                record.occurrenceCount
              )
            ),

          affectedSystems:
            normalizeStringArray(
              record.affectedSystems
            ),

          sourceChangeIds:
            normalizeStringArray(
              record.sourceChangeIds
            ),
        })
      ),
  };
}


function buildLedgerSummary(
  ledger:
    AtlasPersistentMemoryLedger,
  records:
    AtlasPersistentMemoryRecord[],
  timestamp: string,
  observedEventCount: number
): AtlasPersistentMemoryLedger {
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
    ...ledger,

    version:
      ATLAS_MEMORY_LEDGER_VERSION,

    updatedAt:
      timestamp,

    sessionCount:
      ledger.sessionCount +
      1,

    totalEventsObserved:
      ledger.totalEventsObserved +
      observedEventCount,

    totalRecords:
      records.length,

    criticalRecordCount,

    highPriorityRecordCount,

    records,
  };
}


export function buildAtlasPersistentMemoryLedger({
  existingLedger,
  eventBus,
  recordedAt,
  retentionLimit,
}: BuildAtlasPersistentMemoryLedgerInput): AtlasPersistentMemoryIngestionResult {
  const resolvedRecordedAt =
    resolveTimestamp(
      recordedAt
    );

  const resolvedRetentionLimit =
    normalizeRetentionLimit(
      retentionLimit
    );

  const ledger =
    normalizeExistingLedger(
      existingLedger,
      resolvedRecordedAt
    );

  const meaningfulEvents =
    eventBus.events.filter(
      isMeaningfulMemoryEvent
    );

  const ignoredEventCount =
    eventBus.events.length -
    meaningfulEvents.length;

  const recordsByFingerprint =
    new Map<
      string,
      AtlasPersistentMemoryRecord
    >(
      ledger.records.map(
        (record) => [
          record.fingerprint,
          record,
        ]
      )
    );

  const addedRecords:
    AtlasPersistentMemoryRecord[] = [];

  const updatedRecords:
    AtlasPersistentMemoryRecord[] = [];

  let duplicateEventCount = 0;

  for (
    const event of
    meaningfulEvents
  ) {
    const fingerprint =
      createFingerprint(
        event
      );

    const existingRecord =
      recordsByFingerprint.get(
        fingerprint
      );

    if (existingRecord) {
      const mergedRecord =
        mergeMemoryRecord(
          existingRecord,
          event,
          resolvedRecordedAt
        );

      recordsByFingerprint.set(
        fingerprint,
        mergedRecord
      );

      updatedRecords.push(
        mergedRecord
      );

      duplicateEventCount += 1;

      continue;
    }

    const memoryRecord =
      createMemoryRecord(
        event,
        resolvedRecordedAt
      );

    recordsByFingerprint.set(
      fingerprint,
      memoryRecord
    );

    addedRecords.push(
      memoryRecord
    );
  }

  const allRecords =
    Array.from(
      recordsByFingerprint.values()
    ).sort(
      compareMemoryRecords
    );

  const retainedRecords =
    allRecords.slice(
      0,
      resolvedRetentionLimit
    );

  const prunedRecordCount =
    Math.max(
      0,
      allRecords.length -
      retainedRecords.length
    );

  return {
    ledger:
      buildLedgerSummary(
        ledger,
        retainedRecords,
        resolvedRecordedAt,
        eventBus.events.length
      ),

    addedRecords,

    updatedRecords,

    ignoredEventCount,

    duplicateEventCount,

    prunedRecordCount,
  };
}