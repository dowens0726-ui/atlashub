import type { EmpireInsight } from "@/app/types";
import { Badge, Card } from "@/app/components/ui";

type EmpireInsightsProps = {
  insights: EmpireInsight[];
};

export default function EmpireInsights({ insights }: EmpireInsightsProps) {
  return (
    <Card padding="lg">
      <Badge className="border-amber-400/40 text-amber-400">
        Atlas Insights
      </Badge>

      <h2 className="mt-4 text-3xl font-black text-white">
        Strategic Priorities
      </h2>

      <div className="mt-6 space-y-3">
        {insights.length > 0 ? (
          insights.map((insight) => (
            <div
              key={insight.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white">
                    {insight.title}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {insight.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-400">
                  {insight.priority}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
            No strategic insights available yet.
          </div>
        )}
      </div>
    </Card>
  );
}