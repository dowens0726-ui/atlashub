import type { PlayerProfile, ProgressionPlan } from "@/app/types";
import { ProgressBar, StatCard } from "@/app/components/ui";

type PlannerSummaryProps = {
  profile: PlayerProfile;
  plan: ProgressionPlan;
};

export default function PlannerSummary({
  profile,
  plan,
}: PlannerSummaryProps) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <StatCard
        label="Stage"
        value={plan.stage}
        helper="Your current empire progression phase."
      />

      <StatCard
        label="Completion"
        value={`${plan.completion}%`}
        accent="amber"
        footer={
          <ProgressBar value={plan.completion} showValue={false} />
        }
      />

      <StatCard
        label="Current Cash"
        value={`$${profile.cash.toLocaleString()}`}
        helper="Available budget for your next move."
      />

      <StatCard
        label="Remaining Investment"
        value={`$${plan.totalInvestment.toLocaleString()}`}
        helper="Estimated cost to complete this roadmap."
      />
    </section>
  );
}