import type { DashboardModel } from "@/app/services";
import { StatCard } from "@/app/components/ui";

type DashboardSummaryProps = {
  dashboard: DashboardModel;
};

export default function DashboardSummary({ dashboard }: DashboardSummaryProps) {
  return (
    <section className="grid gap-4 md:grid-cols-5">
      <StatCard
        label="Cash"
        value={`$${dashboard.summary.cash.toLocaleString()}`}
      />

      <StatCard
        label="Stage"
        value={dashboard.summary.stage}
      />

      <StatCard
        label="Completion"
        value={`${dashboard.summary.completion}%`}
        accent="amber"
      />

      <StatCard
        label="Investment Left"
        value={`$${dashboard.summary.remainingInvestment.toLocaleString()}`}
      />

      <StatCard
        label="Next Steps"
        value={`${dashboard.progression.steps.length}`}
      />
    </section>
  );
}