import type {
  AtlasEvent,
  AtlasEventBus,
  AtlasEventAudience,
} from "@/app/intelligence";


type AtlasSessionChangesCardProps = {
  eventBus: AtlasEventBus;

  title?: string;

  description?: string;

  audience?: AtlasEventAudience;

  maxEvents?: number;

  className?: string;
};


type SessionChangeVisual = {
  symbol: string;

  label: string;

  symbolClassName: string;

  badgeClassName: string;

  borderClassName: string;
};


const severityRank: Record<
  AtlasEvent["severity"],
  number
> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};


function normalizeMaxEvents(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return 5;
  }

  return Math.min(
    10,
    Math.max(
      1,
      Math.round(value)
    )
  );
}


function joinClassNames(
  ...classNames: Array<
    string | undefined | false
  >
): string {
  return classNames
    .filter(Boolean)
    .join(" ");
}


function formatEventType(
  type: AtlasEvent["type"]
): string {
  switch (type) {
    case "strategy-shift":
      return "Strategy Shift";

    case "status-update":
      return "Status Update";

    default:
      return type
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");
  }
}


function resolveEventVisual(
  event: AtlasEvent
): SessionChangeVisual {
  if (
    event.severity === "critical"
  ) {
    return {
      symbol: "!",
      label: "Critical",
      symbolClassName:
        "border-red-400/40 bg-red-400/10 text-red-300",
      badgeClassName:
        "border-red-400/30 bg-red-400/10 text-red-200",
      borderClassName:
        "border-red-400/20",
    };
  }

  switch (event.type) {
    case "warning":
      return {
        symbol: "!",
        label: "Warning",
        symbolClassName:
          "border-amber-400/40 bg-amber-400/10 text-amber-300",
        badgeClassName:
          "border-amber-400/30 bg-amber-400/10 text-amber-200",
        borderClassName:
          "border-amber-400/20",
      };

    case "setback":
      return {
        symbol: "↓",
        label: "Setback",
        symbolClassName:
          "border-orange-400/40 bg-orange-400/10 text-orange-300",
        badgeClassName:
          "border-orange-400/30 bg-orange-400/10 text-orange-200",
        borderClassName:
          "border-orange-400/20",
      };

    case "milestone":
      return {
        symbol: "◆",
        label: "Milestone",
        symbolClassName:
          "border-violet-400/40 bg-violet-400/10 text-violet-300",
        badgeClassName:
          "border-violet-400/30 bg-violet-400/10 text-violet-200",
        borderClassName:
          "border-violet-400/20",
      };

    case "opportunity":
      return {
        symbol: "+",
        label: "Opportunity",
        symbolClassName:
          "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
        badgeClassName:
          "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
        borderClassName:
          "border-cyan-400/20",
      };

    case "strategy-shift":
      return {
        symbol: "↻",
        label: "Strategy Shift",
        symbolClassName:
          "border-blue-400/40 bg-blue-400/10 text-blue-300",
        badgeClassName:
          "border-blue-400/30 bg-blue-400/10 text-blue-200",
        borderClassName:
          "border-blue-400/20",
      };

    case "progress":
      return {
        symbol: "↑",
        label: "Progress",
        symbolClassName:
          "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
        badgeClassName:
          "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
        borderClassName:
          "border-emerald-400/20",
      };

    case "status-update":
      return {
        symbol: "•",
        label: "Update",
        symbolClassName:
          "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
        badgeClassName:
          "border-zinc-500/30 bg-zinc-500/10 text-zinc-300",
        borderClassName:
          "border-zinc-700",
      };
  }
}


function compareEvents(
  first: AtlasEvent,
  second: AtlasEvent
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

  const severityDifference =
    severityRank[
      second.severity
    ] -
    severityRank[
      first.severity
    ];

  if (
    severityDifference !== 0
  ) {
    return severityDifference;
  }

  return (
    new Date(
      second.occurredAt
    ).getTime() -
    new Date(
      first.occurredAt
    ).getTime()
  );
}


