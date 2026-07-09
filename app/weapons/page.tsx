"use client";

import WeaponCard from "../components/WeaponCard";
import { useMemo, useState } from "react";

import {
  HeroBanner,
  HeroMetrics,
} from "../components/design-system";

import DiscoveryPanel from "../components/discovery/DiscoveryPanel";
import DiscoveryToolbar from "../components/discovery/DiscoveryToolbar";
import {
  FilterDropdown,
  SortDropdown,
} from "../components/discovery";

import { AppShell } from "../components/layout";
import SearchBar from "../components/SearchBar";
import Container from "../components/ui/Container";

import { weapons } from "../data/weapons";

export default function WeaponsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const categoryOptions = useMemo(
    () => [
      {
        label: "All Categories",
        value: "all",
      },
      ...Array.from(
        new Set(weapons.map((weapon) => weapon.category))
      ).map((category) => ({
        label: category,
        value: category,
      })),
    ],
    []
  );

  const sortOptions = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Price",
      value: "price",
    },
    {
      label: "Damage",
      value: "damage",
    },
    {
      label: "Range",
      value: "range",
    },
  ];

  const filteredWeapons = useMemo(() => {
    return weapons
      .filter((weapon) => {
        const query = searchQuery.toLowerCase();

        const matchesCategory =
          selectedCategory === "all" ||
          weapon.category === selectedCategory;

        const matchesSearch =
          weapon.name.toLowerCase().includes(query) ||
          weapon.category.toLowerCase().includes(query) ||
          weapon.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        }

        if (sortBy === "damage") {
          return b.damage - a.damage;
        }

        if (sortBy === "range") {
          return b.range - a.range;
        }

        return a.name.localeCompare(b.name);
      });
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
  ]);

  const highestDamageWeapon = filteredWeapons.reduce(
    (best, weapon) =>
      !best || weapon.damage > best.damage
        ? weapon
        : best,
    null as (typeof weapons)[number] | null
  );

  const longestRangeWeapon = filteredWeapons.reduce(
    (best, weapon) =>
      !best || weapon.range > best.range
        ? weapon
        : best,
    null as (typeof weapons)[number] | null
  );

  return (
    <AppShell>
      <Container size="wide" className="py-10">
        <HeroBanner
          eyebrow="Atlas Armory"
          title="Weapon Intelligence"
          subtitle="Browse every weapon, compare firepower, analyze performance, and build the perfect loadout."
        >
          <HeroMetrics
            metrics={[
              {
                label: "Total Weapons",
                value: weapons.length.toString(),
              },
              {
                label: "Categories",
                value: (
                  categoryOptions.length - 1
                ).toString(),
              },
              {
                label: "Top Damage",
                value:
                  highestDamageWeapon?.name ??
                  "None",
              },
            ]}
            columns={3}
          />
        </HeroBanner>

        <DiscoveryToolbar
          title="Weapon Database"
          count={filteredWeapons.length}
        />

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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard
            label="Highest Damage"
            value={
              highestDamageWeapon?.name ??
              "None"
            }
          />

          <StatCard
            label="Longest Range"
            value={
              longestRangeWeapon?.name ??
              "None"
            }
          />

          <StatCard
            label="Visible Matches"
            value={filteredWeapons.length.toString()}
          />
        </div>

       <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {filteredWeapons.map((weapon) => (
    <WeaponCard
      key={weapon.slug}
      weapon={weapon}
    />
  ))}
</div> 
      </Container>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}