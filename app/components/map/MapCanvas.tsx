"use client";

import { useMemo, useState } from "react";
import type { AtlasMapMarker } from "@/app/types";
import MapMarker from "./MapMarker";
import MapSidebar from "./MapSidebar";
import { MapToolbar } from "./toolbar";

type MapCanvasProps = {
  markers: AtlasMapMarker[];
};

type MapFilterKey = "missions" | "vehicles" | "weapons";

type MapFiltersState = Record<MapFilterKey, boolean>;

export default function MapCanvas({ markers }: MapCanvasProps) {
  const [selectedMarker, setSelectedMarker] = useState<AtlasMapMarker | null>(
    null
  );

  const [filters, setFilters] = useState<MapFiltersState>({
    missions: true,
    vehicles: true,
    weapons: true,
  });

  const visibleMarkers = useMemo(() => {
    return markers.filter((marker) => {
      if (marker.type === "mission") return filters.missions;
      if (marker.type === "vehicle") return filters.vehicles;
      if (marker.type === "weapon") return filters.weapons;

      return true;
    });
  }, [markers, filters]);

  function handleToggle(filter: MapFilterKey) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filter]: !currentFilters[filter],
    }));

    setSelectedMarker(null);
  }

  return (
    <div className="relative min-h-[600px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1f2937,_#09090b)]" />

      <MapToolbar filters={filters} onToggle={handleToggle} />

      {visibleMarkers.map((marker) => (
        <MapMarker
          key={marker.id}
          marker={marker}
          active={selectedMarker?.id === marker.id}
          onClick={setSelectedMarker}
        />
      ))}

      <MapSidebar
        marker={selectedMarker}
        onClose={() => setSelectedMarker(null)}
      />
    </div>
  );
}