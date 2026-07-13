"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useAtlasEvents,
} from "@/app/hooks/useAtlasEvents";

import type {
  AtlasEvent,
  AtlasEventType,
} from "@/app/store/atlas-events";


type AtlasToastTone =
  | "cyan"
  | "emerald"
  | "amber"
  | "red"
  | "violet";


type AtlasToastContent = {
  title: string;

  description: string;

  tone: AtlasToastTone;
};


const DISPLAY_DURATION_MS =
  5000;


const toneStyles: Record<
  AtlasToastTone,
  {
    border: string;
    background: string;
    label: string;
    dot: string;
  }
> = {
  cyan: {
    border:
      "border-cyan-400/30",

    background:
      "bg-cyan-400/10",

    label:
      "text-cyan-300",

    dot:
      "bg-cyan-400",
  },

  emerald: {
    border:
      "border-emerald-400/30",

    background:
      "bg-emerald-400/10",

    label:
      "text-emerald-300",

    dot:
      "bg-emerald-400",
  },

  amber: {
    border:
      "border-amber-400/30",

    background:
      "bg-amber-400/10",

    label:
      "text-amber-300",

    dot:
      "bg-amber-400",
  },

  red: {
    border:
      "border-red-400/30",

    background:
      "bg-red-400/10",

    label:
      "text-red-300",

    dot:
      "bg-red-400",
  },

  violet: {
    border:
      "border-violet-400/30",

    background:
      "bg-violet-400/10",

    label:
      "text-violet-300",

    dot:
      "bg-violet-400",
  },
};


function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}


function getStringValue(
  payload: unknown,
  key: string
): string | undefined {
  if (!isRecord(payload)) {
    return undefined;
  }

  const value =
    payload[key];

  return typeof value === "string"
    ? value
    : undefined;
}


function getNumberValue(
  payload: unknown,
  key: string
): number | undefined {
  if (!isRecord(payload)) {
    return undefined;
  }

  const value =
    payload[key];

  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : undefined;
}


function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-US",
    {
      style:
        "currency",

      currency:
        "USD",

      notation:
        "compact",

      maximumFractionDigits:
        1,
    }
  ).format(value);
}


function buildToastContent(
  event: AtlasEvent
): AtlasToastContent {
  const title =
    getStringValue(
      event.payload,
      "title"
    );


  if (
    event.type ===
    "strategy-started"
  ) {
    return {
      title:
        "Strategy Started",

      description:
        title
          ? `Atlas is now tracking ${title}.`
          : "Atlas is now tracking this strategy.",

      tone:
        "cyan",
    };
  }


  if (
    event.type ===
    "strategy-completed"
  ) {
    return {
      title:
        "Strategy Completed",

      description:
        title
          ? `${title} is ready for outcome reporting.`
          : "Report the result so Atlas can learn from it.",

      tone:
        "emerald",
    };
  }


  if (
    event.type ===
    "strategy-abandoned"
  ) {
    return {
      title:
        "Strategy Abandoned",

      description:
        title
          ? `${title} remains preserved in your Atlas history.`
          : "Atlas preserved this decision in your history.",

      tone:
        "red",
    };
  }


  if (
    event.type ===
    "outcome-reported"
  ) {
    const incomeChange =
      getNumberValue(
        event.payload,
        "incomeChange"
      );

    const empireScoreChange =
      getNumberValue(
        event.payload,
        "empireScoreChange"
      );

    const details =
      [
        incomeChange !== undefined
          ? `${formatCurrency(
              incomeChange
            )} income impact`
          : null,

        empireScoreChange !== undefined
          ? `${
              empireScoreChange > 0
                ? "+"
                : ""
            }${empireScoreChange} empire impact`
          : null,
      ]
        .filter(
          (
            value
          ): value is string =>
            value !== null
        )
        .join(" • ");

    return {
      title:
        "Outcome Recorded",

      description:
        details ||
        "Atlas added the reported result to your learning history.",

      tone:
        "violet",
    };
  }


  if (
    event.type ===
    "outcome-validated"
  ) {
    const successScore =
      getNumberValue(
        event.payload,
        "successScore"
      );

    const status =
      getStringValue(
        event.payload,
        "status"
      );

    return {
      title:
        status === "failed"
          ? "Outcome Validation Failed"
          : "Outcome Validated",

      description:
        successScore !== undefined
          ? `Atlas recorded a success score of ${successScore}.`
          : "Atlas validated the reported result.",

      tone:
        status === "failed"
          ? "red"
          : "emerald",
    };
  }


  return {
    title:
      getEventLabel(
        event.type
      ),

    description:
      "Atlas intelligence has been updated.",

    tone:
      "violet",
  };
}


function getEventLabel(
  type: AtlasEventType
): string {
  return type
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}


export default function AtlasLiveEventToast() {
  const [
    event,
    setEvent,
  ] = useState<AtlasEvent | null>(
    null
  );

  const timeoutRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(
      null
    );


  const dismiss =
    useCallback(() => {
      if (
        timeoutRef.current
      ) {
        clearTimeout(
          timeoutRef.current
        );

        timeoutRef.current =
          null;
      }

      setEvent(null);
    }, []);


  useAtlasEvents(
    useCallback(
      (
        nextEvent: AtlasEvent
      ) => {
        if (
          timeoutRef.current
        ) {
          clearTimeout(
            timeoutRef.current
          );
        }

        setEvent(
          nextEvent
        );

        timeoutRef.current =
          setTimeout(
            () => {
              setEvent(null);

              timeoutRef.current =
                null;
            },
            DISPLAY_DURATION_MS
          );
      },
      []
    )
  );


  useEffect(() => {
    return () => {
      if (
        timeoutRef.current
      ) {
        clearTimeout(
          timeoutRef.current
        );
      }
    };
  }, []);


  if (!event) {
    return null;
  }


  const content =
    buildToastContent(
      event
    );

  const styles =
    toneStyles[
      content.tone
    ];


  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 top-24 z-[100] flex justify-end sm:inset-x-6"
    >
      <div
        className={`pointer-events-auto w-full max-w-md rounded-2xl border p-5 shadow-2xl shadow-black/40 backdrop-blur-xl ${styles.border} ${styles.background}`}
        role="status"
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={`mt-1.5 h-3 w-3 shrink-0 rounded-full shadow-[0_0_18px_currentColor] ${styles.dot}`}
          />

          <div className="min-w-0 flex-1">
            <p
              className={`text-xs font-black uppercase tracking-[0.22em] ${styles.label}`}
            >
              Live Atlas Update
            </p>

            <h2 className="mt-2 text-lg font-black text-white">
              {content.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {content.description}
            </p>
          </div>

          <button
            aria-label="Dismiss Atlas notification"
            className="rounded-lg border border-zinc-700 px-2.5 py-1.5 text-sm font-bold text-zinc-400 transition hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            type="button"
            onClick={
              dismiss
            }
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}