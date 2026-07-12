"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";

import { useOnboarding } from "@/app/components/onboarding/OnboardingProvider";
import { buildOnboardingIdentity } from "@/app/intelligence/player-identity.engine";

export default function OnboardingIdentityPage() {
  const {
    answers,
    identity,
    completed,
    hydrated,
    setIdentity,
    completeOnboarding,
  } = useOnboarding();

  const hasPlaystyles = answers.playstyles.length > 0;
  const hasGoals = answers.goals.length > 0;
  const canGenerateIdentity = hasPlaystyles && hasGoals;

  const generatedIdentity = useMemo(() => {
    if (!canGenerateIdentity) {
      return null;
    }

    return buildOnboardingIdentity(answers);
  }, [answers, canGenerateIdentity]);

  useEffect(() => {
    if (!hydrated || !generatedIdentity) {
      return;
    }

    const identityHasChanged =
      !identity ||
      identity.identity !== generatedIdentity.identity ||
      identity.playstyle !== generatedIdentity.playstyle ||
      identity.primaryFocus !== generatedIdentity.primaryFocus ||
      identity.secondaryFocus !== generatedIdentity.secondaryFocus ||
      identity.confidence !== generatedIdentity.confidence ||
      identity.explanation !== generatedIdentity.explanation;

    if (identityHasChanged) {
      setIdentity(generatedIdentity);
    }

    if (!completed) {
      completeOnboarding();
    }
  }, [
    completeOnboarding,
    completed,
    generatedIdentity,
    hydrated,
    identity,
    setIdentity,
  ]);

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 text-center">
          <div
            aria-hidden="true"
            className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-emerald-400/20"
          />

          <h1 className="mt-6 text-2xl font-bold">
            Atlas is loading your profile
          </h1>

          <p className="mt-3 text-zinc-400">
            Retrieving your saved playstyle and goals.
          </p>
        </div>
      </main>
    );
  }

  if (!canGenerateIdentity || !generatedIdentity) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-16 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.13),transparent_62%)]"
        />

        <section className="relative w-full max-w-2xl rounded-3xl border border-amber-400/20 bg-zinc-900/80 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300">
            Setup Incomplete
          </p>

          <h1 className="mt-4 text-3xl font-black sm:text-4xl">
            Atlas needs a little more information
          </h1>

          <p className="mt-5 leading-7 text-zinc-400">
            Complete both your playstyle and goal selections before Atlas
            creates your player identity.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
                Playstyle
              </p>

              <p
                className={[
                  "mt-2 font-semibold",
                  hasPlaystyles ? "text-emerald-300" : "text-amber-300",
                ].join(" ")}
              >
                {hasPlaystyles ? "Complete" : "Selection required"}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
                Goals
              </p>

              <p
                className={[
                  "mt-2 font-semibold",
                  hasGoals ? "text-emerald-300" : "text-amber-300",
                ].join(" ")}
              >
                {hasGoals ? "Complete" : "Selection required"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding/playstyle"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 font-bold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Edit Playstyle
            </Link>

            <Link
              href="/onboarding/goals"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-300 px-6 py-3 font-bold text-zinc-950 transition hover:bg-amber-200"
            >
              Choose Goals
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const displayedIdentity = identity ?? generatedIdentity;

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_64%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-40 top-48 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <section className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/onboarding/goals"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span aria-hidden="true">&larr;</span>
              Back to Goals
            </Link>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-300"
              />
              Identity Generated
            </div>
          </div>

          <div className="mt-12 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
              Atlas Player Identity
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Your Atlas identity is ready.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Atlas combined your selected playstyles and goals to create your
              initial strategic profile.
            </p>
          </div>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
          <div className="space-y-6">
            <article className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-zinc-900/80 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl">
              <div className="border-b border-zinc-800 bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10 p-7 sm:p-9">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                  Primary Identity
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  {displayedIdentity.identity}
                </h2>

                <p className="mt-4 text-lg font-semibold text-zinc-300">
                  {displayedIdentity.playstyle}
                </p>
              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                    Primary Focus
                  </p>

                  <p className="mt-3 text-xl font-bold text-white">
                    {displayedIdentity.primaryFocus}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                    Secondary Focus
                  </p>

                  <p className="mt-3 text-xl font-bold text-white">
                    {displayedIdentity.secondaryFocus}
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/75 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Atlas Confidence
                  </p>

                  <h2 className="mt-3 text-3xl font-black">
                    {displayedIdentity.confidence}%
                  </h2>
                </div>

                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                  Initial Profile
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700"
                  style={{
                    width: `${displayedIdentity.confidence}%`,
                  }}
                />
              </div>

              <p className="mt-6 leading-7 text-zinc-400">
                {displayedIdentity.explanation}
              </p>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/75 p-6 backdrop-blur-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                Your Selections
              </p>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-600">
                  Playstyles
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {answers.playstyles.map((playstyle) => (
                    <span
                      key={playstyle}
                      className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm font-semibold capitalize text-emerald-300"
                    >
                      {playstyle.replaceAll("-", " ")}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-600">
                  Goals
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {answers.goals.map((goal) => (
                    <span
                      key={goal}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold capitalize text-cyan-300"
                    >
                      {goal.replaceAll("-", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/75 p-6 backdrop-blur-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                What Happens Next
              </p>

              <p className="mt-4 leading-7 text-zinc-400">
                Your dashboard, recommendations, planner, and future Atlas
                intelligence will use this identity as an initial
                personalization layer.
              </p>

              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Your identity can evolve later as Atlas learns from your
                assets, missions, progression, and decisions.
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-10 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-bold text-zinc-100">
              Your Atlas profile is ready.
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Continue to your personalized dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding/playstyle"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 font-bold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Edit Answers
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-7 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Open My Dashboard
              <span aria-hidden="true" className="ml-2">
                &rarr;
              </span>
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}