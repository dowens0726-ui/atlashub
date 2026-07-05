import Link from "next/link";
import type { GarageRecommendation } from "@/app/services/garage-builder.service";

type GarageRecommendationCardProps = {
  recommendation: GarageRecommendation;
};

export default function GarageRecommendationCard({
  recommendation,
}: GarageRecommendationCardProps) {
  const { role, vehicle, reason } = recommendation;

  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="block rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-white transition hover:-translate-y-1 hover:border-amber-400"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        {role}
      </p>

      <h3 className="mt-3 text-2xl font-black">{vehicle.name}</h3>

      <p className="mt-1 text-sm text-zinc-400">
        {vehicle.manufacturer} · {vehicle.class}
      </p>

      <p className="mt-4 text-sm leading-6 text-zinc-300">{reason}</p>

      <p className="mt-5 font-semibold text-amber-400">View Vehicle →</p>
    </Link>
  );
}