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
  string
> = {
  default: "bg-white/40",
  positive: "bg-emerald-300",
  warning: "bg-amber-300",
  accent: "bg-cyan-300",
};

export default function AtlasRecentEvents({
  events,
  emptyMessage = "No recent operational signals.",
}: AtlasRecentEventsProps) {
  if (events.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-white/[0.07] px-3 py-4 text-center text-[0.68rem] text-white/30">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ol className="space-y-1">
      {events.map((event) => {
        const tone = event.tone ?? "default";

        return (
          <li
            key={event.id}
            className="relative grid grid-cols-[0.5rem_minmax(0,1fr)] gap-2.5 rounded-xl px-2 py-2.5 transition duration-300 hover:bg-white/[0.025]"
          >
            <div className="relative flex justify-center">
              <span
                className={[
                  "mt-1.5 h-1.5 w-1.5 rounded-full shadow-[0_0_10px_currentColor]",
                  eventToneStyles[tone],
                ].join(" ")}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-[0.68rem] font-medium text-white/68">
                  {event.title}
                </p>

                {event.timestamp ? (
                  <time className="shrink-0 text-[0.54rem] uppercase tracking-[0.08em] text-white/23">
                    {event.timestamp}
                  </time>
                ) : null}
              </div>

              {event.detail ? (
                <p className="mt-0.5 line-clamp-2 text-[0.61rem] leading-4 text-white/31">
                  {event.detail}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
