"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";

import SearchBar from "@/app/components/SearchBar";
import VehicleCard from "@/app/components/VehicleCard";

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

import {
  vehicles,
} from "@/app/data";

import useGarage from "@/app/hooks/useGarage";

import {
  buildGarageCopilotReport,
} from "@/app/intelligence";

import {
  buildGarageIntelligence,
} from "@/app/intelligence/vehicle";

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
    label: "Top Speed",
    value: "topSpeed",
  },
  {
    label: "Acceleration",
    value: "acceleration",
  },
];

function getGarageHealthStatus(
  garageScore: number
): "idle" | "active" | "success" | "warning" {
  if (
    garageScore >=
    70
  ) {
    return "success";
  }

  if (
    garageScore >=
    45
  ) {
    return "active";
  }

  return "warning";
}

export default function VehicleWorkspace() {
  const [
    searchQuery,
    setSearchQuery,
  ] =
    useState("");

  const [
    sortBy,
    setSortBy,
  ] =
    useState("name");

  const [
    selectedClass,
    setSelectedClass,
  ] =
    useState("all");

  const [
    selectedManufacturer,
    setSelectedManufacturer,
  ] =
    useState("all");

  const [
    selectedDrivetrain,
    setSelectedDrivetrain,
  ] =
    useState("all");

  const [
    selectedSeats,
    setSelectedSeats,
  ] =
    useState("all");

  const [
    featuredOnly,
    setFeaturedOnly,
  ] =
    useState(false);

  const {
    ownedVehicles,
    vehicleCount,
    isHydrated,
  } =
    useGarage(
      vehicles
    );

  const garageAnalysis =
    useMemo(
      () =>
        buildGarageIntelligence(
          ownedVehicles,
          vehicles
        ),
      [
        ownedVehicles,
      ]
    );

  const garageReport =
    useMemo(
      () =>
        buildGarageCopilotReport(
          garageAnalysis
        ),
      [
        garageAnalysis,
      ]
    );

  const classOptions =
    useMemo(
      () => [
        {
          label:
            "All Classes",
          value:
            "all",
        },
        ...Array.from(
          new Set(
            vehicles.map(
              (vehicle) =>
                vehicle.class
            )
          )
        )
          .sort(
            (
              first,
              second
            ) =>
              first.localeCompare(
                second
              )
          )
          .map(
            (
              vehicleClass
            ) => ({
              label:
                vehicleClass,
              value:
                vehicleClass,
            })
          ),
      ],
      []
    );

  const manufacturerOptions =
    useMemo(
      () => [
        {
          label:
            "All Manufacturers",
          value:
            "all",
        },
        ...Array.from(
          new Set(
            vehicles.map(
              (vehicle) =>
                vehicle.manufacturer
            )
          )
        )
          .sort(
            (
              first,
              second
            ) =>
              first.localeCompare(
                second
              )
          )
          .map(
            (
              manufacturer
            ) => ({
              label:
                manufacturer,
              value:
                manufacturer,
            })
          ),
      ],
      []
    );

  const drivetrainOptions =
    useMemo(
      () => [
        {
          label:
            "All Drivetrains",
          value:
            "all",
        },
        ...Array.from(
          new Set(
            vehicles.map(
              (vehicle) =>
                vehicle.drivetrain
            )
          )
        )
          .sort(
            (
              first,
              second
            ) =>
              first.localeCompare(
                second
              )
          )
          .map(
            (
              drivetrain
            ) => ({
              label:
                drivetrain,
              value:
                drivetrain,
            })
          ),
      ],
      []
    );

  const seatOptions =
    useMemo(
      () => [
        {
          label:
            "All Seats",
          value:
            "all",
        },
        ...Array.from(
          new Set(
            vehicles.map(
              (vehicle) =>
                vehicle.seats
            )
          )
        )
          .sort(
            (
              first,
              second
            ) =>
              first -
              second
          )
          .map(
            (
              seats
            ) => ({
              label:
                `${seats} seats`,
              value:
                String(
                  seats
                ),
            })
          ),
      ],
      []
    );

  const filteredVehicles =
    useMemo(
      () => {
        return vehicles
          .filter(
            (
              vehicle
            ) => {
              const query =
                searchQuery
                  .trim()
                  .toLowerCase();

              const matchesSearch =
                query.length ===
                  0 ||
                vehicle.name
                  .toLowerCase()
                  .includes(
                    query
                  ) ||
                vehicle.manufacturer
                  .toLowerCase()
                  .includes(
                    query
                  ) ||
                vehicle.class
                  .toLowerCase()
                  .includes(
                    query
                  ) ||
                vehicle.location
                  .toLowerCase()
                  .includes(
                    query
                  ) ||
                vehicle.tags?.some(
                  (
                    tag
                  ) =>
                    tag
                      .toLowerCase()
                      .includes(
                        query
                      )
                );

              const matchesClass =
                selectedClass ===
                  "all" ||
                vehicle.class ===
                  selectedClass;

              const matchesManufacturer =
                selectedManufacturer ===
                  "all" ||
                vehicle.manufacturer ===
                  selectedManufacturer;

              const matchesDrivetrain =
                selectedDrivetrain ===
                  "all" ||
                vehicle.drivetrain ===
                  selectedDrivetrain;

              const matchesSeats =
                selectedSeats ===
                  "all" ||
                String(
                  vehicle.seats
                ) ===
                  selectedSeats;

              const matchesFeatured =
                !featuredOnly ||
                vehicle.featured;

              return (
                matchesSearch &&
                matchesClass &&
                matchesManufacturer &&
                matchesDrivetrain &&
                matchesSeats &&
                matchesFeatured
              );
            }
          )
          .sort(
            (
              first,
              second
            ) => {
              if (
                sortBy ===
                "price"
              ) {
                return (
                  first.price -
                  second.price
                );
              }

              if (
                sortBy ===
                "topSpeed"
              ) {
                return (
                  second.topSpeed -
                  first.topSpeed
                );
              }

              if (
                sortBy ===
                "acceleration"
              ) {
                return (
                  second.acceleration -
                  first.acceleration
                );
              }

              return first.name.localeCompare(
                second.name
              );
            }
          );
      },
      [
        searchQuery,
        sortBy,
        selectedClass,
        selectedManufacturer,
        selectedDrivetrain,
        selectedSeats,
        featuredOnly,
      ]
    );

  const featuredCount =
    filteredVehicles.filter(
      (
        vehicle
      ) =>
        vehicle.featured
    ).length;

  const totalFeaturedCount =
    vehicles.filter(
      (
        vehicle
      ) =>
        vehicle.featured
    ).length;

  const hasActiveFilters =
    searchQuery.trim().length >
      0 ||
    selectedClass !==
      "all" ||
    selectedManufacturer !==
      "all" ||
    selectedDrivetrain !==
      "all" ||
    selectedSeats !==
      "all" ||
    featuredOnly;

  const activeFilterCount =
    [
      searchQuery.trim()
        .length >
        0,
      selectedClass !==
        "all",
      selectedManufacturer !==
        "all",
      selectedDrivetrain !==
        "all",
      selectedSeats !==
        "all",
      featuredOnly,
    ].filter(
      Boolean
    ).length;

  const recommendation =
    garageAnalysis.recommendation;

  const projectedRecommendation =
    garageAnalysis.projectedRecommendation;

  const recommendedVehicle =
    recommendation
      ?.recommendedVehicle ??
    null;

  const primaryGaps =
    recommendation?.gaps.slice(
      0,
      3
    ) ??
    garageAnalysis
      .missingCategories
      .slice(
        0,
        3
      );

  function clearFilters() {
    setSearchQuery(
      ""
    );

    setSelectedClass(
      "all"
    );

    setSelectedManufacturer(
      "all"
    );

    setSelectedDrivetrain(
      "all"
    );

    setSelectedSeats(
      "all"
    );

    setFeaturedOnly(
      false
    );
  }

  const header = (
    <AtlasWorkspaceHeader
      eyebrow="Atlas Garage"
      title="Vehicle Intelligence"
      description="Browse the complete vehicle database, analyze your owned vehicles, identify capability gaps, and discover the strongest next addition to your garage."
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
            {isHydrated
              ? `${vehicleCount} owned`
              : "Garage loading"}
          </span>

          <span className="rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3 py-1 text-xs font-semibold text-violet-200">
            Atlas intelligence online
          </span>
        </>
      }
      actions={
        hasActiveFilters ? (
          <button
            type="button"
            onClick={
              clearFilters
            }
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
          id:
            "owned-vehicles",
          label:
            "Owned Vehicles",
          value:
            isHydrated
              ? vehicleCount
              : "—",
          detail:
            isHydrated
              ? "Saved garage profile"
              : "Loading local garage",
          emphasis:
            "primary",
        },
        {
          id:
            "garage-score",
          label:
            "Garage Score",
          value:
            isHydrated
              ? `${garageAnalysis.garageScore}/100`
              : "—",
          detail:
            isHydrated
              ? garageReport.overallHealth
              : "Awaiting analysis",
          emphasis:
            garageAnalysis.garageScore >=
            70
              ? "positive"
              : garageAnalysis.garageScore <
                  45 &&
                isHydrated
                ? "warning"
                : "default",
        },
        {
          id:
            "visible-vehicles",
          label:
            "Current Matches",
          value:
            filteredVehicles.length,
          detail:
            hasActiveFilters
              ? `${activeFilterCount} active filters`
              : "Complete vehicle database",
          emphasis:
            "positive",
        },
        {
          id:
            "atlas-confidence",
          label:
            "Atlas Confidence",
          value:
            isHydrated
              ? `${garageReport.confidence}%`
              : "—",
          detail:
            vehicleCount >
            0
              ? "Garage recommendation reliability"
              : "Add owned vehicles to improve",
        },
      ]}
    />
  );

  const toolbar = (
    <AtlasWorkspaceToolbar
      search={
        <SearchBar
          value={
            searchQuery
          }
          onChange={
            setSearchQuery
          }
          placeholder="Search vehicles, manufacturers, classes, locations, or tags..."
        />
      }
      trailing={
        <div className="grid w-full gap-3 sm:grid-cols-2 xl:flex xl:w-auto xl:flex-wrap xl:items-end">
          <div className="min-w-[150px]">
            <FilterDropdown
              label="Class"
              value={
                selectedClass
              }
              options={
                classOptions
              }
              onChange={
                setSelectedClass
              }
            />
          </div>

          <div className="min-w-[180px]">
            <FilterDropdown
              label="Manufacturer"
              value={
                selectedManufacturer
              }
              options={
                manufacturerOptions
              }
              onChange={
                setSelectedManufacturer
              }
            />
          </div>

          <div className="min-w-[150px]">
            <FilterDropdown
              label="Drivetrain"
              value={
                selectedDrivetrain
              }
              options={
                drivetrainOptions
              }
              onChange={
                setSelectedDrivetrain
              }
            />
          </div>

          <div className="min-w-[130px]">
            <FilterDropdown
              label="Seats"
              value={
                selectedSeats
              }
              options={
                seatOptions
              }
              onChange={
                setSelectedSeats
              }
            />
          </div>

          <div className="min-w-[150px]">
            <SortDropdown
              value={
                sortBy
              }
              options={
                sortOptions
              }
              onChange={
                setSortBy
              }
            />
          </div>

          <button
            type="button"
            aria-pressed={
              featuredOnly
            }
            onClick={() =>
              setFeaturedOnly(
                (
                  current
                ) =>
                  !current
              )
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
      eyebrow="Garage Intelligence"
      title="Atlas Garage Advisor"
      description={
        isHydrated
          ? garageReport.summary
          : "Loading your saved garage profile and preparing the Atlas assessment."
      }
      status={
        !isHydrated
          ? "active"
          : getGarageHealthStatus(
              garageAnalysis.garageScore
            )
      }
      footer={
        <p className="text-xs leading-5 text-slate-500">
          Recommendations update automatically as your owned garage changes.
        </p>
      }
    >
      {!isHydrated ? (
        <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.05] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">
            Atlas Synchronization
          </p>

          <p className="mt-3 text-base font-semibold text-white">
            Loading garage profile...
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Atlas is retrieving your locally saved vehicles before running the garage analysis.
          </p>
        </div>
      ) : vehicleCount ===
        0 ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/80">
              Garage Profile Required
            </p>

            <h3 className="mt-3 text-lg font-semibold text-white">
              Add your owned vehicles
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Atlas needs your current garage to calculate capability coverage, identify strategic gaps, and recommend the best next purchase.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InspectorMetric
              label="Garage Score"
              value="Not evaluated"
              detail="No owned vehicles"
            />

            <InspectorMetric
              label="Confidence"
              value={`${garageReport.confidence}%`}
              detail="Baseline analysis"
            />
          </div>

          {recommendedVehicle ? (
            <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Starter Recommendation
              </p>

              <p className="mt-2 text-base font-semibold text-white">
                {recommendedVehicle.name}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                {recommendation?.reason}
              </p>

              <Link
                href={`/vehicles/${recommendedVehicle.slug}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] px-4 py-3 text-sm font-bold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/[0.14]"
              >
                View recommended vehicle
              </Link>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InspectorMetric
              label="Garage Health"
              value={
                garageReport.overallHealth
              }
              detail={`${vehicleCount} vehicles analyzed`}
            />

            <InspectorMetric
              label="Confidence"
              value={`${garageReport.confidence}%`}
              detail="Recommendation reliability"
            />

            <InspectorMetric
              label="Current Score"
              value={`${garageAnalysis.garageScore}/100`}
              detail="Overall garage strength"
            />

            <InspectorMetric
              label="Projected Score"
              value={
                projectedRecommendation
                  ? `${projectedRecommendation.projectedScore}/100`
                  : `${garageAnalysis.garageScore}/100`
              }
              detail={
                projectedRecommendation
                  ? `+${
                      projectedRecommendation.scoreIncrease
                    } expected`
                  : "No improvement calculated"
              }
            />
          </div>

          {recommendedVehicle ? (
            <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-[linear-gradient(145deg,rgba(8,47,73,0.42),rgba(15,23,42,0.68))] p-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_68%)]"
              />

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                  Recommended Next Purchase
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">
                  {recommendedVehicle.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-cyan-100/80">
                  {recommendedVehicle.manufacturer} · {recommendedVehicle.class}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {recommendation?.reason}
                </p>

                <Link
                  href={`/vehicles/${recommendedVehicle.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
                >
                  Open vehicle intelligence
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                Garage Complete
              </p>

              <p className="mt-3 text-base font-semibold text-white">
                No eligible recommendation remains.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Atlas has not identified another unowned vehicle to add from the current database.
              </p>
            </div>
          )}

          {primaryGaps.length >
          0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Priority Garage Gaps
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {primaryGaps.map(
                  (
                    gap
                  ) => (
                    <span
                      key={
                        gap
                      }
                      className="rounded-full border border-amber-400/15 bg-amber-400/[0.07] px-3 py-1.5 text-xs font-semibold text-amber-200"
                    >
                      {gap}
                    </span>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300/75">
                Capability Coverage
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Atlas has not detected a major missing garage category.
              </p>
            </div>
          )}

          {projectedRecommendation
            ?.improvements
            .length ? (
            <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Projected Improvements
              </p>

              <div className="mt-3 space-y-2">
                {projectedRecommendation.improvements
                  .slice(
                    0,
                    3
                  )
                  .map(
                    (
                      improvement
                    ) => (
                      <div
                        key={
                          improvement.key
                        }
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5"
                      >
                        <span className="text-xs font-medium text-slate-300">
                          {improvement.label}
                        </span>

                        <span className="text-xs font-bold text-emerald-300">
                          +{improvement.increase}
                        </span>
                      </div>
                    )
                  )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </AtlasWorkspaceInspector>
  );

  const status = (
    <AtlasWorkspaceStatus
      items={[
        {
          id:
            "garage-profile",
          label:
            "Garage",
          value:
            isHydrated
              ? `${vehicleCount} owned`
              : "Loading",
          indicator:
            isHydrated
              ? vehicleCount >
                0
                ? "success"
                : "warning"
              : "active",
        },
        {
          id:
            "atlas-analysis",
          label:
            "Atlas",
          value:
            isHydrated
              ? garageReport.overallHealth
              : "Analyzing",
          indicator:
            !isHydrated
              ? "active"
              : garageAnalysis.garageScore >=
                  70
                ? "success"
                : garageAnalysis.garageScore >=
                    45
                  ? "active"
                  : "warning",
        },
        {
          id:
            "results",
          label:
            "Visible",
          value:
            filteredVehicles.length,
          indicator:
            filteredVehicles.length >
            0
              ? "active"
              : "warning",
        },
        {
          id:
            "filters",
          label:
            "Filters",
          value:
            activeFilterCount >
            0
              ? `${activeFilterCount} active`
              : "None",
          indicator:
            activeFilterCount >
            0
              ? "active"
              : "neutral",
        },
      ]}
      trailing="Atlas Garage Intelligence Online"
    />
  );

  return (
    <AtlasWorkspace
      width="full"
      inspectorWidth="standard"
      header={
        header
      }
      metrics={
        metrics
      }
      toolbar={
        toolbar
      }
      inspector={
        inspector
      }
      status={
        status
      }
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

          <div className="flex flex-col gap-1 text-sm text-slate-400 sm:items-end">
            <p>
              Sorted by{" "}
              <span className="font-semibold text-slate-200">
                {
                  sortOptions.find(
                    (
                      option
                    ) =>
                      option.value ===
                      sortBy
                  )?.label
                }
              </span>
            </p>

            <p className="text-xs text-slate-500">
              {featuredCount} featured matches · {totalFeaturedCount} featured overall
            </p>
          </div>
        </div>

        {filteredVehicles.length ===
        0 ? (
          <EmptyState
            icon="V"
            title="No vehicles match your filters"
            description="Try clearing filters or searching for another manufacturer, class, location, or tag."
            buttonText="Clear Filters"
            onButtonClick={
              clearFilters
            }
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {filteredVehicles.map(
              (
                vehicle
              ) => (
                <VehicleCard
                  key={
                    vehicle.slug
                  }
                  vehicle={
                    vehicle
                  }
                />
              )
            )}
          </div>
        )}
      </section>
    </AtlasWorkspace>
  );
}

function InspectorMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value:
    string;
  detail:
    string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-base font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {detail}
      </p>
    </div>
  );
}
