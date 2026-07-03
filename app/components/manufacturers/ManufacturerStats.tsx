import type { ManufacturerSummary } from "@/app/services/manufacturer.service";

type ManufacturerStatsProps = {
  manufacturer: ManufacturerSummary;
};

export default function ManufacturerStats({
  manufacturer,
}: ManufacturerStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Vehicles</p>
        <p className="mt-2 text-2xl font-black text-white">
          {manufacturer.vehicleCount}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Avg Atlas Score</p>
        <p className="mt-2 text-2xl font-black text-amber-400">
          {manufacturer.averageAtlasScore}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Fastest</p>
        <p className="mt-2 text-xl font-black text-white">
          {manufacturer.fastestVehicle?.name ?? "—"}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Best Overall</p>
        <p className="mt-2 text-xl font-black text-white">
          {manufacturer.bestOverallVehicle?.name ?? "—"}
        </p>
      </div>
    </div>
  );
}