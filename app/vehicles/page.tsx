"use client";

import DiscoveryToolbar from "../components/discovery/DiscoveryToolbar";
import DiscoveryPanel from "../components/discovery/DiscoveryPanel";
import { FilterDropdown, SortDropdown } from "../components/discovery";
import { useState } from "react";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import { vehicles } from "../data/vehicles";

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedClass, setSelectedClass] = useState("all");

  const sortOptions = [  
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Top Speed", value: "topSpeed" },
  ];

  const classOptions = [
  { label: "All Classes", value: "all" },
  ...Array.from(new Set(vehicles.map((vehicle) => vehicle.class))).map(
    (vehicleClass) => ({
      label: vehicleClass,
      value: vehicleClass,
    })
  ),
];

  const filteredVehicles = vehicles
    .filter((vehicle) => {
      const query = searchQuery.toLowerCase();
const matchesClass =
  selectedClass === "all" || vehicle.class === selectedClass;
      return (
  matchesClass &&
  (vehicle.name.toLowerCase().includes(query) ||
    vehicle.manufacturer.toLowerCase().includes(query) ||
    vehicle.class.toLowerCase().includes(query))
);
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "topSpeed") return b.topSpeed - a.topSpeed;

      return a.name.localeCompare(b.name);
    });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
  eyebrow="AtlasHub"
  title="Vehicles"
  description="Browse every vehicle, manufacturer, location, and performance stat."
/>

<DiscoveryToolbar
  title="Vehicle Database"
  count={vehicles.length}
/>

<DiscoveryPanel>
  <SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="🔍 Search vehicles..."
/>

  <FilterDropdown
    label="Class"
    value={selectedClass}
    options={classOptions}
    onChange={setSelectedClass}
  />

  <SortDropdown
    value={sortBy}
    options={sortOptions}
    onChange={setSortBy}
  />
</DiscoveryPanel>

        <div className="mt-12">
          {filteredVehicles.length === 0 ? (
  <EmptyState
    icon="🚗"
    title="No vehicles found"
    description="Try another search."
    buttonText="Clear Search"
    onButtonClick={() => setSearchQuery("")}
  />
) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.slug}
                  vehicle={vehicle}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}