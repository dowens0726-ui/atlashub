"use client";

import { useMemo, useState } from "react";
import DiscoveryToolbar from "../components/discovery/DiscoveryToolbar";
import DiscoveryPanel from "../components/discovery/DiscoveryPanel";
import { FilterDropdown, SortDropdown } from "../components/discovery";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import { vehicles } from "../data";

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedDrivetrain, setSelectedDrivetrain] = useState("all");
  const [selectedSeats, setSelectedSeats] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Top Speed", value: "topSpeed" },
    { label: "Acceleration", value: "acceleration" },
  ];

  const classOptions = useMemo(
    () => [
      { label: "All Classes", value: "all" },
      ...Array.from(new Set(vehicles.map((vehicle) => vehicle.class))).map(
        (vehicleClass) => ({
          label: vehicleClass,
          value: vehicleClass,
        })
      ),
    ],
    []
  );

  const manufacturerOptions = useMemo(
    () => [
      { label: "All Manufacturers", value: "all" },
      ...Array.from(
        new Set(vehicles.map((vehicle) => vehicle.manufacturer))
      ).map((manufacturer) => ({
        label: manufacturer,
        value: manufacturer,
      })),
    ],
    []
  );

  const drivetrainOptions = useMemo(
    () => [
      { label: "All Drivetrains", value: "all" },
      ...Array.from(new Set(vehicles.map((vehicle) => vehicle.drivetrain))).map(
        (drivetrain) => ({
          label: drivetrain,
          value: drivetrain,
        })
      ),
    ],
    []
  );

  const seatOptions = useMemo(
    () => [
      { label: "All Seats", value: "all" },
      ...Array.from(new Set(vehicles.map((vehicle) => vehicle.seats)))
        .sort((a, b) => a - b)
        .map((seats) => ({
          label: `${seats} seats`,
          value: String(seats),
        })),
    ],
    []
  );

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((vehicle) => {
        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
          query.length === 0 ||
          vehicle.name.toLowerCase().includes(query) ||
          vehicle.manufacturer.toLowerCase().includes(query) ||
          vehicle.class.toLowerCase().includes(query) ||
          vehicle.location.toLowerCase().includes(query) ||
          vehicle.tags?.some((tag) => tag.toLowerCase().includes(query));

        const matchesClass =
          selectedClass === "all" || vehicle.class === selectedClass;

        const matchesManufacturer =
          selectedManufacturer === "all" ||
          vehicle.manufacturer === selectedManufacturer;

        const matchesDrivetrain =
          selectedDrivetrain === "all" ||
          vehicle.drivetrain === selectedDrivetrain;

        const matchesSeats =
          selectedSeats === "all" || String(vehicle.seats) === selectedSeats;

        const matchesFeatured = !featuredOnly || vehicle.featured;

        return (
          matchesSearch &&
          matchesClass &&
          matchesManufacturer &&
          matchesDrivetrain &&
          matchesSeats &&
          matchesFeatured
        );
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "topSpeed") return b.topSpeed - a.topSpeed;
        if (sortBy === "acceleration") return b.acceleration - a.acceleration;

        return a.name.localeCompare(b.name);
      });
  }, [
    searchQuery,
    sortBy,
    selectedClass,
    selectedManufacturer,
    selectedDrivetrain,
    selectedSeats,
    featuredOnly,
  ]);

  const fastestVehicle = filteredVehicles.reduce(
    (fastest, vehicle) =>
      !fastest || vehicle.topSpeed > fastest.topSpeed ? vehicle : fastest,
    null as (typeof vehicles)[number] | null
  );

  const cheapestVehicle = filteredVehicles.reduce(
    (cheapest, vehicle) =>
      !cheapest || vehicle.price < cheapest.price ? vehicle : cheapest,
    null as (typeof vehicles)[number] | null
  );

  const featuredCount = filteredVehicles.filter(
    (vehicle) => vehicle.featured
  ).length;

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedClass !== "all" ||
    selectedManufacturer !== "all" ||
    selectedDrivetrain !== "all" ||
    selectedSeats !== "all" ||
    featuredOnly;

  function clearFilters() {
    setSearchQuery("");
    setSelectedClass("all");
    setSelectedManufacturer("all");
    setSelectedDrivetrain("all");
    setSelectedSeats("all");
    setFeaturedOnly(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Garage"
          title="Vehicles"
          description="Browse, filter, compare, and discover every vehicle in Atlas."
        />

        <DiscoveryToolbar
          title="Vehicle Browser"
          count={filteredVehicles.length}
        />

        <DiscoveryPanel>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="🔍 Search vehicles, manufacturers, tags..."
          />

          <FilterDropdown
            label="Class"
            value={selectedClass}
            options={classOptions}
            onChange={setSelectedClass}
          />

          <FilterDropdown
            label="Manufacturer"
            value={selectedManufacturer}
            options={manufacturerOptions}
            onChange={setSelectedManufacturer}
          />

          <FilterDropdown
            label="Drivetrain"
            value={selectedDrivetrain}
            options={drivetrainOptions}
            onChange={setSelectedDrivetrain}
          />

          <FilterDropdown
            label="Seats"
            value={selectedSeats}
            options={seatOptions}
            onChange={setSelectedSeats}
          />

          <SortDropdown
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
          />

          <button
            type="button"
            onClick={() => setFeaturedOnly((current) => !current)}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
              featuredOnly
                ? "bg-emerald-500 text-zinc-950"
                : "border border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-emerald-400"
            }`}
          >
            ⭐ Featured
          </button>
        </DiscoveryPanel>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Fastest Match</p>
            <p className="mt-2 text-xl font-black">
              {fastestVehicle?.name ?? "None"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Best Budget Match</p>
            <p className="mt-2 text-xl font-black">
              {cheapestVehicle?.name ?? "None"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Featured Matches</p>
            <p className="mt-2 text-xl font-black">{featuredCount}</p>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-zinc-400">
              Active filters:
            </span>

            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                Search: {searchQuery} ×
              </button>
            )}

            {selectedClass !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedClass("all")}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                {selectedClass} ×
              </button>
            )}

            {selectedManufacturer !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedManufacturer("all")}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                {selectedManufacturer} ×
              </button>
            )}

            {selectedDrivetrain !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedDrivetrain("all")}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                {selectedDrivetrain} ×
              </button>
            )}

            {selectedSeats !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedSeats("all")}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                {selectedSeats} seats ×
              </button>
            )}

            {featuredOnly && (
              <button
                type="button"
                onClick={() => setFeaturedOnly(false)}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                Featured ×
              </button>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-zinc-950"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="mt-12">
          {filteredVehicles.length === 0 ? (
            <EmptyState
              icon="🚗"
              title="No vehicles match your filters"
              description="Try clearing filters or searching another manufacturer, class, or tag."
              buttonText="Clear Filters"
              onButtonClick={clearFilters}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}