"use client";

import { MapLegend } from "./";

type MapToolbarProps = {
  filters: {
    missions: boolean;
    vehicles: boolean;
    weapons: boolean;
  };
  counts: {
    missions: number;
    vehicles: number;
    weapons: number;
  };
  onToggle: (filter: "missions" | "vehicles" | "weapons") => void;
  onShowAll: () => void;
  onHideAll: () => void;
};

export default function MapToolbar({
  filters,
  counts,
  onToggle,
  onShowAll,
  onHideAll,
}: MapToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-20 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3 backdrop-blur">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onToggle("missions")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            filters.missions
              ? "bg-emerald-500 text-zinc-950"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          🎯 Missions
        </button>

        <button
          onClick={() => onToggle("vehicles")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            filters.vehicles
              ? "bg-emerald-500 text-zinc-950"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          🚗 Vehicles
        </button>

        <button
          onClick={() => onToggle("weapons")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            filters.weapons
              ? "bg-emerald-500 text-zinc-950"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          🔫 Weapons
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onShowAll}
          className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700"
        >
          Show All
        </button>

        <button
          onClick={onHideAll}
          className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700"
        >
          Hide All
        </button>
      </div>

      <MapLegend counts={counts} />
    </div>
  );
}