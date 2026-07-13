import type {
  AtlasCoachBriefing,
} from "@/app/intelligence";


type AtlasCoachCardProps = {
  briefing: AtlasCoachBriefing;
};


const priorityStyles = {
  Low:
    "border-zinc-700 bg-zinc-800/60 text-zinc-300",

  Medium:
    "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",

  High:
    "border-amber-400/30 bg-amber-400/10 text-amber-300",

  Critical:
    "border-red-400/30 bg-red-400/10 text-red-300",
};


const toneStyles = {
  Exploratory:
    "text-cyan-300",

  Supportive:
    "text-emerald-300",

  Confident:
    "text-violet-300",

  Corrective:
    "text-amber-300",
};


export default function AtlasCoachCard({
  briefing,
}: AtlasCoachCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-500/15 via-zinc-950 to-cyan-500/10 p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
              {briefing.title}
            </p>

            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              {briefing.greeting}
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              {briefing.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${
                priorityStyles[
                  briefing.priority
                ]
              }`}
            >
              {briefing.priority} Priority
            </span>

            <span
              className={`rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1 text-xs font-black uppercase tracking-wider ${
                toneStyles[
                  briefing.tone
                ]
              }`}
            >
              {briefing.tone}
            </span>
          </div>
        </div>


        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Metric
            label="Coach Confidence"
            value={`${briefing.confidence}%`}
          />

          <Metric
            label="Priority"
            value={briefing.priority}
          />

          <Metric
            label="Coaching Mode"
            value={briefing.tone}
          />
        </div>


        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Coach Summary
          </p>

          <p className="mt-3 leading-7 text-zinc-300">
            {briefing.summary}
          </p>
        </div>


        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            What Atlas Sees
          </p>

          <div className="mt-4 space-y-3">
            {briefing.highlights.map(
              (highlight) => (
                <p
                  key={highlight}
                  className="text-sm leading-6 text-zinc-300"
                >
                  ✓ {highlight}
                </p>
              )
            )}
          </div>
        </div>


        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
            Recommended Focus
          </p>

          <h3 className="mt-3 text-2xl font-black text-white">
            {briefing.recommendationTitle}
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {briefing.recommendationSummary}
          </p>

          <p className="mt-5 text-sm font-bold text-emerald-300">
            {briefing.callToAction}
          </p>
        </div>
      </div>
    </section>
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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}