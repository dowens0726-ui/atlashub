import type {
  AtlasStrategicPlan,
} from "@/app/intelligence";

type AtlasPlannerStrategyProps = {
  plan: AtlasStrategicPlan;
};

export default function AtlasPlannerStrategy({
  plan,
}: AtlasPlannerStrategyProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-zinc-950 to-zinc-950 p-8">

      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Atlas AI Strategy
      </p>


      <h2 className="mt-3 text-4xl font-black text-white">
        {plan.title}
      </h2>


      <p className="mt-4 max-w-3xl text-zinc-400">
        {plan.objective}
      </p>


      <div className="mt-6 grid gap-4 md:grid-cols-2">

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


      <div className="mt-8 space-y-4">

        {plan.steps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
          >

            <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
              Objective {index + 1}
            </p>


            <h3 className="mt-2 text-xl font-black text-white">
              {step.title}
            </h3>


            <p className="mt-2 text-zinc-400">
              {step.description}
            </p>


            <p className="mt-3 text-sm text-emerald-400">
              Expected Impact:
              {" "}
              {step.expectedImpact}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}