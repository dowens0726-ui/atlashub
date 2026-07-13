import type {
  AtlasIntelligenceTimeline,
  AtlasIntelligenceTimelineEvent,
  AtlasIntelligenceTimelineTone,
} from "@/app/intelligence";


type AtlasIntelligenceTimelineCardProps = {
  timeline: AtlasIntelligenceTimeline;
};


const toneStyles: Record<
  AtlasIntelligenceTimelineTone,
  {
    border: string;
    background: string;
    dot: string;
    text: string;
  }
> = {
  cyan: {
    border:
      "border-cyan-400/20",
    background:
      "bg-cyan-400/[0.04]",
    dot:
      "bg-cyan-400",
    text:
      "text-cyan-400",
  },

  emerald: {
    border:
      "border-emerald-400/20",
    background:
      "bg-emerald-400/[0.04]",
    dot:
      "bg-emerald-400",
    text:
      "text-emerald-400",
  },

  amber: {
    border:
      "border-amber-400/20",
    background:
      "bg-amber-400/[0.04]",
    dot:
      "bg-amber-400",
    text:
      "text-amber-400",
  },

  red: {
    border:
      "border-red-400/20",
    background:
      "bg-red-400/[0.04]",
    dot:
      "bg-red-400",
    text:
      "text-red-400",
  },

  violet: {
    border:
      "border-violet-400/20",
    background:
      "bg-violet-400/[0.04]",
    dot:
      "bg-violet-400",
    text:
      "text-violet-400",
  },
};


function formatTimestamp(
  timestamp: string
): string {
  if (!timestamp) {
    return "Time unavailable";
  }

  const date =
    new Date(timestamp);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return timestamp;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "short",
      day:
        "numeric",
      hour:
        "numeric",
      minute:
        "2-digit",
    }
  ).format(date);
}


export default function AtlasIntelligenceTimelineCard({
  timeline,
}: AtlasIntelligenceTimelineCardProps) {
  return (
    <section className="rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/10 via-zinc-950 to-cyan-500/10 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
            Intelligence History
          </p>

          <h2 className="mt-4 text-3xl font-black text-white">
            {timeline.title}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            {timeline.summary}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-right">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Timeline Confidence
          </p>

          <p className="mt-1 text-2xl font-black text-white">
            {timeline.confidence}%
          </p>
        </div>
      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Metric
          label="Total Events"
          value={
            timeline.totalEvents.toString()
          }
        />

        <Metric
          label="Latest Event"
          value={
            timeline.latestEvent?.title ??
            "No activity yet"
          }
        />
      </div>


      {timeline.events.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 p-8 text-center">
          <p className="text-lg font-black text-white">
            No intelligence history yet
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Start a strategy, complete it, and report the outcome to build your
            Atlas timeline.
          </p>
        </div>
      ) : (
        <div className="relative mt-8">
          <div className="absolute bottom-4 left-[0.4375rem] top-4 w-px bg-zinc-800" />

          <div className="space-y-5">
            {timeline.events.map(
              (event) => (
                <TimelineEvent
                  key={event.id}
                  event={event}
                />
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
}


function TimelineEvent({
  event,
}: {
  event: AtlasIntelligenceTimelineEvent;
}) {
  const styles =
    toneStyles[event.tone];

  return (
    <article className="relative pl-8">
      <div
        className={`absolute left-0 top-6 h-3.5 w-3.5 rounded-full ring-4 ring-zinc-950 ${styles.dot}`}
      />

      <div
        className={`rounded-2xl border p-5 ${styles.border} ${styles.background}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              className={`text-xs font-black uppercase tracking-[0.2em] ${styles.text}`}
            >
              {event.type.replaceAll(
                "-",
                " "
              )}
            </p>

            <h3 className="mt-2 text-xl font-black text-white">
              {event.title}
            </h3>
          </div>

          <time
            className="text-xs font-semibold text-zinc-500"
            dateTime={event.timestamp}
          >
            {formatTimestamp(
              event.timestamp
            )}
          </time>
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {event.description}
        </p>

        {event.metric ? (
          <div className="mt-4 inline-flex rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                {event.metric.label}
              </p>

              <p className="mt-1 text-lg font-black text-white">
                {event.metric.value}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}


function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}