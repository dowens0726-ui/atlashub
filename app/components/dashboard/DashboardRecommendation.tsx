import Link from "next/link";
import type { AdvisorRecommendation } from "@/app/services";
import { Badge, Card, MetricRow } from "@/app/components/ui";

type DashboardRecommendationProps = {
  recommendation: AdvisorRecommendation | null;
};

export default function DashboardRecommendation({
  recommendation,
}: DashboardRecommendationProps) {
  if (!recommendation) {
    return (
      <Card padding="lg">
        <Badge>Recommended Next Move</Badge>

        <h2 className="mt-4 text-3xl font-black text-white">
          No recommendation available
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Update your profile, budget, or owned businesses to generate a smarter
          Atlas recommendation.
        </p>

        <Link
          href="/profile"
          className="mt-6 inline-flex rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
        >
          Update Profile →
        </Link>
      </Card>
    );
  }

  return (
    <Card padding="lg" accent="amber">
      <Badge className="border-amber-400/40 text-amber-400">
        Recommended Next Move
      </Badge>

      <h2 className="mt-4 text-3xl font-black text-white">
        {recommendation.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {recommendation.reason}
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 px-5">
        <MetricRow
          label="Confidence"
          value={`${recommendation.confidence}/100`}
        />
        <MetricRow label="Type" value={recommendation.entityType} />
        <MetricRow
          label="Price"
          value={`$${recommendation.business.price.toLocaleString()}`}
        />
      </div>

      <Link
        href={`/businesses/${recommendation.slug}`}
        className="mt-6 inline-flex rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
      >
        View Business →
      </Link>
    </Card>
  );
}