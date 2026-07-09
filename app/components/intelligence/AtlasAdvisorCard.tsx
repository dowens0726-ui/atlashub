import type {
  AtlasRecommendation,
  AtlasReasoning,
} from "@/app/intelligence";

type AtlasAdvisorCardProps = {
  recommendation: AtlasRecommendation;
  reasoning?: AtlasReasoning;
};

export default function AtlasAdvisorCard({
  recommendation,
  reasoning,
}: AtlasAdvisorCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

      <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
        Atlas Strategic Analysis
      </p>

      <h2 className="mt-5 text-3xl font-black text-white">
        Why Atlas Recommended This Path
      </h2>

      <p className="mt-3 leading-7 text-zinc-400">
        Atlas has analyzed your resources, strategy, and progression path to
        explain the reasoning behind this decision.
      </p>


      {recommendation.match ? (
        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            Match Analysis
          </p>

          <h3 className="mt-3 text-3xl font-black text-white">
            {recommendation.match.overall}% Match
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Factor
              label="Performance"
              value={recommendation.match.factors.performance}
            />

            <Factor
              label="Budget Fit"
              value={recommendation.match.factors.budget}
            />

            <Factor
              label="Playstyle"
              value={recommendation.match.factors.playstyle}
            />

            <Factor
              label="Progression"
              value={recommendation.match.factors.progression}
            />
          </div>
        </div>
      ) : null}


      {reasoning ? (
        <>
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
              Strategic Reasoning
            </p>

            <div className="mt-4 space-y-2">
              {reasoning.reasons.map((reason) => (
                <p
                  key={reason}
                  className="text-sm text-zinc-300"
                >
                  ✓ {reason}
                </p>
              ))}
            </div>
          </div>


          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
              Expected Outcome
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {reasoning.expectedOutcome}
            </p>
          </div>


          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
              Alternative Paths
            </p>

            <div className="mt-3 space-y-2">
              {reasoning.alternatives.map((alternative) => (
                <p
                  key={alternative}
                  className="text-sm text-zinc-400"
                >
                  • {alternative}
                </p>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}


function Factor({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-400"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}