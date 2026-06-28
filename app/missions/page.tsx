"use client";

import { useState } from "react";
import MissionCard from "../components/MissionCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/ui/Button";
import { missions } from "./data";

export default function MissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(missions.map((mission) => mission.category)),
  ];

  const filteredMissions = missions.filter((mission) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      mission.title.toLowerCase().includes(query) ||
      mission.description.toLowerCase().includes(query) ||
      mission.category.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" || mission.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Atlas Companion
        </p>

        <h1 className="mt-3 text-5xl font-black">Missions</h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Browse every GTA VI mission, walkthrough, rewards, and objectives.
        </p>

        <div className="mt-10">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                selectedCategory === category
                  ? "bg-emerald-500 text-zinc-950"
                  : "border border-zinc-700 text-zinc-400 hover:border-emerald-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {filteredMissions.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
              <div className="mb-4 text-4xl">🔍</div>

              <h2 className="text-xl font-semibold text-white">
                No missions found
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Try adjusting your search or category filter.
              </p>

              <div className="mt-6">
  <Button
    onClick={() => {
      setSearchQuery("");
      setSelectedCategory("All");
    }}
  >
    Clear Filters
  </Button>
</div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredMissions.map((mission) => (
                <MissionCard key={mission.slug} mission={mission} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}