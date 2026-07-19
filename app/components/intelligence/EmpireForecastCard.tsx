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

            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
              Forecast Active
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Projected Empire Impact
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
            Atlas projects how your next strategic decision will influence your
            empire's growth, finances, unlocks, and long-term progression.
          </p>
        </header>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <ForecastStat
            label="Empire Score"
            value={`${forecast.currentScore} → ${forecast.projectedScore}`}
            detail="Projected growth"
            tone="violet"
          />

          <ForecastStat
            label="Cash Forecast"
            value={`${formatCurrency(
              forecast.currentCash
            )} → ${formatCurrency(
              forecast.projectedCash
            )}`}
            detail="Estimated balance"
            tone="cyan"
          />

          <ForecastStat
            label="Income Gain"
            value={formatCurrency(
              forecast.incomeGain
            )}
            detail="Expected increase"
            tone="emerald"
          />

          <ForecastStat
            label="Unlocks"
            value={`+${forecast.unlocks}`}
            detail="New opportunities"
            tone="violet"
          />

          <ForecastStat
            label="Risk"
            value={forecast.risk}
            detail="Exposure"
            tone={getRiskTone(forecast.risk)}
          />
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-2">
          <ForecastPanel
            eyebrow="Forecast Outlook"
            title="Projected future"
            tone="cyan"
          >
            <p className="text-sm leading-7 text-zinc-300">
              {forecast.outlook}
            </p>
          </ForecastPanel>

          <ForecastPanel
            eyebrow="Atlas Strategy"
            title="Recommended approach"
            tone="emerald"
          >
            <p className="text-sm leading-7 text-zinc-300">
              {forecast.strategy}
            </p>
          </ForecastPanel>
        </div>
      </div>
    </section>
  );
}

function ForecastPanel({
  eyebrow,
  title,
  tone,
  children,
}: {
  eyebrow: string;
  title: string;
  tone: ForecastTone;
  children: React.ReactNode;
}) {
  const toneClasses: Record<
    ForecastTone,
    string
  > = {
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
    cyan:
      "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
    violet:
      "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
    amber:
      "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${toneClasses[tone]}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.25em]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-black text-white">
        {title}
      </h3>

      <div className="mt-4">{children}</div>
    </div>
  );
}

function ForecastStat({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: ForecastTone;
}) {
  const toneClasses: Record<
    ForecastTone,
    string
  > = {
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
    cyan:
      "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
    violet:
      "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
    amber:
      "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
  };

  return (
    <div
      className={`min-w-0 rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 ${toneClasses[tone]}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words text-xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold">
        {detail}
      </p>
    </div>
  );
}