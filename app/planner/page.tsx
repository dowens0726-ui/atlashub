"use client";

import {
  AtlasPlannerStrategy,
  PlannerHeader,
  PlannerSummary,
  PlannerTimeline,
} from "@/app/components/planner";

import {
  AppShell,
} from "@/app/components/layout";

import Container from "@/app/components/ui/Container";

import {
  getEmpireModel,
  getProgressionPlan,
} from "@/app/services";

import {
  buildAtlasBrain,
} from "@/app/intelligence";

import {
  usePlayerProfile,
} from "@/app/hooks/usePlayerProfile";


export default function PlannerPage() {
  const {
    profile,
    hydrated,
  } = usePlayerProfile();

  const empire =
    getEmpireModel(
      profile
    );

  const intelligence =
    buildAtlasBrain({
      profile,
      empire,
    });

  const progressionPlan =
    getProgressionPlan(
      profile
    );


  if (!hydrated) {
    return (
      <AppShell>
        <Container className="py-10">
          <PlannerHeader />

          <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Atlas Intelligence
            </p>

            <p className="mt-3 text-lg text-zinc-400">
              Loading your personalized progression strategy...
            </p>
          </section>
        </Container>
      </AppShell>
    );
  }


  return (
    <AppShell>
      <Container className="py-10">
        <PlannerHeader />

        <div className="mt-8">
          <AtlasPlannerStrategy
            plan={
              intelligence.strategicPlan
            }
          />
        </div>

        <div className="mt-12">
          <PlannerSummary
            profile={profile}
            plan={progressionPlan}
          />
        </div>

        <div className="mt-12">
          <PlannerTimeline
            plan={progressionPlan}
          />
        </div>
      </Container>
    </AppShell>
  );
}