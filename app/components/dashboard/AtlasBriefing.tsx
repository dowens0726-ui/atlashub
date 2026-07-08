import type { DashboardModel } from "@/app/services";
import { Badge, MetricRow, ProgressBar } from "@/app/components/ui";

type AtlasBriefingProps = {
  dashboard: DashboardModel;
};

export default function AtlasBriefing({ dashboard }: AtlasBriefingProps) {
  const nextObjective = dashboard.objectives[0];
  const recommendation = dashboard.recommendation;

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-stretch xl:justify-between">
        <div className="flex-1">
          <Badge className="border-amber-400/40 text-amber-400">
            Atlas Briefing
          </Badge>

          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white xl:text-7xl">
            Your next move is ready.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            Atlas analyzed your empire, budget, progression, and current
            recommendations to prepare your next session.
          </p>

          <div className="mt-8 max-w-xl">
            <ProgressBar
              value={dashboard.empire.overallScore}
              label="Empire Readiness"
            />
          </div>
        </div>

        <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-2xl xl:max-w-md">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">
            Empire Score
          </p>

          <div className="mt-4 flex items-end gap-3">
            <p className="text-7xl font-black text-white">
              {dashboard.empire.overallScore}
            </p>

            <p className="pb-3 text-lg font-black text-amber-400">
              Grade {dashboard.empire.overallGrade}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 px-5">
            <MetricRow
              label="Today's Objective"
              value={nextObjective?.title ?? "Review your empire"}
            />
            <MetricRow
              label="Recommended Move"
              value={recommendation?.title ?? "No recommendation yet"}
            />
            <MetricRow
              label="Available Capital"
              value={`$${dashboard.summary.cash.toLocaleString()}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}