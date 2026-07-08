import type { EmpireForecast } from "@/app/intelligence";

type EmpireForecastCardProps = {
  forecast: EmpireForecast;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function EmpireForecastCard({
  forecast,
}: EmpireForecastCardProps) {
  return (
    <section className="rounded-[2rem] border border-sky-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-400">
        Empire Forecast
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Projected Impact
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Stat
          label="Empire Score"
          value={`${forecast.currentScore} → ${forecast.projectedScore}`}
        />
        <Stat
          label="Cash Forecast"
          value={`${formatCurrency(forecast.currentCash)} → ${formatCurrency(
            forecast.projectedCash
          )}`}
        />
        <Stat label="Income Gain" value={formatCurrency(forecast.incomeGain)} />
        <Stat label="Unlocks" value={`+${forecast.unlocks}`} />
        <Stat label="Risk" value={forecast.risk} />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 truncate text-xl font-black text-white">{value}</p>
    </div>
  );
}