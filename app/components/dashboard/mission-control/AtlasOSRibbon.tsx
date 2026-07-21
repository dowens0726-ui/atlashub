type AtlasOSRibbonProps = {
  pipelineStatusLabel: string;
  pipelineIndicatorClasses: string;
  cash: number;
  stage: string;
  empireScore: number;
  confidence: number;
};


type RibbonMetricProps = {
  label: string;
  value: string;
  accent?:
    | "cyan"
    | "emerald"
    | "violet";
};


function RibbonMetric({
  label,
  value,
  accent = "cyan",
}: RibbonMetricProps) {
  const valueClassName =
    accent === "emerald"
      ? "text-emerald-200"
      : accent === "violet"
        ? "text-violet-200"
        : "text-cyan-100";


  return (
    <div className="min-w-0 px-4 py-3 sm:px-5">
      <p className="truncate text-[0.56rem] font-bold uppercase tracking-[0.24em] text-zinc-600">
        {label}
      </p>

      <p
        className={[
          "mt-1 truncate text-xs font-black uppercase tracking-[0.12em]",
          valueClassName,
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}


export default function AtlasOSRibbon({
  pipelineStatusLabel,
  pipelineIndicatorClasses,
  cash,
  stage,
  empireScore,
  confidence,
}: AtlasOSRibbonProps) {
  return (
    <section
      aria-label="Atlas operating status"
      className="atlas-os-ribbon relative overflow-hidden rounded-[1.35rem] border border-cyan-400/15 bg-zinc-950/85 shadow-[0_20px_70px_-45px_rgba(34,211,238,0.8)] backdrop-blur-xl"
    >
      <div
        aria-hidden="true"
        className="atlas-os-ribbon__scan pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
      />

      <div className="relative flex min-w-max items-stretch divide-x divide-white/[0.06] overflow-x-auto">
        <div className="flex min-w-[210px] items-center gap-3 px-5 py-3.5">
          <span
            aria-hidden="true"
            className={[
              "h-2.5 w-2.5 shrink-0 rounded-full",
              pipelineIndicatorClasses,
            ].join(" ")}
          />

          <div className="min-w-0">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.3em] text-cyan-300">
              Atlas OS
            </p>

            <p className="mt-1 truncate text-xs font-bold text-white">
              {pipelineStatusLabel}
            </p>
          </div>
        </div>

        <RibbonMetric
          label="Network"
          value="Connected"
          accent="emerald"
        />

        <RibbonMetric
          label="Region"
          value="Vice City"
          accent="violet"
        />

        <RibbonMetric
          label="Mission State"
          value="Session Ready"
        />

        <RibbonMetric
          label="Empire"
          value={`${empireScore}/100`}
          accent="emerald"
        />

        <RibbonMetric
          label="Atlas Confidence"
          value={`${confidence}%`}
        />

        <RibbonMetric
          label="Available Capital"
          value={`$${cash.toLocaleString()}`}
          accent="emerald"
        />

        <RibbonMetric
          label="Progression"
          value={stage}
          accent="violet"
        />
      </div>
    </section>
  );
}
