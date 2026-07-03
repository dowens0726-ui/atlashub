"use client";

import { useMemo, useState } from "react";
import type { AtlasMapMarker } from "@/app/types";
import MapMarker from "./MapMarker";
import MapSidebar from "./MapSidebar";
import { MapToolbar } from "./toolbar";
import { useExplorerFilters } from "@/app/hooks/useExplorerFilters";
import { useExplorerSearch } from "@/app/hooks/useExplorerSearch";

type MapCanvasProps = {
  markers: AtlasMapMarker[];
};

export default function MapCanvas({ markers }: MapCanvasProps) {
  const [selectedMarker, setSelectedMarker] = useState<AtlasMapMarker | null>(
    null
  );
 const {
  searchQuery,
  updateSearchQuery,
} = useExplorerSearch();

  const {
    filters,
    counts,
    toggleFilter,
    showAllFilters,
    hideAllFilters,
  } = useExplorerFilters(markers);

  const visibleMarkers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return markers.filter((marker) => {
      const matchesType =
        (marker.type === "mission" && filters.missions) ||
        (marker.type === "vehicle" && filters.vehicles) ||
        (marker.type === "weapon" && filters.weapons) ||
        !["mission", "vehicle", "weapon"].includes(marker.type);

      const matchesSearch =
        normalizedQuery.length === 0 ||
        marker.title.toLowerCase().includes(normalizedQuery) ||
        marker.description.toLowerCase().includes(normalizedQuery) ||
        marker.type.toLowerCase().includes(normalizedQuery);

      return matchesType && matchesSearch;
    });
  }, [markers, filters, searchQuery]);

  function handleToggle(filter: "missions" | "vehicles" | "weapons") {
    toggleFilter(filter);
    setSelectedMarker(null);
  }

  function handleShowAll() {
    showAllFilters();
    setSelectedMarker(null);
  }

  function handleHideAll() {
    hideAllFilters();
    setSelectedMarker(null);
  }

  function handleSearchChange(value: string) {
  updateSearchQuery(value);
  setSelectedMarker(null);
}

  return (
    <div className="relative min-h-[600px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1f2937,_#09090b)]" />

      <MapToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filters={filters}
        counts={counts}
        onToggle={handleToggle}
        onShowAll={handleShowAll}
        onHideAll={handleHideAll}
      />

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