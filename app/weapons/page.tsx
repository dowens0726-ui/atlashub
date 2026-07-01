"use client";

import Link from "next/link";
import { useState } from "react";

import DiscoveryPanel from "../components/discovery/DiscoveryPanel";
import DiscoveryToolbar from "../components/discovery/DiscoveryToolbar";
import { FilterDropdown, SortDropdown } from "../components/discovery";
import SearchBar from "../components/SearchBar";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import { weapons } from "../data/weapons";

export default function WeaponsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    ...Array.from(new Set(weapons.map((weapon) => weapon.category))).map(
      (category) => ({
        label: category,
        value: category,
      })
    ),
  ];

  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Damage", value: "damage" },
    { label: "Range", value: "range" },
  ];

  const filteredWeapons = weapons
    .filter((weapon) => {
      const query = searchQuery.toLowerCase();

      const matchesCategory =
        selectedCategory === "all" || weapon.category === selectedCategory;

      return (
        matchesCategory &&
        (weapon.name.toLowerCase().includes(query) ||
          weapon.category.toLowerCase().includes(query) ||
          weapon.description.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "damage") return b.damage - a.damage;
      if (sortBy === "range") return b.range - a.range;

      return a.name.localeCompare(b.name);
    });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Armory"
          title="Weapons"
          description="Browse weapon stats, categories, prices, and performance."
        />

        <DiscoveryToolbar title="Weapon Database" count={filteredWeapons.length} />

        <DiscoveryPanel>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="🔍 Search weapons..."
          />

          <FilterDropdown
            label="Category"
            value={selectedCategory}
            options={categoryOptions}
            onChange={setSelectedCategory}
          />

          <SortDropdown
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
          />
        </DiscoveryPanel>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredWeapons.map((weapon) => (
            <Link
              key={weapon.slug}
              href={`/weapons/${weapon.slug}`}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-emerald-400"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                {weapon.category}
              </p>

              <h2 className="mt-2 text-2xl font-bold">{weapon.name}</h2>

              <p className="mt-3 text-zinc-400">{weapon.description}</p>

              <div className="mt-6 text-sm text-zinc-400">
                Price: ${weapon.price.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}