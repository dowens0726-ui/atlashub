import {
  PlannerHeader,
  PlannerSummary,
  PlannerTimeline,
} from "@/app/components/planner";
import { AppShell } from "@/app/components/layout";
import Container from "@/app/components/ui/Container";
import { defaultPlayerProfile, getProgressionPlan } from "@/app/services";

export default function PlannerPage() {
  const plan = getProgressionPlan(defaultPlayerProfile);

  return (
    <AppShell>
      <Container className="py-10">
        <PlannerHeader />

        <div className="mt-8">
          <PlannerSummary profile={defaultPlayerProfile} plan={plan} />
        </div>

        <div className="mt-12">
          <PlannerTimeline plan={plan} />
        </div>
      </Container>
    </AppShell>
  );
}