import AtlasStatusBadge from "./AtlasStatusBadge";

import type { EmpireTimelinePoint } from "@/app/intelligence";

type EmpireTimelineCardProps = {
  points: EmpireTimelinePoint[];
};

export default function EmpireTimelineCard({
  points,
}: EmpireTimelineCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-sky-400/20 bg-zinc-950 shadow-2xl shadow-sky-950/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        <header className="border-b border-zinc-800/80 pb-7">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
              Empire Timeline
            </p>

            <AtlasStatusBadge tone="cyan">
              Growth Path
            </AtlasStatusBadge>
          </div>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Empire Progression Timeline
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
            Atlas predicts the milestones you&apos;ll reach as your empire
            expands, helping you visualize long-term progression and strategic
            momentum.
          </p>
        </header>

        <div className="relative mt-8">
          <div className="absolute bottom-0 left-[23px] top-0 w-px bg-gradient-to-b from-sky-400/60 via-sky-400/20 to-transparent" />

          <div className="space-y-6">
            {points.map((point, index) => (
              <TimelineItem
                key={`${point.label}-${index}`}
                index={index}
                point={point}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  index,
  point,
}: {
  index: number;
  point: EmpireTimelinePoint;
}) {
  return (
    <div className="relative flex gap-5">
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-300/40 bg-sky-400 text-sm font-black text-zinc-950 shadow-lg shadow-sky-500/20">
        {index + 1}
      </div>

      <div className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-sky-400/30">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-300">
              {point.label}
            </p>

            <h3 className="mt-2 text-2xl font-black text-white">
              Empire Score {point.score}
            </h3>
          </div>

          <AtlasStatusBadge
            indicator={false}
            tone="cyan"
          >
            Milestone {index + 1}
          </AtlasStatusBadge>
        </div>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          {point.description}
        </p>
      </div>
    </div>
  );
}