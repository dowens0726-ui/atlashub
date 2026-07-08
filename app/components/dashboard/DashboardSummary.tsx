import type { DashboardModel } from "@/app/services";
import { GlassPanel, HeroMetrics } from "@/app/components/design-system";

type DashboardSummaryProps = {
  dashboard: DashboardModel;
};

export default function DashboardSummary({ dashboard }: DashboardSummaryProps) {
  const metrics = [
    {
      label: "Cash",
      value: `$${dashboard.summary.cash.toLocaleString()}`,
    },
    {
      label: "Stage",
      value: dashboard.summary.stage,
    },
    {
      label: "Completion",
      value: `${dashboard.summary.completion}%`,
    },
    {
      label: "Investment Left",
      value: `$${dashboard.summary.remainingInvestment.toLocaleString()}`,
    },
    {
      label: "Next Steps",
      value: `${dashboard.progression.steps.length}`,
    },
  ];

  return (
    <GlassPanel
      title="Dashboard Summary"
      subtitle="A quick snapshot of your current progression, available resources, and remaining investment path."
      className="border-cyan-400/20 bg-cyan-400/[0.03]"
    >
      <HeroMetrics metrics={metrics} columns={3} />
    </GlassPanel>
  );
}