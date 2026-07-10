import type { AtlasOutcome } from "@/app/intelligence";

type AtlasOutcomeCardProps = {
  outcome: AtlasOutcome;
};

function formatCurrency(value: number) {
  if (value === 0) return "$0";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function AtlasOutcomeCard({
  outcome,
}: AtlasOutcomeCardProps) {
  const ratingLabel =
    outcome.rating === "positive"
      ? "Positive Outcome"
      : outcome.rating === "negative"
        ? "Negative Outcome"
        : "Monitoring Result";

  return (
    <section className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
        Outcome Tracking
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        {ratingLabel}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Atlas is analyzing the results of your strategic decisions and
        improving future recommendations.
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          Decision
        </p>

        <h3 className="mt-2 text-xl font-black text-white">
          {outcome.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {outcome.summary}
        </p>
      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Stat
          label="Empire Impact"
          value={
            outcome.empireScoreChange > 0
              ? `+${outcome.empireScoreChange}`
              : `${outcome.empireScoreChange}`
          }
        />

        <Stat
          label="Income Impact"
          value={formatCurrency(outcome.incomeChange)}
        />
      </div>
    </section>
  );
}


function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  );
}