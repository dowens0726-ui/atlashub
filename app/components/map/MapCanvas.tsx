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
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<MapFiltersState>({
    missions: true,
    vehicles: true,
    weapons: true,
  });

  const counts = useMemo(() => {
    return {
      missions: markers.filter((marker) => marker.type === "mission").length,
      vehicles: markers.filter((marker) => marker.type === "vehicle").length,
      weapons: markers.filter((marker) => marker.type === "weapon").length,
    };
  }, [markers]);

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

  function handleToggle(filter: MapFilterKey) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filter]: !currentFilters[filter],
    }));

    setSelectedMarker(null);
  }

  function handleShowAll() {
    setFilters({
      missions: true,
      vehicles: true,
      weapons: true,
    });

    setSelectedMarker(null);
  }

  function handleHideAll() {
    setFilters({
      missions: false,
      vehicles: false,
      weapons: false,
    });

    setSelectedMarker(null);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
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