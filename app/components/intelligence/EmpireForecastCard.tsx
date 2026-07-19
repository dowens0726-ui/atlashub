import AtlasIntelligencePanel from "./AtlasIntelligencePanel";
import AtlasMetricCard from "./AtlasMetricCard";
import AtlasStatusBadge from "./AtlasStatusBadge";

import type { EmpireForecast } from "@/app/intelligence";

type EmpireForecastCardProps = {
  forecast: EmpireForecast;
};

type ForecastTone =
  | "emerald"
  | "cyan"
  | "violet"
  | "amber";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getRiskTone(risk: string): ForecastTone {
  const normalized = risk.toLowerCase();

  if (
    normalized.includes("low") ||
    normalized.includes("safe")
  ) {
    return "emerald";
  }

  if (
    normalized.includes("high") ||
    normalized.includes("aggressive")
  ) {
    return "amber";
  }

  return "cyan";
}

export default function EmpireForecastCard({
  forecast,
}: EmpireForecastCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-sky-400/20 bg-zinc-950 shadow-2xl shadow-sky-950/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        <header className="border-b border-zinc-800/80 pb-7">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
              Empire Forecast
            </p>

            <AtlasStatusBadge tone="cyan">
              Forecast Active
            </AtlasStatusBadge>
          </div>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Projected Empire Impact
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
            Atlas projects how your next strategic decision will influence your
            empire&apos;s growth, finances, unlocks, and long-term progression.
          </p>
        </header>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <AtlasMetricCard
            label="Empire Score"
            value={`${forecast.currentScore} → ${forecast.projectedScore}`}
            detail="Projected growth"
            tone="violet"
          />

          <AtlasMetricCard
            label="Cash Forecast"
            value={`${formatCurrency(
              forecast.currentCash
            )} → ${formatCurrency(
              forecast.projectedCash
            )}`}
            detail="Estimated balance"
            tone="cyan"
          />

          <AtlasMetricCard
            label="Income Gain"
            value={formatCurrency(forecast.incomeGain)}
            detail="Expected increase"
            tone="emerald"
          />

          <AtlasMetricCard
            label="Unlocks"
            value={`+${forecast.unlocks}`}
            detail="New opportunities"
            tone="violet"
          />

          <AtlasMetricCard
            label="Risk"
            value={forecast.risk}
            detail="Exposure"
            tone={getRiskTone(forecast.risk)}
          />
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-2">
          <AtlasIntelligencePanel
            eyebrow="Forecast Outlook"
            title="Projected future"
            tone="cyan"
          >
            <p className="text-sm leading-7 text-zinc-300">
              {forecast.outlook}
            </p>
          </AtlasIntelligencePanel>

          <AtlasIntelligencePanel
            eyebrow="Atlas Strategy"
            title="Recommended approach"
            tone="emerald"
          >
            <p className="text-sm leading-7 text-zinc-300">
              {forecast.strategy}
            </p>
          </AtlasIntelligencePanel>
        </div>
      </div>
    </section>
  );
}