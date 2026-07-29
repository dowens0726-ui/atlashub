import type {
  DashboardModel,
} from "@/app/services";

import SignalBadge from "./SignalBadge";

type ProgressRoadmapPanelProps = {
  dashboard:
    DashboardModel;
};

function clampPercentage(
  value: number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value)
    )
  );
}

function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-US",
    {
      style:
        "currency",
      currency:
        "USD",
      notation:
        value >= 1000000
          ? "compact"
          : "standard",
      maximumFractionDigits:
        value >= 1000000
          ? 1
          : 0,
    }
  ).format(value);
}

function getPhaseDirective(
  completion: number
): string {
  if (completion >= 80) {
    return "Finalize remaining acquisitions and optimize output.";
  }

  if (completion >= 50) {
    return "Maintain momentum while protecting expansion capital.";
  }

  if (completion >= 25) {
    return "Build the core portfolio before pursuing optional assets.";
  }

  return "Establish the financial foundation for the active roadmap.";
}

export default function ProgressRoadmapPanel({
  dashboard,
}: ProgressRoadmapPanelProps) {
  const completion =
    clampPercentage(
      dashboard.summary.completion
    );

  const queuedSteps =
    dashboard.progression.steps.length;

  const completedAssets =
    dashboard.profile.ownedBusinesses.length;

  return (
    <section className="relative overflow-hidden rounded-[1.6rem] border border-violet-300/15 bg-[linear-gradient(145deg,rgba(139,92,246,0.055),rgba(3,7,18,0.88)_46%,rgba(3,7,18,0.96))] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/55 to-transparent"
      />

      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-violet-300">
            Progress and Roadmap
          </p>

          <h4 className="mt-2 text-xl font-black text-white">
            Strategic trajectory
          </h4>
        </div>

        <span className="rounded-full border border-violet-300/15 bg-violet-300/[0.06] px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.18em] text-violet-200">
          {dashboard.summary.stage} phase
        </span>
      </header>

      <div className="mt-6 rounded-[1.35rem] border border-white/[0.07] bg-black/25 p-5">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-zinc-500">
              Roadmap Completion
            </p>

            <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
              {completion}%
            </p>
          </div>

          <div className="text-right">
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-zinc-600">
              Current stage
            </p>

            <p className="mt-1 text-lg font-black text-violet-200">
              {dashboard.summary.stage}
            </p>
          </div>
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300 transition-[width] duration-700"
            style={{
              width:
                `${completion}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[0.58rem] font-bold uppercase tracking-[0.14em] text-zinc-600">
          <span>Foundation</span>
          <span>Expansion</span>
          <span>Dominance</span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <SignalBadge
          label="Assets Secured"
          value={completedAssets.toString()}
          detail="Businesses currently owned."
          tone="emerald"
          active={
            completedAssets >
            0
          }
        />

        <SignalBadge
          label="Actions Queued"
          value={queuedSteps.toString()}
          detail="Remaining roadmap acquisitions."
          tone="cyan"
          active={
            queuedSteps >
            0
          }
        />

        <SignalBadge
          label="Investment Left"
          value={formatCurrency(
            dashboard.summary.remainingInvestment
          )}
          detail="Capital required on the current path."
          tone={
            dashboard.summary.remainingInvestment <=
            dashboard.summary.cash
              ? "emerald"
              : "amber"
          }
        />
      </div>

      <div className="mt-4 rounded-[1.35rem] border border-violet-300/10 bg-violet-300/[0.025] p-5">
        <p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-violet-300">
          Phase Directive
        </p>

        <p className="mt-3 text-sm font-semibold leading-6 text-zinc-300">
          {getPhaseDirective(
            completion
          )}
        </p>
      </div>
    </section>
  );
}