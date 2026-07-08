import Link from "next/link";
import type { ProgressionPlan } from "@/app/types";
import { Badge, Card, MetricRow } from "@/app/components/ui";

type DashboardPlannerPreviewProps = {
  plan: ProgressionPlan;
};

export default function DashboardPlannerPreview({
  plan,
}: DashboardPlannerPreviewProps) {
  const previewSteps = plan.steps.slice(0, 3);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Planner Preview
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Your Next Roadmap Steps
          </h2>
        </div>

        <Link
          href="/planner"
          className="text-sm font-bold text-amber-400 hover:text-amber-300"
        >
          Open Planner →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {previewSteps.map((step, index) => (
          <Card key={step.id} hover accent={index === 0 ? "amber" : "zinc"}>
            <Badge
              className={
                index === 0
                  ? "border-amber-400/40 text-amber-400"
                  : undefined
              }
            >
              {index === 0 ? "Next" : step.entityType}
            </Badge>

            <h3 className="mt-4 text-xl font-black text-white">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {step.reason}
            </p>

            <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/40 px-5">
              <MetricRow
                label="Cost"
                value={`$${step.estimatedCost.toLocaleString()}`}
              />
              <MetricRow label="ROI" value={`${step.estimatedROI}/100`} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}