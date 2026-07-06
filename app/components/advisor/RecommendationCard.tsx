import Link from "next/link";
import type { AdvisorRecommendation } from "@/app/services/advisor.service";

type RecommendationCardProps = {
  recommendation: AdvisorRecommendation;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <div className="rounded-3xl border border-amber-400/30 bg-zinc-900 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Recommended Next Step
      </p>

      <h3 className="mt-3 text-3xl font-black text-white">
        {recommendation.title}
      </h3>

      <p className="mt-4 text-zinc-300">{recommendation.reason}</p>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <p className="text-sm text-zinc-400">Confidence</p>
        <p className="mt-1 text-4xl font-black text-amber-400">
          {recommendation.confidence}%
        </p>
      </div>

      <Link
        href={`/businesses/${recommendation.slug}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
      >
        View Recommendation →
      </Link>
    </div>
  );
}