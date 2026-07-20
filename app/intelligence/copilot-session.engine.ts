export type AtlasCopilotSessionEntryRole =
  | "player"
  | "atlas"
  | "system";

export type AtlasCopilotSessionEntry = {
  id: string;

  role: AtlasCopilotSessionEntryRole;

  content: string;

  createdAt: string;

  recommendationTitle?: string;

  recommendationConfidence?: number;

  intent?: string;
};

export type AtlasCopilotSession = {
  sessionId: string;

  startedAt: string;

  updatedAt: string;

  entries: AtlasCopilotSessionEntry[];
};

export function buildCopilotSession(): AtlasCopilotSession {
  const now = new Date().toISOString();

  return {
    sessionId: crypto.randomUUID(),

    startedAt: now,

    updatedAt: now,

    entries: [],
  };
}

export function appendCopilotSessionEntry(
  session: AtlasCopilotSession,
  entry: AtlasCopilotSessionEntry
): AtlasCopilotSession {
  return {
    ...session,

    updatedAt: entry.createdAt,

    entries: [
      ...session.entries,
      entry,
    ],
  };
}