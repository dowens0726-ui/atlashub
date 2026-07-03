"use client";

import { MapLegend } from "./";
import ToolbarButton from "./ToolbarButton";

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
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Atlas Explorer
        </p>

        <p className="mt-1 text-sm text-zinc-400">
          Search, filter, drag, and zoom the map.
        </p>
      </div>

      <input
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search the map..."
        className="mb-3 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
      />

      <div className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300">
        Zoom: {Math.round(scale * 100)}%
      </div>

      <div className="flex flex-wrap gap-2">
        <ToolbarButton active={filters.missions} onClick={() => onToggle("missions")}>
          🎯 Missions
        </ToolbarButton>

        <ToolbarButton active={filters.vehicles} onClick={() => onToggle("vehicles")}>
          🚗 Vehicles
        </ToolbarButton>

        <ToolbarButton active={filters.weapons} onClick={() => onToggle("weapons")}>
          🔫 Weapons
        </ToolbarButton>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ToolbarButton onClick={onShowAll}>Show All</ToolbarButton>
        <ToolbarButton onClick={onHideAll}>Hide All</ToolbarButton>
        <ToolbarButton onClick={onZoomIn}>➕ Zoom</ToolbarButton>
        <ToolbarButton onClick={onZoomOut}>➖ Zoom</ToolbarButton>
        <ToolbarButton primary onClick={onResetView}>
          ⟳ Reset
        </ToolbarButton>
      </div>

      <div className="mt-4">
        <MapLegend counts={counts} />
      </div>
    </div>
  );
}