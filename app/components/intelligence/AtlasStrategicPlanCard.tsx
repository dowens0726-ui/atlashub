import type {
  AtlasStrategicPlan,
} from "@/app/intelligence";

type AtlasStrategicPlanCardProps = {
  plan: AtlasStrategicPlan;
};

export default function AtlasStrategicPlanCard({
  plan,
}: AtlasStrategicPlanCardProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-zinc-950 to-zinc-950 p-6">

      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Atlas Strategic Plan
      </p>


      <h2 className="mt-4 text-3xl font-black text-white">
        {plan.title}
      </h2>


      <p className="mt-3 text-zinc-400">
        {plan.objective}
      </p>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Timeframe
          </p>

          <p className="mt-2 text-2xl font-black text-white">
            {plan.timeframe}
          </p>
        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Confidence
          </p>

          <p className="mt-2 text-2xl font-black text-white">
            {plan.confidence}%
          </p>
        </div>

      </div>


      <div className="mt-6 space-y-4">

        {plan.steps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
              Step {index + 1}
            </p>

            <h3 className="mt-2 text-xl font-black text-white">
              {step.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {step.description}
            </p>

            <p className="mt-3 text-sm text-emerald-400">
              Impact: {step.expectedImpact}
            </p>
          </div>
        ))}

      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

        <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-400">
          Projected Outcome
        </p>

        <p className="mt-3 text-sm text-zinc-300">
          {plan.projectedOutcome}
        </p>

      </div>

    </section>
  );
}