function selectEvents(
  eventBus: AtlasEventBus,
  audience: AtlasEventAudience,
  maxEvents: number
): AtlasEvent[] {
  return eventBus.events
    .filter(
      (event) =>
        event.audiences.includes(
          audience
        )
    )
    .sort(compareEvents)
    .slice(
      0,
      maxEvents
    );
}


function formatTimestamp(
  value: string
): string {
  const parsed =
    new Date(value);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "Latest session";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(parsed);
}


function SessionMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/5 bg-black/20 px-3 py-2.5">
      <p className="text-lg font-black leading-none text-white">
        {value}
      </p>

      <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
    </div>
  );
}


function SessionChangeEvent({
  event,
}: {
  event: AtlasEvent;
}) {
  const visual =
    resolveEventVisual(event);

  return (
    <article
      className={joinClassNames(
        "rounded-2xl border bg-black/20 p-4 transition duration-200 hover:bg-white/[0.035]",
        visual.borderClassName
      )}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className={joinClassNames(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-base font-black",
            visual.symbolClassName
          )}
        >
          {visual.symbol}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={joinClassNames(
                "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]",
                visual.badgeClassName
              )}
            >
              {visual.label}
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
              {formatEventType(
                event.type
              )}
            </span>
          </div>

          <h3 className="mt-2 text-sm font-bold leading-5 text-white sm:text-base">
            {event.headline}
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-zinc-400">
            {event.summary}
          </p>

          {event.suggestedAction ? (
            <div className="mt-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                Atlas Action
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-300">
                {event.suggestedAction}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}


export default function AtlasSessionChangesCard({
  eventBus,
  title = "Since Your Last Session",
  description = "Atlas analyzed the latest changes to your empire, strategy, and active priorities.",
  audience = "dashboard",
  maxEvents,
  className,
}: AtlasSessionChangesCardProps) {
  const eventLimit =
    normalizeMaxEvents(
      maxEvents
    );

  const events =
    selectEvents(
      eventBus,
      audience,
      eventLimit
    );

  const progressCount =
    events.filter(
      (event) =>
        event.type ===
          "progress" ||
        event.type ===
          "milestone"
    ).length;

  const warningCount =
    events.filter(
      (event) =>
        event.type ===
          "warning" ||
        event.type ===
          "setback"
    ).length;

  const opportunityCount =
    events.filter(
      (event) =>
        event.type ===
        "opportunity"
    ).length;

  return (
    <section
      className={joinClassNames(
        "overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/20",
        className
      )}
    >
      <div className="border-b border-white/5 bg-gradient-to-br from-emerald-400/[0.08] via-transparent to-cyan-400/[0.04] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Atlas Live Intelligence
              </p>
            </div>

            <h2 className="mt-3 text-xl font-black tracking-tight text-white sm:text-2xl">
              {title}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {description}
            </p>
          </div>

          <div className="shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
              Latest comparison
            </p>

            <p className="mt-1 text-xs font-semibold text-zinc-400">
              {formatTimestamp(
                eventBus.currentCapturedAt
              )}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <SessionMetric
            label="Changes"
            value={
              eventBus.totalEvents
            }
          />

          <SessionMetric
            label="Progress"
            value={
              progressCount
            }
          />

          <SessionMetric
            label="Warnings"
            value={
              warningCount
            }
          />

          <SessionMetric
            label="Opportunities"
            value={
              opportunityCount
            }
          />
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {events.length > 0 ? (
          <>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">
                  Priority changes
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Ordered by severity, confidence, and strategic impact.
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                {events.length} shown
              </span>
            </div>

            <div className="space-y-3">
              {events.map(
                (event) => (
                  <SessionChangeEvent
                    key={event.id}
                    event={event}
                  />
                )
              )}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-8 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] text-lg font-black text-emerald-400">
              ✓
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              No material changes detected
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Your current strategic position remains stable compared with the previous Atlas Brain snapshot.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}