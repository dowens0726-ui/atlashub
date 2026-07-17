import Link from "next/link";

import type {
  GarageProjectedRecommendation,
} from "@/app/intelligence/vehicle";

type GarageImpactCardProps = {
  projection: GarageProjectedRecommendation | null;
};

function formatPrice(price: number): string {
  if (price <= 0) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatScoreChange(scoreIncrease: number): string {
  if (scoreIncrease > 0) {
    return `+${scoreIncrease}`;
  }

  return `${scoreIncrease}`;
}

function getImpactSummary(
  projection: GarageProjectedRecommendation
): string {
  if (projection.scoreIncrease > 0) {
    return `Adding ${projection.vehicle.name} is projected to improve your Garage Score by ${projection.scoreIncrease} ${
      projection.scoreIncrease === 1 ? "point" : "points"
    }.`;
  }

  if (projection.scoreIncrease === 0) {
    return `Adding ${projection.vehicle.name} strengthens specific capabilities without changing your overall Garage Score.`;
  }

  return `Adding ${projection.vehicle.name} addresses targeted garage gaps, although its projected overall score impact is ${projection.scoreIncrease}.`;
}

export default function GarageImpactCard({
  projection,
}: GarageImpactCardProps) {
  if (!projection) {
    return (
      <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Purchase Simulator
        </p>

        <h3 className="mt-2 text-2xl font-black text-white">
          Projected Impact
        </h3>

        <p className="mt-4 leading-7 text-zinc-400">
          No purchase simulation is currently available.
        </p>
      </article>
    );
  }

  const {
    vehicle,
    currentScore,
    projectedScore,
    scoreIncrease,
    improvements,
  } = projection;

  const topImprovements = improvements.slice(0, 5);

  return (
    <article className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-zinc-900/80 to-zinc-950 shadow-xl">
      <div className="border-b border-zinc-800 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Purchase Simulator
        </p>

        <h3 className="mt-2 text-2xl font-black text-white">
          Projected Garage Impact
        </h3>

        <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
          Preview how Atlas expects the recommended purchase to affect your
          garage before you spend.
        </p>
      </div>

      <div className="p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <p className="text-sm font-semibold text-zinc-500">
              Current Score
            </p>

            <p className="mt-3 text-5xl font-black tracking-tight text-white">
              {currentScore}
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Your saved garage
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-2xl text-emerald-400">
              <span aria-hidden="true">→</span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
            <p className="text-sm font-semibold text-emerald-300">
              Projected Score
            </p>

            <div className="mt-3 flex items-end gap-3">
              <p className="text-5xl font-black tracking-tight text-white">
                {projectedScore}
              </p>

              <p
                className={`pb-1 text-lg font-black ${
                  scoreIncrease >= 0
                    ? "text-emerald-400"
                    : "text-amber-300"
                }`}
              >
                {formatScoreChange(scoreIncrease)}
              </p>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              After recommended purchase
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                Simulated Purchase
              </p>

              <Link
                href={`/vehicles/${vehicle.slug}`}
                className="mt-2 inline-block text-2xl font-black text-white transition hover:text-emerald-400"
              >
                {vehicle.name}
              </Link>

              <p className="mt-2 text-zinc-400">
                {vehicle.manufacturer}
                {" · "}
                {vehicle.class}
              </p>
            </div>

            <p className="font-black text-emerald-400">
              {formatPrice(vehicle.price)}
            </p>
          </div>

          <p className="mt-5 leading-7 text-zinc-300">
            {getImpactSummary(projection)}
          </p>

          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
          >
            Review Vehicle
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
            Capability Changes
          </p>

          {topImprovements.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {topImprovements.map((improvement) => (
                <div
                  key={improvement.key}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-zinc-200">
                      {improvement.label}
                    </p>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-black text-emerald-400">
                      +{improvement.increase}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <span className="font-semibold text-zinc-500">
                      {improvement.currentScore}
                    </span>

                    <span
                      className="text-zinc-600"
                      aria-hidden="true"
                    >
                      →
                    </span>

                    <span className="font-black text-white">
                      {improvement.projectedScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-5">
              <p className="text-sm leading-6 text-zinc-500">
                This purchase does not produce a measurable increase in the
                current capability averages.
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}