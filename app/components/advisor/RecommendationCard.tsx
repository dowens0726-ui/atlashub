import Link from "next/link";
import type { AdvisorRecommendation } from "@/app/services/advisor.service";

type RecommendationCardProps = {
  recommendation: AdvisorRecommendation;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6 shadow-2xl">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Atlas Core Recommendation
        </p>

        <h3 className="mt-4 text-3xl font-black text-white">
          {recommendation.title}
        </h3>

        <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
          {recommendation.reason}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Metric
            label="Confidence"
            value={`${recommendation.confidence}%`}
          />

          <Metric
            label="Category"
            value={recommendation.business.category}
          />

          <Metric
            label="Income Potential"
            value={recommendation.business.incomePotential.toString()}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            Why Atlas Chose This
          </p>

          <p className="mt-3 text-zinc-300">
            This recommendation is based on your available cash,
            playstyle, business ownership, and Atlas business scoring.
          </p>
        </div>

        <Link
          href={`/data/businesses/${recommendation.slug}`}
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-sm font-black text-zinc-950 transition hover:bg-amber-300"
        >
          View Empire Strategy →
        </Link>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}