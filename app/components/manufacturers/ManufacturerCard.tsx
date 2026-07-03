import Link from "next/link";
import type { ManufacturerSummary } from "@/app/services/manufacturer.service";

type ManufacturerCardProps = {
  manufacturer: ManufacturerSummary;
};

export default function ManufacturerCard({
  manufacturer,
}: ManufacturerCardProps) {
  return (
    <Link
      href={`/manufacturers/${manufacturer.slug}`}
      className="group block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            Manufacturer
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            {manufacturer.name}
          </h2>
        </div>

        <div className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-bold text-zinc-950">
          {manufacturer.vehicleCount}
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-zinc-300">
        <p>
          ⭐ Average Atlas Score{" "}
          <span className="font-bold text-amber-400">
            {manufacturer.averageAtlasScore}
          </span>
        </p>

        <p>
          🏎 Fastest{" "}
          <span className="font-semibold text-white">
            {manufacturer.fastestVehicle?.name ?? "—"}
          </span>
        </p>

        <p>
          🏆 Best Overall{" "}
          <span className="font-semibold text-white">
            {manufacturer.bestOverallVehicle?.name ?? "—"}
          </span>
        </p>
      </div>

      <p className="mt-6 font-semibold text-emerald-400 transition-transform duration-200 group-hover:translate-x-1">
        View Manufacturer →
      </p>
    </Link>
  );
}