"use client";

import { useMemo, useState } from "react";
import type { AtlasMapMarker } from "@/app/types";
import { useExplorerFilters } from "@/app/hooks/useExplorerFilters";
import { useExplorerSearch } from "@/app/hooks/useExplorerSearch";
import { useExplorerViewport } from "@/app/hooks/useExplorerViewport";
import MapMarker from "./MapMarker";
import MapSidebar from "./MapSidebar";
import MapViewport from "./MapViewport";
import { MapToolbar } from "./toolbar";

type MapCanvasProps = {
  markers: AtlasMapMarker[];
};

export default function MapCanvas({ markers }: MapCanvasProps) {
  const [selectedMarker, setSelectedMarker] = useState<AtlasMapMarker | null>(
    null
  );

  const { searchQuery, updateSearchQuery } = useExplorerSearch();

  const { filters, counts, toggleFilter, showAllFilters, hideAllFilters } =
    useExplorerFilters(markers);

  const {
    position,
    scale,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
    zoomIn,
    zoomOut,
    resetViewport,
  } = useExplorerViewport();

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
      <MapViewport
        position={position}
        scale={scale}
        isDragging={isDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        onDoubleClick={resetViewport}
      >
        {visibleMarkers.map((marker) => (
          <MapMarker
            key={marker.id}
            marker={marker}
            active={selectedMarker?.id === marker.id}
            onClick={setSelectedMarker}
          />
        ))}
      </MapViewport>

      <MapToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        scale={scale}
        filters={filters}
        counts={counts}
        onToggle={handleToggle}
        onShowAll={handleShowAll}
        onHideAll={handleHideAll}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetView={resetViewport}
      />

      <MapSidebar
        marker={selectedMarker}
        onClose={() => setSelectedMarker(null)}
      />
    </div>
  );
}