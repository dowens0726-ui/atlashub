import type { DashboardModel } from "@/app/services";
import { ProgressBar, StatCard } from "@/app/components/ui";

type DashboardStatsProps = {
  dashboard: DashboardModel;
};

export default function DashboardStats({ dashboard }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <StatCard
        label="Current Cash"
        value={`$${dashboard.summary.cash.toLocaleString()}`}
        helper="Available money for your next move."
      />

      <StatCard
        label="Stage"
        value={dashboard.summary.stage}
        helper="Your current progression phase."
      />

      <StatCard
        label="Completion"
        value={`${dashboard.summary.completion}%`}
        accent="amber"
        footer={
          <ProgressBar
            value={dashboard.summary.completion}
            showValue={false}
          />
        }
      />

      <StatCard
        label="Remaining Investment"
        value={`$${dashboard.summary.remainingInvestment.toLocaleString()}`}
        helper="Estimated cost remaining in your roadmap."
      />
    </section>
  );
}