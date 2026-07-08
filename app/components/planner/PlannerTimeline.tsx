import type { ProgressionPlan } from "@/app/types";
import PlannerStep from "./PlannerStep";

type PlannerTimelineProps = {
  plan: ProgressionPlan;
};

export default function PlannerTimeline({ plan }: PlannerTimelineProps) {
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
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Progression Roadmap
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          Recommended Path
        </h2>
      </div>

      <div className="grid gap-5">
        {plan.steps.map((step, index) => (
          <PlannerStep
            key={step.id}
            step={step}
            active={index === 0}
          />
        ))}
      </div>
    </section>
  );
}