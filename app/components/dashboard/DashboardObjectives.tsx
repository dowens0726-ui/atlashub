import type { DashboardObjective } from "@/app/services";
import { Badge, Card } from "@/app/components/ui";

type DashboardObjectivesProps = {
  objectives: DashboardObjective[];
};

export default function DashboardObjectives({
  objectives,
}: DashboardObjectivesProps) {
  return (
    <Card padding="lg">
      <Badge>Objectives</Badge>

      <h2 className="mt-4 text-3xl font-black text-white">
        Today’s Focus
      </h2>

      <div className="mt-6 space-y-3">
        {objectives.map((objective) => (
          <div
            key={objective.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">
                  {objective.title}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {objective.description}
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-400">
                {objective.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}