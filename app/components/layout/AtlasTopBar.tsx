"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import AtlasSearchDialog from "@/app/components/search/AtlasSearchDialog";

import AtlasUserMenu from "./AtlasUserMenu";


type AtlasRouteContext = {
  eyebrow: string;
  title: string;
  description: string;
};


const routeContexts:
  Record<
    string,
    AtlasRouteContext
  > = {
    "/dashboard": {
      eyebrow:
        "Executive command",

      title:
        "Empire Command Center",

      description:
        "Live intelligence, strategy, and operating control.",
    },

    "/copilot": {
      eyebrow:
        "Atlas intelligence",

      title:
        "AI Copilot",

      description:
        "Strategic guidance powered by your active empire context.",
    },

    "/profile": {
      eyebrow:
        "Player identity",

      title:
        "Operator Profile",

      description:
        "Identity, progression, preferences, and strategic behavior.",
    },

    "/planner": {
      eyebrow:
        "Mission operations",

      title:
        "Session Planner",

      description:
        "Objectives, priorities, and the next optimized play session.",
    },

    "/advisor": {
      eyebrow:
        "Decision support",

      title:
        "Atlas Advisor",

      description:
        "Recommendations, reasoning, and strategic tradeoffs.",
    },

    "/data/businesses": {
      eyebrow:
        "Empire intelligence",

      title:
        "Business Operations",

      description:
        "Expansion opportunities, ownership data, and ROI intelligence.",
    },

    "/vehicles": {
      eyebrow:
        "Asset intelligence",

      title:
        "Vehicle Command",

      description:
        "Performance, utility, ownership, and mission-readiness analysis.",
    },

    "/properties": {
      eyebrow:
        "Portfolio intelligence",

      title:
        "Property Network",

      description:
        "Ownership, utility, location, and expansion planning.",
    },

    "/weapons": {
      eyebrow:
        "Loadout intelligence",

      title:
        "Weapons Systems",

      description:
        "Combat utility, performance, and mission-specific loadouts.",
    },

    "/missions": {
      eyebrow:
        "Operations intelligence",

      title:
        "Mission Network",

      description:
        "Mission discovery, preparation, rewards, and strategic fit.",
    },

    "/explorer": {
      eyebrow:
        "World intelligence",

      title:
        "Atlas Explorer",

      description:
        "Connected discovery across the Atlas world model.",
    },

    "/map": {
      eyebrow:
        "World intelligence",

      title:
        "Tactical Map",

      description:
        "Locations, activities, assets, and operational context.",
    },

    "/rankings": {
      eyebrow:
        "Performance intelligence",

      title:
        "Atlas Rankings",

      description:
        "Comparative performance and strategic category leaders.",
    },

    "/compare": {
      eyebrow:
        "Decision analysis",

      title:
        "Asset Comparison",

      description:
        "Direct strategic comparison across available assets.",
    },

    "/garage-builder": {
      eyebrow:
        "Vehicle operations",

      title:
        "Garage Builder",

      description:
        "Build and optimize a mission-ready vehicle collection.",
    },
  };


function resolveRouteContext(
  pathname:
    string
): AtlasRouteContext {
  const matchingRoute =
    Object.keys(
      routeContexts
    )
      .sort(
        (
          firstRoute,
          secondRoute
        ) =>
          secondRoute.length -
          firstRoute.length
      )
      .find(
        (route) =>
          pathname === route ||
          pathname.startsWith(
            `${route}/`
          )
      );

  if (
    matchingRoute
  ) {
    return routeContexts[
      matchingRoute
    ];
  }

  return {
    eyebrow:
      "Atlas operating system",

    title:
      "Command Interface",

    description:
      "Connected intelligence across your complete Atlas environment.",
  };
}


