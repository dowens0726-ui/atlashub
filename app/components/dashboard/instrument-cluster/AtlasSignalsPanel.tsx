import type {
  DashboardModel,
} from "@/app/services";

import SignalBadge from "./SignalBadge";

import type {
  SignalBadgeTone,
} from "./SignalBadge";

type AtlasSignalsPanelProps = {
  dashboard:
    DashboardModel;
};

function getPriorityTone(
  priority: string
): SignalBadgeTone {
  const normalizedPriority =
    priority.toLowerCase();

  if (
    normalizedPriority.includes(
      "high"
    )
  ) {
    return "amber";
  }

  if (
    normalizedPriority.includes(
      "medium"
    )
  ) {
    return "cyan";
  }

  return "violet";
}

function getOperatingSignal(
  dashboard:
    DashboardModel
): {
  label: string;
  tone: SignalBadgeTone;
} {
  const score =
    dashboard.empire.overallScore;

  const cash =
    dashboard.summary.cash;

  const nextCost =
    dashboard.progression.nextStep
      ?.estimatedCost ??
    0;

  if (
    score >= 70 &&
    (
      nextCost === 0 ||
      cash >= nextCost
    )
  ) {
    return {
      label:
        "Expansion Ready",
      tone:
        "emerald",
    };
  }

  if (
    score >= 50
  ) {
    return {
      label:
        "Position Stable",
      tone:
        "cyan",
    };
  }

  return {
    label:
      "Stabilization Required",
    tone:
      "amber",
  };
}

export default function AtlasSignalsPanel({
  dashboard,
}: AtlasSignalsPanelProps) {
  const operatingSignal =
    getOperatingSignal(
      dashboard
    );

  const visibleInsights =
    dashboard.empire.insights.slice(
      0,
      4
    );

  return (
    <section className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.045),rgba(3,7,18,0.9)_40%,rgba(139,92,246,0.035))] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
      />

      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-cyan-300">
            Atlas Signals
          </p>

          <h4 className="mt-2 text-xl font-black text-white">
            Operational intelligence
          </h4>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-500">
            High-value signals derived from current empire health,
            progression, liquidity, and Atlas insights.
          </p>
        </div>

        <SignalBadge
          label="Operating Posture"
          value={operatingSignal.label}
          tone={operatingSignal.tone}
          active
        />
      </header>

      {visibleInsights.length > 0 ? (
        <div className="mt-5 grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {visibleInsights.map(
            (insight) => (
              <SignalBadge
                key={insight.id}
                label={insight.priority}
                value={insight.title}
                detail={insight.description}
                tone={getPriorityTone(
                  insight.priority
                )}
                active
              />
            )
          )}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/20 p-5">
          <p className="text-sm font-bold text-zinc-300">
            No urgent intelligence signals detected.
          </p>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Atlas will surface strategic alerts here as empire conditions
            change.
          </p>
        </div>
      )}
    </section>
  );
}