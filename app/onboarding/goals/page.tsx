"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useOnboarding } from "@/app/components/onboarding/OnboardingProvider";
import type {
  AtlasOnboardingGoalId,
  AtlasOnboardingGoalOption,
} from "@/app/types/onboarding";

const goalOptions: AtlasOnboardingGoalOption[] = [
  {
    id: "build-biggest-empire",
    title: "Build the Biggest Empire",
    description:
      "Create powerful income streams, acquire valuable businesses, and grow a dominant criminal organization.",
    focus: "Businesses, expansion, and long-term growth",
    icon: "▲",
  },
  {
    id: "become-wealthy",
    title: "Become Wealthy",
    description:
      "Prioritize profitable missions, smart purchases, and the fastest routes to financial freedom.",
    focus: "Cash flow, ROI, and efficient progression",
    icon: "$",
  },
  {
    id: "own-everything",
    title: "Own Everything",
    description:
      "Build a complete collection of vehicles, weapons, properties, businesses, and rare unlocks.",
    focus: "Ownership, collections, and rare items",
    icon: "◆",
  },
  {
    id: "complete-everything",
    title: "Complete Everything",
    description:
      "Finish every mission, activity, challenge, unlock, and meaningful piece of GTA VI content.",
    focus: "Completion, unlocks, and mastery",
    icon: "✓",
  },
  {
    id: "explore-everything",
    title: "Explore Everything",
    description:
      "Discover hidden locations, collectibles, secrets, encounters, and opportunities across the world.",
    focus: "Exploration, secrets, and discovery",
    icon: "⌖",
  },
  {
    id: "dominate-online",
    title: "Dominate Online",
    description:
      "Build a competitive loadout, earn efficiently, and prepare for high-level multiplayer activities.",
    focus: "Competition, performance, and online strategy",
    icon: "⚡",
  },
];

const MINIMUM_SELECTIONS = 1;
const MAXIMUM_SELECTIONS = 3;

export default function OnboardingGoalsPage() {
  const { answers, hydrated, setGoals } = useOnboarding();

  const selectedGoals = answers.goals;
  const selectionCount = selectedGoals.length;
  const hasPlaystyleSelection = answers.playstyles.length > 0;

  const canContinue =
    hydrated &&
    hasPlaystyleSelection &&
    selectionCount >= MINIMUM_SELECTIONS;

  const selectionMessage = useMemo(() => {
    if (!hydrated) {
      return "Loading your Atlas profile...";
    }

    if (!hasPlaystyleSelection) {
      return "Choose your playstyle before selecting your goals.";
    }

    if (selectionCount === 0) {
      return "Choose at least one goal.";
    }

    if (selectionCount === 1) {
      return "Good start. You can choose up to three.";
    }

    if (selectionCount < MAXIMUM_SELECTIONS) {
      return `${selectionCount} goals selected.`;
    }

    return "Maximum of three goals selected.";
  }, [hasPlaystyleSelection, hydrated, selectionCount]);

  function toggleGoal(goalId: AtlasOnboardingGoalId) {
    if (!hydrated || !hasPlaystyleSelection) {
      return;
    }

    const isSelected = selectedGoals.includes(goalId);

    if (isSelected) {
      setGoals(
        selectedGoals.filter((currentGoalId) => currentGoalId !== goalId),
      );

      return;
    }

    if (selectedGoals.length >= MAXIMUM_SELECTIONS) {
      return;
    }

    setGoals([...selectedGoals, goalId]);
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
              href="/onboarding/playstyle"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span aria-hidden="true">←</span>
              Back to playstyle
            </Link>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Atlas Player Setup
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold text-zinc-200">
                Step 2 of 3
              </span>

              <span className="text-zinc-500">Choose your goals</span>
            </div>

            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800"
              aria-label="Onboarding progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={66}
            >
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            </div>
          </div>
        </header>

        <div className="mt-14 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            Player Priorities
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            What do you want to achieve?
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Choose up to three goals. Atlas will combine these priorities with
            your playstyle to create your player identity and recommended
            progression focus.
          </p>
        </div>

        {!hasPlaystyleSelection && hydrated ? (
          <div className="mt-8 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-5">
            <p className="font-bold text-amber-200">
              Your playstyle has not been selected.
            </p>

            <p className="mt-2 text-sm leading-6 text-amber-100/70">
              Return to the previous step and choose at least one playstyle
              before continuing.
            </p>

            <Link
              href="/onboarding/playstyle"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-300 px-5 py-2 font-bold text-zinc-950 transition hover:bg-amber-200"
            >
              Choose Playstyle
            </Link>
          </div>
        ) : null}

        <div
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          aria-label="Available goals"
        >
          {goalOptions.map((option) => {
            const isSelected = selectedGoals.includes(option.id);

            const selectionLimitReached =
              selectionCount >= MAXIMUM_SELECTIONS && !isSelected;

            const isDisabled =
              !hydrated ||
              !hasPlaystyleSelection ||
              selectionLimitReached;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                disabled={isDisabled}
                onClick={() => toggleGoal(option.id)}
                className={[
                  "group relative min-h-64 rounded-3xl border p-6 text-left transition duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                  isSelected
                    ? "border-emerald-400 bg-emerald-400/10 shadow-xl shadow-emerald-950/30"
                    : "border-zinc-800 bg-zinc-900/70 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900",
                  isDisabled
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
                href="/onboarding/identity"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-7 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Create My Identity
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
                {!hydrated
                  ? "Loading Profile"
                  : !hasPlaystyleSelection
                    ? "Choose Playstyle First"
                    : "Select a Goal"}
              </button>
            )}
          </div>
        </footer>
      </section>
    </main>
  );
}