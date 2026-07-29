import type {
  DashboardModel,
} from "@/app/services";

import {
  AnimatedNumber,
} from "@/app/components/ui";

import ExecutiveMetricRow from "./ExecutiveMetricRow";

type EmpireHealthPanelProps = {
  empire:
    DashboardModel["empire"];
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

function getHealthLabel(
  score: number
): string {
  if (score >= 85) {
    return "Thriving";
  }

  if (score >= 70) {
    return "Strong";
  }

  if (score >= 50) {
    return "Stable";
  }

  return "Needs Attention";
}

function getHealthTone(
  score: number
): string {
  if (score >= 80) {
    return "text-emerald-200";
  }

  if (score >= 60) {
    return "text-cyan-200";
  }

  if (score >= 40) {
    return "text-amber-200";
  }

  return "text-rose-200";
}

export default function EmpireHealthPanel({
  empire,
}: EmpireHealthPanelProps) {
  const score =
    clampPercentage(
      empire.overallScore
    );

  const circumference =
    2 * Math.PI * 52;

  const dashOffset =
    circumference -
    (
      score /
      100
    ) *
      circumference;

  const metrics = [
    {
      ...empire.financialStrength,
      detail:
        "Capital position",
    },
    {
      ...empire.businessPortfolio,
      detail:
        "Asset diversity",
    },
    {
      ...empire.growthPotential,
      detail:
        "Expansion capacity",
    },
    {
      ...empire.efficiency,
      detail:
        "Operational output",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[1.6rem] border border-amber-300/15 bg-[linear-gradient(145deg,rgba(251,191,36,0.055),rgba(3,7,18,0.82)_42%,rgba(3,7,18,0.94))] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/55 to-transparent"
      />

      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
            Empire Health
          </p>

          <h4 className="mt-2 text-xl font-black text-white">
            Executive condition
          </h4>
        </div>

        <span className="rounded-full border border-white/[0.08] bg-black/25 px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.18em] text-zinc-400">
          Live telemetry
        </span>
      </header>

      <div className="mt-7 grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
        <div className="relative mx-auto h-[172px] w-[172px]">
          <svg
            aria-hidden="true"
            className="-rotate-90"
            height="172"
            viewBox="0 0 120 120"
            width="172"
          >
            <circle
              cx="60"
              cy="60"
              fill="none"
              r="52"
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="7"
            />

            <circle
              cx="60"
              cy="60"
              fill="none"
              r="52"
              stroke="url(#atlas-health-gradient)"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              strokeWidth="7"
            />

            <defs>
              <linearGradient
                id="atlas-health-gradient"
                x1="0"
                x2="1"
                y1="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="rgb(251 191 36)"
                />

                <stop
                  offset="52%"
                  stopColor="rgb(34 211 238)"
                />

                <stop
                  offset="100%"
                  stopColor="rgb(52 211 153)"
                />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-black tracking-[-0.07em] text-white">
              <AnimatedNumber
                value={score}
              />
            </p>

            <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.24em] text-zinc-500">
              Empire score
            </p>

            <span
              className={[
                "mt-2 text-xs font-black",
                getHealthTone(score),
              ].join(" ")}
            >
              {getHealthLabel(score)}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.2em] text-zinc-500">
              Empire Grade
            </p>

            <div className="mt-2 flex items-end justify-between gap-4">
              <p className="text-3xl font-black text-amber-200">
                {empire.overallGrade}
              </p>

              <p className="pb-1 text-xs font-bold text-zinc-500">
                Atlas evaluation
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.025] p-4">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.2em] text-cyan-300">
              Health Directive
            </p>

            <p className="mt-2 text-sm font-bold leading-6 text-zinc-300">
              {score >= 70
                ? "Current empire health supports controlled expansion."
                : score >= 50
                  ? "Preserve liquidity while strengthening weaker systems."
                  : "Prioritize stabilization before major investment."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {metrics.map(
          (metric) => (
            <ExecutiveMetricRow
              key={metric.label}
              label={metric.label}
              value={metric.score}
              grade={metric.grade}
              detail={metric.detail}
            />
          )
        )}
      </div>
    </section>
  );
}