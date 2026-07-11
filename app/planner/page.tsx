import {
  PlannerHeader,
  PlannerSummary,
  PlannerTimeline,
  AtlasPlannerStrategy,
} from "@/app/components/planner";

import { AppShell } from "@/app/components/layout";

import Container from "@/app/components/ui/Container";

import {
  defaultPlayerProfile,
  getEmpireModel,
  getProgressionPlan,
} from "@/app/services";

import {
  buildDashboardIntelligence,
} from "@/app/intelligence";


export default function PlannerPage() {
  const profile =
    defaultPlayerProfile;


  const empire =
    getEmpireModel(
      profile
    );


  const intelligence =
    buildDashboardIntelligence(
      profile,
      empire
    );


  const progressionPlan =
    getProgressionPlan(
      profile
    );


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