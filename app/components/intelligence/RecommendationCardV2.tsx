import Link from "next/link";
import type { VehicleRecommendation } from "@/app/services/recommendation.service";

type RecommendationCardV2Props = {
  recommendation: VehicleRecommendation;
};

export default function RecommendationCardV2({
  recommendation,
}: RecommendationCardV2Props) {
  const { vehicle, score, reasons } = recommendation;

  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 text-white transition hover:-translate-y-1 hover:border-amber-400"
    >
      <div className="flex aspect-video items-center justify-center bg-zinc-950 text-5xl">
        🚗
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-400">
          Atlas Match {score}
        </p>

        <h3 className="mt-3 text-2xl font-black">{vehicle.name}</h3>

        <p className="mt-1 text-sm text-zinc-400">
          {vehicle.manufacturer} · {vehicle.class}
        </p>

        <div className="mt-4 space-y-2">
          {reasons.slice(0, 3).map((reason) => (
            <p
              key={reason}
              className="rounded-lg bg-zinc-950 px-3 py-2 text-xs text-zinc-300"
            >
              ✓ {reason}
            </p>
          ))}
        </div>

        <p className="mt-5 font-semibold text-amber-400 transition group-hover:translate-x-1">
          View Recommendation →
        </p>
      </div>
    </Link>
  );
}