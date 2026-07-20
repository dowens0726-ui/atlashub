"use client";

import {
  useMemo,
  useState,
} from "react";

import AtlasSurface from "@/app/components/design-system/AtlasSurface";

import type {
  AtlasCopilotSession,
  AtlasCopilotSessionEntry,
} from "@/app/intelligence";


type AtlasCopilotTimelineProps = {
  session:
    AtlasCopilotSession | null;

  isReady:
    boolean;
};


function formatEntryTime(
  createdAt:
    string
): string {
  const date =
    new Date(
      createdAt
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown time";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      hour:
        "numeric",

      minute:
        "2-digit",
    }
  ).format(
    date
  );
}


function formatConfidence(
  confidence:
    number
): string {
  const normalizedConfidence =
    confidence <= 1
      ? confidence * 100
      : confidence;

  return `${Math.round(
    normalizedConfidence
  )}%`;
}


function getEntryLabel(
  entry:
    AtlasCopilotSessionEntry
): string {
  switch (
    entry.role
  ) {
    case "player":
      return "Player";

    case "atlas":
      return "Atlas";

    case "system":
    default:
      return "System";
  }
}


function getEntryTone(
  entry:
    AtlasCopilotSessionEntry
): string {
  switch (
    entry.role
  ) {
    case "player":
      return "border-cyan-400/20 bg-cyan-400/[0.05]";

    case "atlas":
      return "border-emerald-400/20 bg-emerald-400/[0.05]";

    case "system":
    default:
      return "border-amber-400/20 bg-amber-400/[0.05]";
  }
}


export default function AtlasCopilotTimeline({
  session,
  isReady,
}: AtlasCopilotTimelineProps) {
  const [
    expanded,
    setExpanded,
  ] =
    useState(
      false
    );


  const entries =
    useMemo(
      () =>
        session
          ?.entries
          .slice()
          .reverse() ??
        [],
      [
        session,
      ]
    );


  return (
    <AtlasSurface
      tone="subtle"
      className="overflow-hidden"
    >
      <button
        type="button"
        onClick={() =>
          setExpanded(
            (
              currentValue
            ) =>
              !currentValue
          )
        }
        aria-expanded={
          expanded
        }
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.025] sm:px-6"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Conversational Memory
          </p>

          <h2 className="mt-2 text-lg font-black text-white">
            Session Timeline
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {isReady
              ? `${entries.length} remembered ${
                  entries.length === 1
                    ? "entry"
                    : "entries"
                }`
              : "Loading session memory"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:inline">
            {expanded
              ? "Collapse"
              : "Expand"}
          </span>

          <span
            aria-hidden="true"
            className={[
              "text-xl text-zinc-400 transition-transform",
              expanded
                ? "rotate-180"
                : "",
            ].join(" ")}
          >
            ↓
          </span>
        </div>
      </button>

      {expanded ? (
        <div className="border-t border-white/10 px-5 py-5 sm:px-6">
          {!isReady ? (
            <p className="text-sm text-zinc-500">
              Atlas is initializing session memory.
            </p>
          ) : entries.length ===
            0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-5 py-6">
              <p className="font-semibold text-white">
                No session history yet
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Submit a strategic prompt and Atlas will begin recording the conversation.
              </p>
            </div>
          ) : (
            <ol className="space-y-4">
              {entries.map(
                (
                  entry
                ) => (
                  <li
                    key={
                      entry.id
                    }
                    className={[
                      "rounded-2xl border p-4",
                      getEntryTone(
                        entry
                      ),
                    ].join(" ")}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-[0.18em] text-white">
                            {getEntryLabel(
                              entry
                            )}
                          </span>

                          {entry.intent ? (
                            <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                              {entry.intent}
                            </span>
                          ) : null}
                        </div>

                        {entry.recommendationTitle ? (
                          <p className="mt-3 text-sm font-bold text-emerald-300">
                            {
                              entry.recommendationTitle
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        {typeof entry.recommendationConfidence ===
                        "number" ? (
                          <span>
                            Confidence{" "}
                            {formatConfidence(
                              entry.recommendationConfidence
                            )}
                          </span>
                        ) : null}

                        <time
                          dateTime={
                            entry.createdAt
                          }
                        >
                          {formatEntryTime(
                            entry.createdAt
                          )}
                        </time>
                      </div>
                    </div>

                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-300">
                      {entry.content}
                    </p>
                  </li>
                )
              )}
            </ol>
          )}
        </div>
      ) : null}
    </AtlasSurface>
  );
}