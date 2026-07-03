"use client";

import { useMemo, useState } from "react";
import type { AtlasMapMarker } from "@/app/types";

export type MapFilterKey = "missions" | "vehicles" | "weapons";

export type MapFiltersState = Record<MapFilterKey, boolean>;

export function useExplorerFilters(markers: AtlasMapMarker[]) {
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

  function toggleFilter(filter: MapFilterKey) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filter]: !currentFilters[filter],
    }));
  }

  function showAllFilters() {
    setFilters({
      missions: true,
      vehicles: true,
      weapons: true,
    });
  }

  function hideAllFilters() {
    setFilters({
      missions: false,
      vehicles: false,
      weapons: false,
    });
  }

  return {
    filters,
    counts,
    toggleFilter,
    showAllFilters,
    hideAllFilters,
  };
}