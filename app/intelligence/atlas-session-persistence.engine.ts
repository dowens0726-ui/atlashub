import {
  buildAtlasEventBus,
} from "./atlas-event-bus.engine";

import {
  buildAtlasPersistentMemoryLedger,
} from "./atlas-persistent-memory.engine";

import {
  buildAtlasReactiveTimeline,
} from "./atlas-reactive-timeline.engine";

import {
  detectAtlasBrainChanges,
} from "./atlas-brain-change-detection.engine";

import {
  loadAtlasMemoryLedger,
  saveAtlasMemoryLedger,
} from "./atlas-memory-storage.adapter";

import type {
  AtlasBrainSnapshot,
} from "./atlas-brain-snapshot.engine";

import type {
  AtlasEventBus,
} from "./atlas-event-bus.engine";

import type {
  AtlasPersistentMemoryIngestionResult,
  AtlasPersistentMemoryLedger,
} from "./atlas-persistent-memory.engine";

import type {
  AtlasMemoryStorageLoadResult,
  AtlasMemoryStorageSaveResult,
} from "./atlas-memory-storage.adapter";


export const ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY =
  "atlas:brain-snapshot";


export type AtlasSessionPersistenceStatus =
  | "initialized"
  | "processed"
  | "storage-unavailable"
  | "failed";


export type AtlasSnapshotStorageStatus =
  | "loaded"
  | "empty"
  | "saved"
  | "unavailable"
  | "corrupted"
  | "failed";


export type AtlasSnapshotLoadResult = {
  status:
    AtlasSnapshotStorageStatus;

  snapshot:
    AtlasBrainSnapshot | null;

  recovered:
    boolean;

  error:
    string | null;
};


export type AtlasSnapshotSaveResult = {
  status:
    AtlasSnapshotStorageStatus;

  snapshot:
    AtlasBrainSnapshot | null;

  error:
    string | null;
};


export type RunAtlasSessionPersistenceInput = {
  currentSnapshot:
    AtlasBrainSnapshot;

  persistedAt?: string;

  retentionLimit?: number;
};


export type AtlasSessionPersistenceResult = {
  status:
    AtlasSessionPersistenceStatus;

  previousSnapshot:
    AtlasBrainSnapshot | null;

  currentSnapshot:
    AtlasBrainSnapshot;

  eventBus:
    AtlasEventBus | null;

  ledger:
    AtlasPersistentMemoryLedger | null;

  ingestion:
    AtlasPersistentMemoryIngestionResult | null;

  snapshotLoad:
    AtlasSnapshotLoadResult;

  snapshotSave:
    AtlasSnapshotSaveResult;

  ledgerLoad:
    AtlasMemoryStorageLoadResult;

  ledgerSave:
    AtlasMemoryStorageSaveResult | null;

  error:
    string | null;
};


type BrowserStorage = Pick<
  Storage,
  | "getItem"
  | "setItem"
  | "removeItem"
>;


function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
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


function isStoredBrainSnapshot(
  value: unknown
): value is AtlasBrainSnapshot {
  if (
    !isRecord(value)
  ) {
    return false;
  }

  return (
    isValidTimestamp(
      value.capturedAt
    ) &&
    isFiniteNumber(
      value.cash
    ) &&
    isFiniteNumber(
      value.empireScore
    ) &&
    typeof value.empireHealth ===
      "string" &&
    isFiniteNumber(
      value.copilotConfidence
    ) &&
    isRecord(
      value.recommendation
    ) &&
    isRecord(
      value.situation
    ) &&
    isRecord(
      value.topPriority
    ) &&
    isRecord(
      value.secondaryPriority
    ) &&
    isFiniteNumber(
      value.warningCount
    ) &&
    isFiniteNumber(
      value.opportunityCount
    )
  );
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
    return window.localStorage;
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

  return "An unknown Atlas session persistence error occurred.";
}


function createUnavailableSnapshotLoadResult():
  AtlasSnapshotLoadResult {
  return {
    status:
      "unavailable",

    snapshot: null,

    recovered: false,

    error:
      "Browser storage is unavailable.",
  };
}


function createUnavailableSnapshotSaveResult():
  AtlasSnapshotSaveResult {
  return {
    status:
      "unavailable",

    snapshot: null,

    error:
      "Browser storage is unavailable.",
  };
}


function createUnavailableLedgerLoadResult():
  AtlasMemoryStorageLoadResult {
  return {
    status:
      "unavailable",

    ledger: null,

    recovered: false,

    error:
      "Browser storage is unavailable.",
  };
}


