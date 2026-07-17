import Link from "next/link";

import type {
  GarageRecommendation,
} from "@/app/intelligence/vehicle";

type GarageRecommendationsCardProps = {
  recommendation: GarageRecommendation | null;
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

export default function GarageRecommendationsCard({
  recommendation,
}: GarageRecommendationsCardProps) {
  if (!recommendation) {
    return (
      <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Atlas Recommendation
        </p>

        <h3 className="mt-2 text-2xl font-black text-white">
          Next Purchase
        </h3>

        <p className="mt-4 leading-7 text-zinc-400">
          No recommendation is currently available.
        </p>
      </article>
    );
  }

  const vehicle = recommendation.recommendedVehicle;

  return (
    <article className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-zinc-900/80 to-zinc-950 p-6 shadow-xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
        Atlas Recommendation
      </p>

      <h3 className="mt-2 text-2xl font-black text-white">
        Next Purchase
      </h3>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
        <Link
          href={`/vehicles/${vehicle.slug}`}
          className="text-2xl font-black text-white transition hover:text-emerald-400"
        >
          {vehicle.name}
        </Link>

        <p className="mt-2 text-zinc-400">
          {vehicle.manufacturer}
          {" · "}
          {vehicle.class}
        </p>

        <p className="mt-2 font-bold text-emerald-400">
          {formatPrice(vehicle.price)}
        </p>

        <p className="mt-5 leading-7 text-zinc-300">
          {recommendation.reason}
        </p>

        {recommendation.gaps.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {recommendation.gaps.slice(0, 4).map((gap) => (
              <span
                key={gap}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-bold text-zinc-300"
              >
                {gap}
              </span>
            ))}
          </div>
        ) : null}

        <Link
          href={`/vehicles/${vehicle.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
        >
          View Vehicle
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}