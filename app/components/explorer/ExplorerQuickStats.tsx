import type { ExplorerMarker } from "@/app/services/explorer.service";

type ExplorerQuickStatsProps = {
  marker: ExplorerMarker;
};

const categoryLabels = {
  vehicle: "Vehicle",
  mission: "Mission",
  weapon: "Weapon",
  business: "Business",
  collectible: "Collectible",
};

export default function ExplorerQuickStats({ marker }: ExplorerQuickStatsProps) {
  return (
    <div className="mt-6 grid gap-3">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <p className="text-sm text-zinc-400">Type</p>
        <p className="mt-1 text-lg font-black text-white">
          {categoryLabels[marker.category]}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <p className="text-sm text-zinc-400">Explorer Position</p>
        <p className="mt-1 text-lg font-black text-white">
          {Math.round(marker.x)} / {Math.round(marker.y)}
        </p>
      </div>
    </div>
  );
}