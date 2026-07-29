import type {
  DashboardModel,
} from "@/app/services";

import SignalBadge from "./SignalBadge";

type CapitalIntelligencePanelProps = {
  dashboard:
    DashboardModel;
};

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

export default function CapitalIntelligencePanel({
  dashboard,
}: CapitalIntelligencePanelProps) {
  const cash =
    dashboard.summary.cash;

  const remainingInvestment =
    dashboard.summary.remainingInvestment;

  const nextStep =
    dashboard.progression.nextStep;

  const nextCost =
    nextStep?.estimatedCost ??
    0;

  const runway =
    remainingInvestment > 0
      ? clampPercentage(
          (
            cash /
            remainingInvestment
          ) *
            100
        )
      : 100;

  const purchaseCoverage =
    nextCost > 0
      ? clampPercentage(
          (
            cash /
            nextCost
          ) *
            100
        )
      : 100;

  const canFundNextMove =
    nextCost === 0 ||
    cash >= nextCost;

  const liquidityLabel =
    runway >= 75
      ? "High"
      : runway >= 35
        ? "Moderate"
        : "Constrained";

  return (
    <section className="relative overflow-hidden rounded-[1.6rem] border border-emerald-300/15 bg-[linear-gradient(145deg,rgba(16,185,129,0.055),rgba(3,7,18,0.88)_46%,rgba(3,7,18,0.96))] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/55 to-transparent"
      />

      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-emerald-300">
            Capital and Expansion
          </p>

          <h4 className="mt-2 text-xl font-black text-white">
            Deployment intelligence
          </h4>
        </div>

        <span
          className={[
            "rounded-full border px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.18em]",
            canFundNextMove
              ? "border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-200"
              : "border-amber-300/15 bg-amber-300/[0.06] text-amber-200",
          ].join(" ")}
        >
          {canFundNextMove
            ? "Capital ready"
            : "Reserve building"}
        </span>
      </header>

      <div className="mt-6 rounded-[1.35rem] border border-white/[0.07] bg-black/25 p-5">
        <p className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-zinc-500">
          Deployable Capital
        </p>

        <p className="mt-2 break-words text-4xl font-black tracking-[-0.05em] text-white">
          {formatCurrency(cash)}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs font-bold text-zinc-500">
            Investment runway
          </p>

          <p className="text-sm font-black text-emerald-200">
            {runway}%
          </p>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 transition-[width] duration-700"
            style={{
              width:
                `${runway}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <SignalBadge
          label="Liquidity"
          value={liquidityLabel}
          detail="Cash compared with the active roadmap."
          tone={
            runway >= 75
              ? "emerald"
              : runway >= 35
                ? "cyan"
                : "amber"
          }
        />

        <SignalBadge
          label="Owned Businesses"
          value={dashboard.profile.ownedBusinesses.length.toString()}
          detail="Active assets in the current portfolio."
          tone="violet"
          active={
            dashboard.profile.ownedBusinesses.length >
            0
          }
        />
      </div>

      <div className="mt-4 rounded-[1.35rem] border border-cyan-300/10 bg-cyan-300/[0.025] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-cyan-300">
              Next Recommended Purchase
            </p>

            <p className="mt-2 truncate text-lg font-black text-white">
              {nextStep?.title ??
                "Roadmap Complete"}
            </p>

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              {nextStep?.reason ??
                "Atlas has no additional business purchases queued."}
            </p>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-zinc-600">
              Required
            </p>

            <p className="mt-1 text-base font-black text-emerald-200">
              {formatCurrency(nextCost)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs font-bold text-zinc-500">
            Purchase coverage
          </p>

          <p className="text-xs font-black text-cyan-200">
            {purchaseCoverage}%
          </p>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
          <div
            className={[
              "h-full rounded-full transition-[width] duration-700",
              canFundNextMove
                ? "bg-gradient-to-r from-emerald-300 to-cyan-300"
                : "bg-gradient-to-r from-amber-300 to-cyan-300",
            ].join(" ")}
            style={{
              width:
                `${purchaseCoverage}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}