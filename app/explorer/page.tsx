"use client";

import { useState } from "react";

import {
  ExplorerCanvas,
  ExplorerLayout,
  ExplorerSidebar,
  ExplorerToolbar,
  type ExplorerFilterKey,
  type ExplorerFiltersState,
} from "@/app/components/explorer";

const defaultFilters: ExplorerFiltersState = {
  vehicles: true,
  missions: true,
  weapons: true,
  businesses: true,
  collectibles: true,
};

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] =
    useState<ExplorerFiltersState>(defaultFilters);

  function toggleFilter(filter: ExplorerFilterKey) {
    setFilters((current) => ({
      ...current,
      [filter]: !current[filter],
    }));
  }

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
          canvas={<ExplorerCanvas searchQuery={searchQuery} />}
        />
      </div>
    </main>
  );
}