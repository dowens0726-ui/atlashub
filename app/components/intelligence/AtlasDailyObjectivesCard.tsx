import type { DailyObjective } from "@/app/intelligence";

type AtlasDailyObjectivesCardProps = {
  objectives: DailyObjective[];
};

const priorityClasses = {
  High: "text-red-400",
  Medium: "text-amber-400",
  Low: "text-zinc-400",
};

export default function AtlasDailyObjectivesCard({
  objectives,
}: AtlasDailyObjectivesCardProps) {
  return (
    <section className="rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
        Daily Objectives
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Today&apos;s Focus
      </h2>

      <div className="mt-6 space-y-4">
        {objectives.map((objective) => (
          <div
            key={objective.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <p
              className={`text-xs font-black uppercase tracking-[0.2em] ${
                priorityClasses[objective.priority]
              }`}
            >
              {objective.priority} Priority
            </p>

            <h3 className="mt-2 font-black text-white">
              {objective.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {objective.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}