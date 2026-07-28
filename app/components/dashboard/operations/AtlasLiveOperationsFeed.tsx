import Link from "next/link";

import type {
  AtlasEvent,
  AtlasEventBus,
} from "@/app/intelligence";


type AtlasLiveOperationsFeedProps = {
  eventBus: AtlasEventBus | null;
  maxEvents?: number;
};


type EventVisual = {
  label: string;
  dotClassName: string;
  borderClassName: string;
  backgroundClassName: string;
  labelClassName: string;
};


const eventVisuals: Record<
  AtlasEvent["severity"],
  EventVisual
> = {
  critical: {
    label: "Critical",
    dotClassName:
      "bg-rose-300 shadow-[0_0_18px_rgba(253,164,175,0.95)]",
    borderClassName:
      "border-rose-300/25",
    backgroundClassName:
      "bg-rose-300/[0.055]",
    labelClassName:
      "text-rose-200",
  },

  high: {
    label: "High Priority",
    dotClassName:
      "bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.9)]",
    borderClassName:
      "border-amber-300/20",
    backgroundClassName:
      "bg-amber-300/[0.045]",
    labelClassName:
      "text-amber-200",
  },

  medium: {
    label: "Active",
    dotClassName:
      "bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.85)]",
    borderClassName:
      "border-cyan-300/15",
    backgroundClassName:
      "bg-cyan-300/[0.035]",
    labelClassName:
      "text-cyan-200",
  },

  low: {
    label: "Informational",
    dotClassName:
      "bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.75)]",
    borderClassName:
      "border-violet-300/12",
    backgroundClassName:
      "bg-violet-300/[0.025]",
    labelClassName:
      "text-violet-200",
  },
};


function normalizeMaxEvents(
  value?: number
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return 6;
  }

  return Math.min(
    12,
    Math.max(
      1,
      Math.round(value)
    )
  );
}


function formatEventType(
  value: AtlasEvent["type"]
): string {
  return value
    .replace(
      /[-_]/g,
      " "
    )
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}


function formatRelativeTime(
  value: string
): string {
  const timestamp =
    new Date(value).getTime();

  if (
    Number.isNaN(timestamp)
  ) {
    return "Recently";
  }

  const difference =
    Date.now() - timestamp;

  const minutes =
    Math.max(
      0,
      Math.floor(
        difference / 60_000
      )
    );

  if (minutes < 1) {
    return "Now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  return `${days}d ago`;
}


function getActionHref(
  event: AtlasEvent
): string {
  if (
    event.type === "opportunity"
  ) {
    return "/planner";
  }

  if (
    event.type ===
      "strategy-shift"
  ) {
    return "/copilot";
  }

  if (
    event.type === "warning" ||
    event.type === "setback"
  ) {
    return "/copilot";
  }

  if (
    event.category === "empire"
  ) {
    return "/profile";
  }

  return "/planner";
}


function AtlasOperationsEvent({
  event,
}: {
  event: AtlasEvent;
}) {
  const visual =
    eventVisuals[
      event.severity
    ];

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border p-4",
        "transition duration-300",
        "hover:-translate-y-0.5 hover:border-white/[0.14]",
        visual.borderClassName,
        visual.backgroundClassName,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex gap-4">
        <div className="flex flex-col items-center">
          <span
            className={[
              "mt-1.5 h-2.5 w-2.5 rounded-full",
              visual.dotClassName,
            ].join(" ")}
          />

          <span className="mt-2 h-full min-h-12 w-px bg-gradient-to-b from-white/12 to-transparent" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={[
                "rounded-full border border-white/[0.08]",
                "bg-black/20 px-2.5 py-1",
                "text-[0.55rem] font-black uppercase tracking-[0.18em]",
                visual.labelClassName,
              ].join(" ")}
            >
              {visual.label}
            </span>

            <span className="text-[0.55rem] font-bold uppercase tracking-[0.16em] text-white/30">
              {formatEventType(
                event.type
              )}
            </span>

            <time
              dateTime={
                event.occurredAt
              }
              className="ml-auto text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/28"
            >
              {formatRelativeTime(
                event.occurredAt
              )}
            </time>
          </div>

          <h3 className="mt-3 text-sm font-bold leading-6 text-white/90">
            {event.headline}
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-white/43">
            {event.summary}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <p className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-white/25">
                Recommended response
              </p>

              <p className="mt-1 text-xs leading-5 text-white/55">
                {event.suggestedAction}
              </p>
            </div>

            <Link
              href={
                getActionHref(
                  event
                )
              }
              className={[
                "inline-flex min-h-9 items-center justify-center",
                "rounded-xl border border-cyan-300/15",
                "bg-cyan-300/[0.06] px-3",
                "text-[0.58rem] font-black uppercase tracking-[0.16em]",
                "text-cyan-100 transition",
                "hover:border-cyan-200/30 hover:bg-cyan-300/[0.1]",
              ].join(" ")}
            >
              Review
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-3">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/30">
              Confidence{" "}
              <strong className="text-white/62">
                {event.confidence}%
              </strong>
            </span>

            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/30">
              Priority{" "}
              <strong className="text-white/62">
                {event.priority}
              </strong>
            </span>

            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/30">
              Status{" "}
              <strong className="text-emerald-200/75">
                {event.status}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}


export default function AtlasLiveOperationsFeed({
  eventBus,
  maxEvents,
}: AtlasLiveOperationsFeedProps) {
  const eventLimit =
    normalizeMaxEvents(
      maxEvents
    );

  const events =
    eventBus?.dashboardEvents
      .slice(
        0,
        eventLimit
      ) ?? [];

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(7,16,27,0.84),rgba(3,8,15,0.72))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.09),transparent_32%),radial-gradient(circle_at_100%_30%,rgba(139,92,246,0.07),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
      />

      <div className="relative">
        <header className="flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-35" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,0.85)]" />
              </span>

              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-cyan-100/55">
                Event Bus Online
              </p>
            </div>

            <h3 className="mt-3 text-xl font-black tracking-[-0.02em] text-white">
              Live Empire Activity
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
              Strategic changes, opportunities, warnings, and progression events detected by Atlas.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-center">
              <p className="text-sm font-black text-white">
                {eventBus?.totalEvents ?? 0}
              </p>

              <p className="mt-0.5 text-[0.5rem] font-bold uppercase tracking-[0.14em] text-white/25">
                Events
              </p>
            </div>

            <div className="rounded-xl border border-amber-300/10 bg-amber-300/[0.025] px-3 py-2 text-center">
              <p className="text-sm font-black text-amber-200">
                {eventBus?.highPriorityCount ?? 0}
              </p>

              <p className="mt-0.5 text-[0.5rem] font-bold uppercase tracking-[0.14em] text-white/25">
                Priority
              </p>
            </div>

            <div className="rounded-xl border border-rose-300/10 bg-rose-300/[0.025] px-3 py-2 text-center">
              <p className="text-sm font-black text-rose-200">
                {eventBus?.criticalCount ?? 0}
              </p>

              <p className="mt-0.5 text-[0.5rem] font-bold uppercase tracking-[0.14em] text-white/25">
                Critical
              </p>
            </div>
          </div>
        </header>

        {events.length > 0 ? (
          <div className="mt-5 space-y-3">
            {events.map(
              (event) => (
                <AtlasOperationsEvent
                  key={event.id}
                  event={event}
                />
              )
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.018] px-5 py-8 text-center">
            <p className="text-sm font-bold text-white/65">
              No new operational events
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/32">
              Atlas is synchronized. Meaningful changes will appear here as your empire, strategy, and session state evolve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