export function loadAtlasBrainSnapshot():
  AtlasSnapshotLoadResult {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return createUnavailableSnapshotLoadResult();
  }

  let serializedSnapshot:
    string | null;

  try {
    serializedSnapshot =
      storage.getItem(
        ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY
      );
  } catch (error) {
    return {
      status:
        "unavailable",

      snapshot: null,

      recovered: false,

      error:
        getErrorMessage(
          error
        ),
    };
  }

  if (!serializedSnapshot) {
    return {
      status:
        "empty",

      snapshot: null,

      recovered: false,

      error: null,
    };
  }

  let parsedSnapshot:
    unknown;

  try {
    parsedSnapshot =
      JSON.parse(
        serializedSnapshot
      );
  } catch (error) {
    let recovered = false;

    try {
      storage.removeItem(
        ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY
      );

      recovered = true;
    } catch {
      recovered = false;
    }

    return {
      status:
        "corrupted",

      snapshot: null,

      recovered,

      error:
        getErrorMessage(
          error
        ),
    };
  }

  if (
    !isStoredBrainSnapshot(
      parsedSnapshot
    )
  ) {
    let recovered = false;

    try {
      storage.removeItem(
        ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY
      );

      recovered = true;
    } catch {
      recovered = false;
    }

    return {
      status:
        "corrupted",

      snapshot: null,

      recovered,

      error:
        "Stored Atlas brain snapshot did not match the expected schema.",
    };
  }

  return {
    status:
      "loaded",

    snapshot:
      parsedSnapshot,

    recovered: false,

    error: null,
  };
}


export function saveAtlasBrainSnapshot(
  snapshot:
    AtlasBrainSnapshot
): AtlasSnapshotSaveResult {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return createUnavailableSnapshotSaveResult();
  }

  if (
    !isStoredBrainSnapshot(
      snapshot
    )
  ) {
    return {
      status:
        "failed",

      snapshot: null,

      error:
        "Atlas brain snapshot failed schema validation.",
    };
  }

  try {
    storage.setItem(
      ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY,
      JSON.stringify(
        snapshot
      )
    );

    return {
      status:
        "saved",

      snapshot,

      error: null,
    };
  } catch (error) {
    return {
      status:
        "failed",

      snapshot: null,

      error:
        getErrorMessage(
          error
        ),
    };
  }
}


export function clearAtlasBrainSnapshot(): boolean {
  const storage =
    getBrowserStorage();

  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(
      ATLAS_BRAIN_SNAPSHOT_STORAGE_KEY
    );

    return true;
  } catch {
    return false;
  }
}


export function runAtlasSessionPersistence({
  currentSnapshot,
  persistedAt,
  retentionLimit,
}: RunAtlasSessionPersistenceInput): AtlasSessionPersistenceResult {
  const snapshotLoad =
    loadAtlasBrainSnapshot();

  const previousSnapshot =
    snapshotLoad.snapshot;

  const ledgerLoad =
    loadAtlasMemoryLedger();

  const snapshotSave =
    saveAtlasBrainSnapshot(
      currentSnapshot
    );

  const storageUnavailable =
    snapshotLoad.status ===
      "unavailable" &&
    ledgerLoad.status ===
      "unavailable";

  if (!previousSnapshot) {
    return {
      status:
        storageUnavailable
          ? "storage-unavailable"
          : snapshotSave.status ===
              "failed"
            ? "failed"
            : "initialized",

      previousSnapshot: null,

      currentSnapshot,

      eventBus: null,

      ledger:
        ledgerLoad.ledger,

      ingestion: null,

      snapshotLoad,

      snapshotSave,

      ledgerLoad,

      ledgerSave: null,

      error:
        snapshotSave.error ??
        snapshotLoad.error ??
        ledgerLoad.error,
    };
  }

  const changes =
    detectAtlasBrainChanges({
      previous:
        previousSnapshot,

      current:
        currentSnapshot,
    });

  const timeline =
    buildAtlasReactiveTimeline({
      changes,
    });

  const eventBus =
    buildAtlasEventBus({
      timeline,
    });

  /*
   * Preserve an unsupported future ledger rather than overwriting it.
   * This prevents accidental data loss if an older Atlas client opens
   * storage created by a newer schema.
   */
  if (
    ledgerLoad.status ===
    "unsupported-version"
  ) {
    return {
      status:
        snapshotSave.status ===
          "failed"
          ? "failed"
          : "processed",

      previousSnapshot,

      currentSnapshot,

      eventBus,

      ledger: null,

      ingestion: null,

      snapshotLoad,

      snapshotSave,

      ledgerLoad,

      ledgerSave: null,

      error:
        ledgerLoad.error ??
        snapshotSave.error,
    };
  }

  const ingestion =
    buildAtlasPersistentMemoryLedger({
      existingLedger:
        ledgerLoad.ledger,

      eventBus,

      recordedAt:
        persistedAt,

      retentionLimit,
    });

  const ledgerSave =
    saveAtlasMemoryLedger(
      ingestion.ledger
    );

  const failed =
    snapshotSave.status ===
      "failed" ||
    ledgerSave.status ===
      "failed";

  return {
    status:
      storageUnavailable
        ? "storage-unavailable"
        : failed
          ? "failed"
          : "processed",

    previousSnapshot,

    currentSnapshot,

    eventBus,

    ledger:
      ledgerSave.ledger ??
      ingestion.ledger,

    ingestion,

    snapshotLoad,

    snapshotSave,

    ledgerLoad,

    ledgerSave,

    error:
      snapshotSave.error ??
      ledgerSave.error ??
      snapshotLoad.error ??
      ledgerLoad.error,
  };
}