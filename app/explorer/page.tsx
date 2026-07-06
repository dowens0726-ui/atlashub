"use client";

import { useMemo, useState } from "react";

import {
  ExplorerCanvas,
  ExplorerDetailPanel,
  ExplorerLayout,
  ExplorerSidebar,
  ExplorerToolbar,
  type ExplorerFilterKey,
  type ExplorerFiltersState,
} from "@/app/components/explorer";

import {
  getExplorerMarkers,
  type ExplorerMarker,
} from "@/app/services/explorer.service";

const defaultFilters: ExplorerFiltersState = {
  vehicles: true,
  missions: true,
  weapons: true,
  businesses: true,
  collectibles: true,
};

const filterToCategory: Record<
  ExplorerFilterKey,
  ExplorerMarker["category"]
> = {
  vehicles: "vehicle",
  missions: "mission",
  weapons: "weapon",
  businesses: "business",
  collectibles: "collectible",
};

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarker, setSelectedMarker] =
    useState<ExplorerMarker | null>(null);

  const [filters, setFilters] =
    useState<ExplorerFiltersState>(defaultFilters);

  function toggleFilter(filter: ExplorerFilterKey) {
    setFilters((current) => ({
      ...current,
      [filter]: !current[filter],
    }));
  }

  const markers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return getExplorerMarkers().filter((marker) => {
      const matchesSearch =
        query.length === 0 ||
        marker.name.toLowerCase().includes(query);

      const matchingFilter = Object.entries(filterToCategory).find(
        ([, category]) => category === marker.category
      )?.[0] as ExplorerFilterKey | undefined;

      const matchesFilter = matchingFilter
        ? filters[matchingFilter]
        : true;

      return matchesSearch && matchesFilter;
    });
  }, [filters, searchQuery]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Atlas Explorer
          </p>

          <h1 className="mt-3 text-5xl font-black text-white">
            Explore the World
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Search, filter, and explore the GTA VI world through Atlas
            intelligence.
          </p>
        </div>

        <ExplorerLayout
          toolbar={
            <ExplorerToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          }
          sidebar={
            <ExplorerSidebar
              filters={filters}
              onToggleFilter={toggleFilter}
            />
          }
          canvas={
            <ExplorerCanvas
              searchQuery={searchQuery}
              markers={markers}
              selectedMarker={selectedMarker}
              onSelectMarker={setSelectedMarker}
            />
          }
          detailPanel={
            <ExplorerDetailPanel marker={selectedMarker} />
          }
        />
      </div>
    </main>
  );
}