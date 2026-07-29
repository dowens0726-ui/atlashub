"use client";

import { useMemo, useState } from "react";

import VehicleCard from "@/app/components/VehicleCard";
import SearchBar from "@/app/components/SearchBar";
import {
  FilterDropdown,
  SortDropdown,
} from "@/app/components/discovery";
import EmptyState from "@/app/components/ui/EmptyState";
import {
  AtlasWorkspace,
  AtlasWorkspaceHeader,
  AtlasWorkspaceInspector,
  AtlasWorkspaceMetrics,
  AtlasWorkspaceStatus,
  AtlasWorkspaceToolbar,
} from "@/app/components/workspace";

import { vehicles } from "@/app/data";

const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Price", value: "price" },
  { label: "Top Speed", value: "topSpeed" },
  { label: "Acceleration", value: "acceleration" },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function VehicleWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedDrivetrain, setSelectedDrivetrain] = useState("all");
  const [selectedSeats, setSelectedSeats] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const classOptions = useMemo(
    () => [
      { label: "All Classes", value: "all" },
      ...Array.from(
        new Set(vehicles.map((vehicle) => vehicle.class))
      )
        .sort((a, b) => a.localeCompare(b))
        .map((vehicleClass) => ({
          label: vehicleClass,
          value: vehicleClass,
        })),
    ],
    []
  );

  const manufacturerOptions = useMemo(
    () => [
      { label: "All Manufacturers", value: "all" },
      ...Array.from(
        new Set(
          vehicles.map((vehicle) => vehicle.manufacturer)
        )
      )
        .sort((a, b) => a.localeCompare(b))
        .map((manufacturer) => ({
          label: manufacturer,
          value: manufacturer,
        })),
    ],
    []
  );

  const drivetrainOptions = useMemo(
    () => [
      { label: "All Drivetrains", value: "all" },
      ...Array.from(
        new Set(
          vehicles.map((vehicle) => vehicle.drivetrain)
        )
      )
        .sort((a, b) => a.localeCompare(b))
        .map((drivetrain) => ({
          label: drivetrain,
          value: drivetrain,
        })),
    ],
    []
  );

  const seatOptions = useMemo(
    () => [
      { label: "All Seats", value: "all" },
      ...Array.from(
        new Set(vehicles.map((vehicle) => vehicle.seats))
      )
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
          vehicle.tags?.some((tag) =>
            tag.toLowerCase().includes(query)
          );

        const matchesClass =
          selectedClass === "all" ||
          vehicle.class === selectedClass;

        const matchesManufacturer =
          selectedManufacturer === "all" ||
          vehicle.manufacturer === selectedManufacturer;

        const matchesDrivetrain =
          selectedDrivetrain === "all" ||
          vehicle.drivetrain === selectedDrivetrain;

        const matchesSeats =
          selectedSeats === "all" ||
          String(vehicle.seats) === selectedSeats;

        const matchesFeatured =
          !featuredOnly || vehicle.featured;

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
        if (sortBy === "price") {
          return a.price - b.price;
        }

        if (sortBy === "topSpeed") {
          return b.topSpeed - a.topSpeed;
        }

        if (sortBy === "acceleration") {
          return b.acceleration - a.acceleration;
        }

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
      !fastest || vehicle.topSpeed > fastest.topSpeed
        ? vehicle
        : fastest,
    null as (typeof vehicles)[number] | null
  );

  const cheapestVehicle = filteredVehicles.reduce(
    (cheapest, vehicle) =>
      !cheapest || vehicle.price < cheapest.price
        ? vehicle
        : cheapest,
    null as (typeof vehicles)[number] | null
  );

  const featuredCount = filteredVehicles.filter(
    (vehicle) => vehicle.featured
  ).length;

  const totalFeaturedCount = vehicles.filter(
    (vehicle) => vehicle.featured
  ).length;

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedClass !== "all" ||
    selectedManufacturer !== "all" ||
    selectedDrivetrain !== "all" ||
    selectedSeats !== "all" ||
    featuredOnly;

  const activeFilterCount = [
    searchQuery.trim().length > 0,
    selectedClass !== "all",
    selectedManufacturer !== "all",
    selectedDrivetrain !== "all",
    selectedSeats !== "all",
    featuredOnly,
  ].filter(Boolean).length;

  function clearFilters() {
    setSearchQuery("");
    setSelectedClass("all");
    setSelectedManufacturer("all");
    setSelectedDrivetrain("all");
    setSelectedSeats("all");
    setFeaturedOnly(false);
  }

  const header = (
    <AtlasWorkspaceHeader
      eyebrow="Atlas Garage"
      title="Vehicle Intelligence"
      description="Browse the complete vehicle database, compare performance, discover priority targets, and build a stronger garage."
      icon={
        <span
          aria-hidden="true"
          className="text-lg font-black"
        >
          V
        </span>
      }
      metadata={
        <>
          <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1 text-xs font-semibold text-cyan-200">
            {vehicles.length} indexed vehicles
          </span>

          <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-xs font-semibold text-emerald-200">
            Atlas data online
          </span>
        </>
      }
      actions={
        hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-white"
          >
            Reset workspace
          </button>
        ) : null
      }
    />
  );

  const metrics = (
    <AtlasWorkspaceMetrics
      columns={4}
      items={[
        {
          id: "total-vehicles",
          label: "Total Vehicles",
          value: vehicles.length,
          detail: "Complete Atlas vehicle index",
          emphasis: "primary",
        },
        {
          id: "visible-vehicles",
          label: "Current Matches",
          value: filteredVehicles.length,
          detail: hasActiveFilters
            ? `${activeFilterCount} active filters`
            : "Showing complete database",
          emphasis: "positive",
        },
        {
          id: "featured-vehicles",
          label: "Featured Matches",
          value: featuredCount,
          detail: `${totalFeaturedCount} featured overall`,
        },
        {
          id: "manufacturers",
          label: "Manufacturers",
          value: manufacturerOptions.length - 1,
          detail: "Indexed vehicle brands",
        },
      ]}
    />
  );

  const toolbar = (
    <AtlasWorkspaceToolbar
      search={
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search vehicles, manufacturers, classes, locations, or tags..."
        />
      }
      trailing={
        <div className="grid w-full gap-3 sm:grid-cols-2 xl:flex xl:w-auto xl:flex-wrap xl:items-end">
          <div className="min-w-[150px]">
            <FilterDropdown
              label="Class"
              value={selectedClass}
              options={classOptions}
              onChange={setSelectedClass}
            />
          </div>

          <div className="min-w-[180px]">
            <FilterDropdown
              label="Manufacturer"
              value={selectedManufacturer}
              options={manufacturerOptions}
              onChange={setSelectedManufacturer}
            />
          </div>

          <div className="min-w-[150px]">
            <FilterDropdown
              label="Drivetrain"
              value={selectedDrivetrain}
              options={drivetrainOptions}
              onChange={setSelectedDrivetrain}
            />
          </div>

          <div className="min-w-[130px]">
            <FilterDropdown
              label="Seats"
              value={selectedSeats}
              options={seatOptions}
              onChange={setSelectedSeats}
            />
          </div>

          <div className="min-w-[150px]">
            <SortDropdown
              value={sortBy}
              options={sortOptions}
              onChange={setSortBy}
            />
          </div>

          <button
            type="button"
            aria-pressed={featuredOnly}
            onClick={() =>
              setFeaturedOnly((current) => !current)
            }
            className={`min-h-[46px] self-end rounded-xl border px-4 py-3 text-sm font-bold transition ${
              featuredOnly
                ? "border-emerald-300/40 bg-emerald-400 text-slate-950"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.07] hover:text-white"
            }`}
          >
            Featured only
          </button>
        </div>
      }
    />
  );

  const inspector = (
    <AtlasWorkspaceInspector
      eyebrow="Garage Analysis"
      title="Atlas Vehicle Scanner"
      description="Real-time analysis of the vehicles currently visible in your workspace."
      status={filteredVehicles.length > 0 ? "success" : "warning"}
      footer={
        <p className="text-xs leading-5 text-slate-500">
          Advanced purchase priority, mission fit, and upgrade-path intelligence will connect here in the next phase.
        </p>
      }
    >
      <div className="space-y-3">
        <InspectorRow
          label="Fastest match"
          value={fastestVehicle?.name ?? "No match"}
          detail={
            fastestVehicle
              ? `${fastestVehicle.topSpeed} mph`
              : "Adjust your filters"
          }
        />

        <InspectorRow
          label="Best budget match"
          value={cheapestVehicle?.name ?? "No match"}
          detail={
            cheapestVehicle
              ? formatCurrency(cheapestVehicle.price)
              : "Adjust your filters"
          }
        />

        <InspectorRow
          label="Featured matches"
          value={featuredCount.toString()}
          detail={`${filteredVehicles.length} vehicles visible`}
        />

        <InspectorRow
          label="Filter state"
          value={
            hasActiveFilters
              ? `${activeFilterCount} active`
              : "Open search"
          }
          detail={
            hasActiveFilters
              ? "Results are currently refined"
              : "No filters applied"
          }
        />

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-2 w-full rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-3 text-sm font-bold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/[0.12]"
          >
            Clear all filters
          </button>
        ) : null}
      </div>
    </AtlasWorkspaceInspector>
  );

  const status = (
    <AtlasWorkspaceStatus
      items={[
        {
          id: "dataset",
          label: "Dataset",
          value: `${vehicles.length} vehicles`,
          indicator: "success",
        },
        {
          id: "results",
          label: "Visible",
          value: filteredVehicles.length,
          indicator:
            filteredVehicles.length > 0
              ? "active"
              : "warning",
        },
        {
          id: "filters",
          label: "Filters",
          value:
            activeFilterCount > 0
              ? `${activeFilterCount} active`
              : "None",
          indicator:
            activeFilterCount > 0
              ? "active"
              : "neutral",
        },
      ]}
      trailing="Atlas Garage Workspace"
    />
  );

  return (
    <AtlasWorkspace
      width="full"
      inspectorWidth="standard"
      header={header}
      metrics={metrics}
      toolbar={toolbar}
      inspector={inspector}
      status={status}
      mainClassName="min-w-0"
    >
      <section aria-label="Vehicle results">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/70">
              Vehicle Browser
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
              {filteredVehicles.length} matching vehicles
            </h2>
          </div>

          <p className="text-sm text-slate-400">
            Sorted by{" "}
            <span className="font-semibold text-slate-200">
              {
                sortOptions.find(
                  (option) => option.value === sortBy
                )?.label
              }
            </span>
          </p>
        </div>

        {filteredVehicles.length === 0 ? (
          <EmptyState
            icon="V"
            title="No vehicles match your filters"
            description="Try clearing filters or searching for another manufacturer, class, location, or tag."
            buttonText="Clear Filters"
            onButtonClick={clearFilters}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.slug}
                vehicle={vehicle}
              />
            ))}
          </div>
        )}
      </section>
    </AtlasWorkspace>
  );
}

function InspectorRow({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 truncate text-base font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {detail}
      </p>
    </div>
  );
}
