import type {
  AtlasSessionPlan,
  SessionReasoning,
} from "@/app/intelligence";

type AtlasSessionPlanCardProps = {
  plan: AtlasSessionPlan;
  reasoning?: SessionReasoning;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getDifficulty(time: number) {
  if (time <= 45) return "Easy";
  if (time <= 90) return "Medium";
  return "Advanced";
}

export default function AtlasSessionPlanCard({
  plan,
  reasoning,
}: AtlasSessionPlanCardProps) {
  const difficulty = getDifficulty(plan.estimatedTimeMinutes);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
          Today's Atlas Strategy
        </p>

        <h2 className="mt-4 text-4xl font-black text-white">
          {plan.title}
        </h2>

        {reasoning ? (
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <SummaryCard
                label="Objective"
                value={reasoning.objective}
              />

              <SummaryCard
                label="Confidence"
                value={`${reasoning.confidence}%`}
                accent="text-emerald-400"
              />
            </div>

            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                Why This Route
              </p>

              <p className="mt-2 leading-6 text-zinc-300">
                {reasoning.explanation}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                Expected Outcome
              </p>

              <p className="mt-2 leading-6 text-zinc-300">
                {reasoning.expectedOutcome}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Estimated Profit"
            value={formatCurrency(plan.estimatedProfit)}
            accent="text-emerald-400"
          />

          <SummaryCard
            label="Session Time"
            value={`${plan.estimatedTimeMinutes} min`}
          />

          <SummaryCard
            label="Difficulty"
            value={difficulty}
          />
        </div>

        <div className="mt-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
            Recommended Route
          </p>

          <div className="mt-5 space-y-4">
            {plan.steps.map((step) => (
              <div
                key={step.order}
                className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-emerald-400/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400 font-black text-zinc-950">
                  {step.order}
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">
                    {step.recommendation.title}
                  </h3>

                  <p className="mt-2 leading-6 text-zinc-400">
                    {step.recommendation.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  accent = "text-white",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className={`mt-2 text-xl font-black ${accent}`}>
        {value}
      </p>
    </div>
  );
}