"use client";

import { MapLegend } from "./";

type MapToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  scale: number;
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
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
};

export default function MapToolbar({
  searchQuery,
  onSearchChange,
  scale,
  filters,
  counts,
  onToggle,
  onShowAll,
  onHideAll,
  onZoomIn,
  onZoomOut,
  onResetView,
}: MapToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-20 w-[min(90vw,360px)] rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3 backdrop-blur">
      {/* Header */}
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Atlas Explorer
        </p>

        <p className="mt-1 text-sm text-zinc-400">
          Search, filter, drag, and zoom the map.
        </p>
      </div>

      {/* Search */}
      <input
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search the map..."
        className="mb-3 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
      />

      {/* Zoom Level */}
      <div className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300">
        Zoom: {Math.round(scale * 100)}%
      </div>

      {/* Filters */}
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

      {/* Controls */}
      <div className="mt-3 flex flex-wrap gap-2">
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

        <button
          onClick={onZoomIn}
          className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700"
        >
          ➕ Zoom
        </button>

        <button
          onClick={onZoomOut}
          className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700"
        >
          ➖ Zoom
        </button>

        <button
          onClick={onResetView}
          className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
        >
          ⟳ Reset
        </button>
      </div>

      <div className="mt-4">
        <MapLegend counts={counts} />
      </div>
    </div>
  );
}