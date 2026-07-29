export type AtlasRecentEvent = {
  id: string;
  title: string;
  detail?: string;
  timestamp?: string;
  tone?: "default" | "positive" | "warning" | "accent";
};

type AtlasRecentEventsProps = {
  events: AtlasRecentEvent[];
  emptyMessage?: string;
};

const eventToneStyles: Record<
  NonNullable<AtlasRecentEvent["tone"]>,
  {
    dot: string;
    rail: string;
    label: string;
  }
> = {
  default: {
    dot: "bg-white/45",
    rail: "bg-white/10",
    label: "text-white/35",
  },
  positive: {
    dot: "bg-emerald-300",
    rail: "bg-emerald-300/16",
    label: "text-emerald-200/55",
  },
  warning: {
    dot: "bg-amber-300",
    rail: "bg-amber-300/16",
    label: "text-amber-200/55",
  },
  accent: {
    dot: "bg-cyan-300",
    rail: "bg-cyan-300/16",
    label: "text-cyan-200/55",
  },
};

export default function AtlasRecentEvents({
  events,
  emptyMessage = "No recent operational signals.",
}: AtlasRecentEventsProps) {
  if (events.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-white/[0.07] bg-white/[0.018] px-3 py-4 text-center text-[0.65rem] text-white/30">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ol className="relative space-y-1">
      {events.map(
        (
          event,
          index
        ) => {
          const tone =
            event.tone ??
            "default";

          const styles =
            eventToneStyles[tone];

          return (
            <li
              key={event.id}
              className={[
                "group relative overflow-hidden rounded-xl",
                "border border-transparent",
                "px-3 py-2.5",
                "transition duration-300",
                "hover:border-white/[0.05]",
                "hover:bg-white/[0.025]",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={[
                  "absolute bottom-2 left-0 top-2 w-px",
                  styles.rail,
                ].join(" ")}
              />

              <div className="grid grid-cols-[0.55rem_minmax(0,1fr)] gap-2.5">
                <div className="relative flex justify-center">
                  <span
                    className={[
                      "mt-1.5 h-1.5 w-1.5 rounded-full",
                      "shadow-[0_0_10px_currentColor]",
                      styles.dot,
                    ].join(" ")}
                  />

                  {index === 0 ? (
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute mt-1 h-2.5 w-2.5 animate-ping rounded-full opacity-20",
                        styles.dot,
                      ].join(" ")}
                    />
                  ) : null}
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-[0.67rem] font-semibold text-white/82 transition group-hover:text-cyan-50">
                      {event.title}
                    </p>

                    {event.timestamp ? (
                      <time
                        className={[
                          "shrink-0 text-[0.5rem] font-black uppercase tracking-[0.1em]",
                          styles.label,
                        ].join(" ")}
                      >
                        {event.timestamp}
                      </time>
                    ) : null}
                  </div>

                  {event.detail ? (
                    <p className="mt-1 line-clamp-2 text-[0.58rem] leading-4 text-white/36">
                      {event.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        }
      )}
    </ol>
  );
}