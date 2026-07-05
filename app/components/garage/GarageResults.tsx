import type { GarageBuild } from "@/app/services/garage-builder.service";
import GarageRecommendationCard from "./GarageRecommendationCard";

type GarageResultsProps = {
  build: GarageBuild;
};

export default function GarageResults({ build }: GarageResultsProps) {
  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Garage Score</p>
          <p className="mt-2 text-3xl font-black text-amber-400">
            {build.score}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Total Cost</p>
          <p className="mt-2 text-2xl font-black text-white">
            ${build.totalCost.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Remaining Budget</p>
          <p className="mt-2 text-2xl font-black text-white">
            ${build.remainingBudget.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {build.recommendations.map((recommendation) => (
          <GarageRecommendationCard
            key={`${recommendation.role}-${recommendation.vehicle.slug}`}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
}