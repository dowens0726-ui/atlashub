import type { ProgressionPlan } from "@/app/types";
import PlannerStep from "./PlannerStep";

type PlannerTimelineProps = {
  plan: ProgressionPlan;
};

export default function PlannerTimeline({
  plan,
}: PlannerTimelineProps) {
  if (plan.steps.length === 0) {
    return (
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-400">
        No progression steps available yet.
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-400">
          Atlas Strategy
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          Empire Growth Roadmap
        </h2>

        <p className="mt-3 max-w-3xl text-zinc-400">
          Atlas has analyzed your current profile and created the
          recommended progression path for your empire.
        </p>
      </div>

      <div className="grid gap-5">
        {plan.steps.map((step, index) => (
          <div key={step.id}>
            <div className="mb-2 flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${
                  index === 0
                    ? "bg-amber-400 text-zinc-950"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {index + 1}
              </span>

              <p
                className={
                  index === 0
                    ? "text-xs font-black uppercase tracking-[0.25em] text-amber-400"
                    : "text-xs font-black uppercase tracking-[0.25em] text-zinc-500"
                }
              >
                {index === 0
                  ? "Current Objective"
                  : `Future Expansion ${index}`}
              </p>
            </div>

            <PlannerStep
              step={step}
              active={index === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}