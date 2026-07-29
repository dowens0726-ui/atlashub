type ExecutiveMetricRowProps = {
  label: string;
  value: number;
  grade?: string;
  detail?: string;
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

function getMetricTone(
  value: number
): string {
  if (value >= 80) {
    return "from-emerald-300 via-cyan-300 to-cyan-200";
  }

  if (value >= 60) {
    return "from-cyan-300 via-violet-300 to-violet-200";
  }

  if (value >= 40) {
    return "from-amber-300 via-cyan-300 to-cyan-200";
  }

  return "from-rose-300 via-amber-300 to-amber-200";
}

export default function ExecutiveMetricRow({
  label,
  value,
  grade,
  detail,
}: ExecutiveMetricRowProps) {
  const normalizedValue =
    clampPercentage(value);

  const tone =
    getMetricTone(
      normalizedValue
    );

  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3.5 transition duration-200 hover:border-cyan-300/15 hover:bg-cyan-300/[0.025]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-zinc-300">
            {label}
          </p>

          {detail ? (
            <p className="mt-1 truncate text-[0.64rem] font-semibold text-zinc-600">
              {detail}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm font-black text-white">
            {normalizedValue}
          </span>

          {grade ? (
            <span className="rounded-md border border-amber-300/15 bg-amber-300/[0.06] px-1.5 py-0.5 text-[0.58rem] font-black text-amber-200">
              {grade}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
        <div
          className={[
            "h-full rounded-full bg-gradient-to-r transition-[width] duration-700",
            tone,
          ].join(" ")}
          style={{
            width:
              `${normalizedValue}%`,
          }}
        />
      </div>
    </div>
  );
}