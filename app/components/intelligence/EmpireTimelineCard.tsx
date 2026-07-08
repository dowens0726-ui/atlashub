import type { EmpireTimelinePoint } from "@/app/intelligence";

type EmpireTimelineCardProps = {
  points: EmpireTimelinePoint[];
};

export default function EmpireTimelineCard({ points }: EmpireTimelineCardProps) {
  return (
    <section className="rounded-[2rem] border border-sky-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-400">
        Empire Timeline
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Projected Growth
      </h2>

      <div className="mt-6 space-y-4">
        {points.map((point, index) => (
          <div
            key={point.label}
            className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400 font-black text-zinc-950">
                {index + 1}
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                {point.label}
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                Empire Score {point.score}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}