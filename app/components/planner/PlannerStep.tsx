import Link from "next/link";
import type { ProgressionStep } from "@/app/types";
import { Card, MetricRow, Badge } from "@/app/components/ui";

type PlannerStepProps = {
  step: ProgressionStep;
  active?: boolean;
};

function getHref(step: ProgressionStep) {
  if (step.entityType === "business") {
    return `/businesses/${step.slug}`;
  }

  if (step.entityType === "vehicle") {
    return `/vehicles/${step.slug}`;
  }

  return "/planner";
}

export default function PlannerStep({ step, active = false }: PlannerStepProps) {
  return (
    <Link href={getHref(step)} className="block">
      <Card
        hover
        accent={active ? "amber" : "zinc"}
        padding="lg"
        className={active ? "bg-amber-400 text-zinc-950" : ""}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Badge
              className={
                active
                  ? "border-zinc-950/30 text-zinc-950"
                  : "border-amber-400/40 text-amber-400"
              }
            >
              {active ? "Next Step" : step.entityType}
            </Badge>

            <h3 className="mt-4 text-2xl font-black">{step.title}</h3>

            <p
              className={`mt-3 max-w-3xl text-sm leading-6 ${
                active ? "text-zinc-900" : "text-zinc-400"
              }`}
            >
              {step.reason}
            </p>
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-right ${
              active
                ? "border-zinc-950/20 bg-zinc-950/10"
                : "border-zinc-800 bg-zinc-950/40"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              ROI Score
            </p>
            <p className="mt-1 text-3xl font-black">
              {step.estimatedROI}
            </p>
          </div>
        </div>

        <div
          className={`mt-6 rounded-2xl border px-5 ${
            active
              ? "border-zinc-950/20 bg-zinc-950/10"
              : "border-zinc-800 bg-zinc-950/40"
          }`}
        >
          <MetricRow
            label="Estimated Cost"
            value={`$${step.estimatedCost.toLocaleString()}`}
            className={active ? "border-zinc-950/20" : ""}
          />

          <MetricRow
            label="Entity Type"
            value={step.entityType}
            className={active ? "border-zinc-950/20" : ""}
          />
        </div>

        <div className="mt-5 text-sm font-bold">
          View details →
        </div>
      </Card>
    </Link>
  );
}