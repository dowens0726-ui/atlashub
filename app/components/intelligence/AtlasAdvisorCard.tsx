import Link from "next/link";
import type {
  AtlasRecommendation,
  AtlasReasoning,
} from "@/app/intelligence";

type AtlasAdvisorCardProps = {
  recommendation: AtlasRecommendation;
  reasoning?: AtlasReasoning;
};

function formatCurrency(value?: number) {
  if (!value) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function AtlasAdvisorCard({
  recommendation,
  reasoning,
}: AtlasAdvisorCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

      <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
        Atlas Advisor
      </p>

      <h2 className="mt-5 text-3xl font-black text-white">
        {recommendation.title}
      </h2>

      <p className="mt-3 leading-7 text-zinc-400">
        {recommendation.summary}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Stat
          label="Confidence"
          value={`${recommendation.confidence}%`}
        />

        <Stat
          label="Priority"
          value={recommendation.priority}
        />

        <Stat
          label="Profit"
          value={formatCurrency(recommendation.estimatedProfit)}
          accent
        />

        <Stat
          label="Time"
          value={
            recommendation.estimatedTimeMinutes
              ? `${recommendation.estimatedTimeMinutes} min`
              : "Review"
          }
        />
      </div>

      {reasoning ? (
        <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
            Why Atlas Chose This
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

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Expected Outcome
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {reasoning.expectedOutcome}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Alternatives
            </p>

            <div className="mt-2 space-y-1">
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
        </div>
      ) : null}

      {recommendation.href ? (
        <Link
          href={recommendation.href}
          className="mt-6 inline-flex rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-amber-300"
        >
          View Recommendation →
        </Link>
      ) : null}
    </section>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${
          accent ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}