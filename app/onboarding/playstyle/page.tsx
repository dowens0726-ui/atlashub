"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useOnboarding } from "@/app/components/onboarding/OnboardingProvider";
import type {
  AtlasPlaystyleId,
  AtlasPlaystyleOption,
} from "@/app/types/onboarding";

const playstyleOptions: AtlasPlaystyleOption[] = [
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    description:
      "Build businesses, create reliable income, and grow a powerful criminal empire.",
    focus: "Businesses, income, and ROI",
    icon: "↗",
  },
  {
    id: "collector",
    title: "Collector",
    description:
      "Acquire rare vehicles, weapons, properties, and everything worth owning.",
    focus: "Ownership and rare unlocks",
    icon: "◆",
  },
  {
    id: "racer",
    title: "Racer",
    description:
      "Prioritize speed, handling, vehicle performance, and competitive driving.",
    focus: "Vehicles and performance",
    icon: "⚡",
  },
  {
    id: "explorer",
    title: "Explorer",
    description:
      "Discover locations, secrets, collectibles, activities, and hidden opportunities.",
    focus: "Map discovery and secrets",
    icon: "⌖",
  },
  {
    id: "completionist",
    title: "Completionist",
    description:
      "Complete every mission, unlock every reward, and master the full game.",
    focus: "Progress and completion",
    icon: "✓",
  },
  {
    id: "solo-operator",
    title: "Solo Operator",
    description:
      "Choose efficient missions, purchases, and strategies designed for solo play.",
    focus: "Efficiency and independence",
    icon: "◉",
  },
];

const MINIMUM_SELECTIONS = 1;
const MAXIMUM_SELECTIONS = 3;

export default function OnboardingPlaystylePage() {
  const { answers, hydrated, setPlaystyles } = useOnboarding();

  const selectedPlaystyles = answers.playstyles;
  const selectionCount = selectedPlaystyles.length;

  const canContinue =
    hydrated && selectionCount >= MINIMUM_SELECTIONS;

  const selectionMessage = useMemo(() => {
    if (!hydrated) {
      return "Loading your Atlas profile...";
    }

    if (selectionCount === 0) {
      return "Choose at least one playstyle.";
    }

    if (selectionCount === 1) {
      return "Good start. You can choose up to three.";
    }

    if (selectionCount < MAXIMUM_SELECTIONS) {
      return `${selectionCount} playstyles selected.`;
    }

    return "Maximum of three playstyles selected.";
  }, [hydrated, selectionCount]);

  function togglePlaystyle(playstyleId: AtlasPlaystyleId) {
    const isSelected = selectedPlaystyles.includes(playstyleId);

    if (isSelected) {
      setPlaystyles(
        selectedPlaystyles.filter(
          (currentId) => currentId !== playstyleId,
        ),
      );

      return;
    }

    if (selectedPlaystyles.length >= MAXIMUM_SELECTIONS) {
      return;
    }

    setPlaystyles([...selectedPlaystyles, playstyleId]);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_62%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-32 top-52 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-36 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <section className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/onboarding"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span aria-hidden="true">←</span>
              Back to welcome
            </Link>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Atlas Player Setup
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold text-zinc-200">
                Step 1 of 3
              </span>

              <span className="text-zinc-500">
                Choose your playstyle
              </span>
            </div>

            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800"
              aria-label="Onboarding progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={33}
            >
              <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            </div>
          </div>
        </header>

        <div className="mt-14 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            Player Identity
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            How will you play?
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Choose up to three playstyles. Atlas will use your selections to
            personalize your missions, purchases, progression plan, and
            dashboard recommendations.
          </p>
        </div>

        <div
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          aria-label="Available playstyles"
        >
          {playstyleOptions.map((option) => {
            const isSelected = selectedPlaystyles.includes(option.id);

            const selectionLimitReached =
              selectionCount >= MAXIMUM_SELECTIONS && !isSelected;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                disabled={!hydrated || selectionLimitReached}
                onClick={() => togglePlaystyle(option.id)}
                className={[
                  "group relative min-h-64 rounded-3xl border p-6 text-left transition duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                  isSelected
                    ? "border-emerald-400 bg-emerald-400/10 shadow-xl shadow-emerald-950/30"
                    : "border-zinc-800 bg-zinc-900/70 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900",
                  !hydrated || selectionLimitReached
                    ? "cursor-not-allowed opacity-45"
                    : "cursor-pointer",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={[
                      "flex h-12 w-12 items-center justify-center rounded-2xl border text-xl font-black transition",
                      isSelected
                        ? "border-emerald-400/40 bg-emerald-400 text-zinc-950"
                        : "border-zinc-700 bg-zinc-950 text-emerald-300 group-hover:border-zinc-600",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {option.icon}
                  </div>

                  <div
                    className={[
                      "flex h-7 w-7 items-center justify-center rounded-full border text-sm font-black transition",
                      isSelected
                        ? "border-emerald-400 bg-emerald-400 text-zinc-950"
                        : "border-zinc-700 bg-zinc-950 text-transparent",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    ✓
                  </div>
                </div>

                <h2 className="mt-7 text-2xl font-bold text-zinc-100">
                  {option.title}
                </h2>

                <p className="mt-3 leading-7 text-zinc-400">
                  {option.description}
                </p>

                <div className="mt-6 border-t border-zinc-800 pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-600">
                    Atlas Focus
                  </p>

                  <p className="mt-2 text-sm font-semibold text-emerald-300">
                    {option.focus}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <footer className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className="font-semibold text-zinc-200"
                aria-live="polite"
                aria-atomic="true"
              >
                {selectionMessage}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Your choices are saved automatically on this device.
              </p>
            </div>

            {canContinue ? (
              <Link
                href="/onboarding/goals"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-7 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Continue to Goals
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-xl bg-zinc-800 px-7 py-3 font-bold text-zinc-500"
              >
                {hydrated
                  ? "Select a Playstyle"
                  : "Loading Profile"}
              </button>
            )}
          </div>
        </footer>
      </section>
    </main>
  );
}