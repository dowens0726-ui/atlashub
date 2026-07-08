import Link from "next/link";
import type { AtlasImpact, NextAction } from "@/app/intelligence";

type AtlasCoreCardProps = {
  action: NextAction;
  impact: AtlasImpact;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function AtlasCoreCard({
  action,
  impact,
}: AtlasCoreCardProps) {
  return (
    <section className="rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
        Atlas Core
      </p>

      <h2 className="mt-4 text-4xl font-black text-white">
        {action.title}
      </h2>

      <p className="mt-3 leading-7 text-zinc-400">
        {action.reason}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Stat label="Confidence" value={`${action.confidence}%`} />
        <Stat label="Risk" value={impact.risk} />
        <Stat label="Empire Gain" value={`+${impact.empireScoreGain}`} />
        <Stat label="Income Gain" value={formatCurrency(impact.estimatedIncomeGain)} />
      </div>

      {action.href ? (
        <Link
          href={action.href}
          className="mt-6 inline-flex rounded-xl bg-violet-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-violet-300"
        >
          {action.actionLabel} →
        </Link>
      ) : null}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}