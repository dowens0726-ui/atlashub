"use client";

import {
  useMemo,
} from "react";

import {
  useAtlasWorldContext,
} from "@/app/hooks/useAtlasWorldContext";

import WorldStatusMetric from "./WorldStatusMetric";


function formatWorldLabel(
  value: string
): string {
  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}


export default function AtlasWorldStatus() {
  const {
    worldContext,
    hydrated,
  } =
    useAtlasWorldContext();


  const metrics =
    useMemo(
      () => {
        if (
          !worldContext
        ) {
          return [];
        }

        return [
          {
            label:
              "Economy",

            value:
              formatWorldLabel(
                worldContext.economy
              ),

            icon:
              "↗",
          },

          {
            label:
              "Heat",

            value:
              formatWorldLabel(
                worldContext.heat
              ),

            icon:
              "◉",
          },

          {
            label:
              "Operating Status",

            value:
              formatWorldLabel(
                worldContext.operatingStatus
              ),

            icon:
              "◆",
          },

          {
            label:
              "Confidence",

            value:
              `${worldContext.confidence}%`,

            icon:
              "◎",
          },

          {
            label:
              "Empire Score",

            value:
              `${worldContext.empireScore}`,

            icon:
              "▲",
          },
        ];
      },
      [
        worldContext,
      ]
    );


  if (
    !hydrated ||
    !worldContext
  ) {
    return (
      <section
        aria-busy="true"
        aria-label="Atlas World Status"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

        <div className="animate-pulse space-y-5">
          <div className="h-4 w-44 rounded-full bg-white/10" />

          <div className="h-16 rounded-2xl bg-white/5" />

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {Array.from({
              length:
                5,
            }).map(
              (
                _,
                index
              ) => (
                <div
                  className="h-16 rounded-xl bg-white/5"
                  key={index}
                />
              )
            )}
          </div>
        </div>
      </section>
    );
  }


  return (
    <section
      aria-label="Atlas World Status"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6"
      data-economy={
        worldContext.economy
      }
      data-heat={
        worldContext.heat
      }
      data-operating-status={
        worldContext.operatingStatus
      }
      data-time-of-day={
        worldContext.timeOfDay
      }
      data-weather={
        worldContext.weather
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.09),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

      <div className="relative space-y-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-cyan-200/70">
              Atlas Live World
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Operational world status
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Live environmental and strategic conditions derived from your current empire profile.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1.5 text-xs font-medium text-cyan-100/80">
              {formatWorldLabel(
                worldContext.timeOfDay
              )}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
              {formatWorldLabel(
                worldContext.weather
              )}
            </span>
          </div>
        </header>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/15 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/40">
              Active District
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {worldContext.district.name}
            </p>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-white/50">
              {worldContext.district.description}
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-violet-300/15 bg-violet-300/5 px-4 py-3 text-left sm:text-right">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-violet-200/55">
              Recommended Destination
            </p>

            <p className="mt-1 text-sm font-semibold text-violet-100">
              {
                worldContext
                  .recommendedDestination
                  .label
              }
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {metrics.map(
            (metric) => (
              <WorldStatusMetric
                icon={
                  metric.icon
                }
                key={
                  metric.label
                }
                label={
                  metric.label
                }
                value={
                  metric.value
                }
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
