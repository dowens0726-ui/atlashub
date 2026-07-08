import type { DashboardModel } from "@/app/services";
import { Badge } from "@/app/components/ui";

type DashboardHeaderProps = {
  dashboard: DashboardModel;
};

export default function DashboardHeader({ dashboard }: DashboardHeaderProps) {
  return (
    <section className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
      <div className="flex flex-wrap gap-3">
        <Badge className="border-amber-400/40 text-amber-400">
          Atlas Alpha
        </Badge>

        <Badge>{dashboard.summary.stage}</Badge>
      </div>

      <h1 className="mt-5 text-5xl font-black text-white">
        Empire Dashboard
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
        Your command center for progression, recommendations, budget planning,
        and empire growth.
      </p>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Current cash: ${dashboard.summary.cash.toLocaleString()}
      </p>
    </section>
  );
}