function formatSessionTime(
  elapsedSeconds:
    number
): string {
  const hours =
    Math.floor(
      elapsedSeconds / 3600
    );

  const minutes =
    Math.floor(
      (
        elapsedSeconds %
        3600
      ) / 60
    );

  const seconds =
    elapsedSeconds % 60;

  return [
    hours,
    minutes,
    seconds,
  ]
    .map(
      (value) =>
        String(
          value
        ).padStart(
          2,
          "0"
        )
    )
    .join(":");
}


export default function AtlasTopBar() {
  const pathname =
    usePathname();

  const [
    searchOpen,
    setSearchOpen,
  ] =
    useState(
      false
    );

  const [
    sessionSeconds,
    setSessionSeconds,
  ] =
    useState(
      0
    );


  const routeContext =
    useMemo(
      () =>
        resolveRouteContext(
          pathname
        ),
      [
        pathname,
      ]
    );


  useEffect(
    () => {
      const interval =
        window.setInterval(
          () => {
            setSessionSeconds(
              (
                currentSeconds
              ) =>
                currentSeconds +
                1
            );
          },
          1000
        );

      return () => {
        window.clearInterval(
          interval
        );
      };
    },
    []
  );


  useEffect(
    () => {
      function handleKeyDown(
        event:
          KeyboardEvent
      ) {
        if (
          (
            event.ctrlKey ||
            event.metaKey
          ) &&
          event.key.toLowerCase() ===
            "k"
        ) {
          event.preventDefault();

          setSearchOpen(
            true
          );
        }
      }

      window.addEventListener(
        "keydown",
        handleKeyDown
      );

      return () => {
        window.removeEventListener(
          "keydown",
          handleKeyDown
        );
      };
    },
    []
  );


  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#030712]/88 backdrop-blur-2xl">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(168,85,247,0.07),transparent_26%)]"
          />

          <div className="relative flex min-h-[5.75rem] items-center gap-4 px-4 py-3 sm:px-5 lg:px-6 xl:px-8">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-30" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
                </span>

                <p className="truncate text-[0.58rem] font-black uppercase tracking-[0.27em] text-cyan-100/58">
                  {routeContext.eyebrow}
                </p>

                <span className="hidden h-px w-8 bg-gradient-to-r from-cyan-300/30 to-transparent sm:block" />

                <span className="hidden text-[0.52rem] font-black uppercase tracking-[0.18em] text-white/25 md:inline">
                  Atlas OS
                </span>
              </div>

              <div className="mt-1.5 flex min-w-0 items-end gap-3">
                <h1 className="truncate text-lg font-black tracking-[-0.025em] text-white sm:text-xl xl:text-[1.35rem]">
                  {routeContext.title}
                </h1>

                <p className="hidden truncate pb-0.5 text-[0.68rem] text-white/34 2xl:block">
                  {routeContext.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Open Atlas command search"
              onClick={() =>
                setSearchOpen(
                  true
                )
              }
              className={[
                "group hidden h-11 min-w-0 items-center gap-3 rounded-2xl",
                "border border-white/[0.09] bg-white/[0.035] px-3.5",
                "text-left transition-all duration-200 md:flex md:w-56 xl:w-72",
                "hover:border-cyan-300/20 hover:bg-cyan-300/[0.055]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="text-sm text-cyan-200/60 transition-colors group-hover:text-cyan-200"
              >
                ⌕
              </span>

              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-white/40 group-hover:text-white/58">
                Search or issue a command
              </span>

              <span className="rounded-md border border-white/[0.08] bg-black/20 px-1.5 py-1 text-[0.48rem] font-black uppercase tracking-[0.08em] text-white/28">
                Ctrl K
              </span>
            </button>

            <div className="hidden items-center gap-2 xl:flex">
              <div className="flex h-11 items-center gap-2.5 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.04] px-3.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-30" />

                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                </span>

                <span>
                  <span className="block text-[0.48rem] font-black uppercase tracking-[0.17em] text-white/25">
                    Atlas Core
                  </span>

                  <span className="mt-0.5 block text-[0.58rem] font-bold uppercase tracking-[0.11em] text-emerald-200/72">
                    Online
                  </span>
                </span>
              </div>

              <div className="flex h-11 items-center gap-2.5 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] px-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.72)]" />

                <span>
                  <span className="block text-[0.48rem] font-black uppercase tracking-[0.17em] text-white/25">
                    World Sync
                  </span>

                  <span className="mt-0.5 block text-[0.58rem] font-bold uppercase tracking-[0.11em] text-cyan-100/68">
                    Synchronized
                  </span>
                </span>
              </div>

              <div className="flex h-11 items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.62)]" />

                <span>
                  <span className="block text-[0.48rem] font-black uppercase tracking-[0.17em] text-white/25">
                    Session
                  </span>

                  <span className="mt-0.5 block font-mono text-[0.62rem] font-bold tracking-[0.08em] text-white/66">
                    {formatSessionTime(
                      sessionSeconds
                    )}
                  </span>
                </span>
              </div>
            </div>

            <Link
              href="/copilot"
              aria-label="Open Atlas Copilot"
              className={[
                "hidden h-11 items-center gap-2 rounded-2xl",
                "border border-violet-300/15 bg-violet-300/[0.055] px-3.5",
                "text-xs font-black uppercase tracking-[0.12em] text-violet-100/78",
                "transition-all duration-200 sm:flex",
                "hover:border-violet-300/28 hover:bg-violet-300/[0.1] hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="text-violet-200"
              >
                ✦
              </span>

              <span className="hidden 2xl:inline">
                Copilot
              </span>
            </Link>

            <button
              type="button"
              aria-label="Open Atlas command search"
              onClick={() =>
                setSearchOpen(
                  true
                )
              }
              className={[
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl md:hidden",
                "border border-cyan-300/15 bg-cyan-300/[0.055]",
                "text-lg text-cyan-100/72 transition-all duration-200",
                "hover:border-cyan-300/30 hover:bg-cyan-300/[0.1] hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
              ].join(" ")}
            >
              ⌕
            </button>

            <AtlasUserMenu />
          </div>

          <div className="relative flex min-h-8 items-center overflow-x-auto border-t border-white/[0.045] bg-black/15 px-4 sm:px-5 lg:px-6 xl:px-8">
            <div className="flex min-w-max items-center gap-5 py-2">
              <StatusSignal
                label="Neural network"
                value="Stable"
                tone="positive"
              />

              <StatusSignal
                label="Economy pulse"
                value="Monitoring"
                tone="accent"
              />

              <StatusSignal
                label="Intelligence"
                value="Live"
                tone="positive"
              />

              <StatusSignal
                label="Command channel"
                value="Secure"
                tone="accent"
              />

              <StatusSignal
                label="Active route"
                value={routeContext.title}
                tone="default"
              />
            </div>
          </div>
        </div>
      </header>

      <AtlasSearchDialog
        open={
          searchOpen
        }
        onClose={() =>
          setSearchOpen(
            false
          )
        }
      />
    </>
  );
}


type StatusSignalProps = {
  label:
    string;

  value:
    string;

  tone:
    | "default"
    | "accent"
    | "positive";
};


function StatusSignal({
  label,
  value,
  tone,
}: StatusSignalProps) {
  const toneClasses:
    Record<
      StatusSignalProps["tone"],
      string
    > = {
      default:
        "bg-white/30",

      accent:
        "bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.65)]",

      positive:
        "bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.65)]",
    };

  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className={[
          "h-1 w-1 shrink-0 rounded-full",
          toneClasses[
            tone
          ],
        ].join(" ")}
      />

      <span className="text-[0.49rem] font-black uppercase tracking-[0.15em] text-white/24">
        {label}
      </span>

      <span className="max-w-44 truncate text-[0.52rem] font-bold uppercase tracking-[0.11em] text-white/52">
        {value}
      </span>
    </div>
  );
}