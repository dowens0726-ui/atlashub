type ComparisonRowProps = {
  label: string;
  leftValue: number | string;
  rightValue: number | string;
  leftBarValue?: number;
  rightBarValue?: number;
  max?: number;
  suffix?: string;
  lowerIsBetter?: boolean;
};

export default function ComparisonRow({
  label,
  leftValue,
  rightValue,
  leftBarValue,
  rightBarValue,
  max = 100,
  suffix = "",
  lowerIsBetter = false,
}: ComparisonRowProps) {
  const leftPercent =
    typeof leftBarValue === "number"
      ? Math.min((leftBarValue / max) * 100, 100)
      : 0;

  const rightPercent =
    typeof rightBarValue === "number"
      ? Math.min((rightBarValue / max) * 100, 100)
      : 0;

  const leftWins =
    typeof leftBarValue === "number" &&
    typeof rightBarValue === "number" &&
    (lowerIsBetter ? leftBarValue < rightBarValue : leftBarValue > rightBarValue);

  const rightWins =
    typeof leftBarValue === "number" &&
    typeof rightBarValue === "number" &&
    (lowerIsBetter ? rightBarValue < leftBarValue : rightBarValue > leftBarValue);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-emerald-400">
        {label}
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className={`text-xl font-bold ${leftWins ? "text-emerald-400" : ""}`}>
            {leftValue}
            {suffix}
            {leftWins && " ✓"}
          </p>

          {leftBarValue !== undefined && (
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${leftPercent}%` }}
              />
            </div>
          )}
        </div>

        <div>
          <p className={`text-xl font-bold ${rightWins ? "text-emerald-400" : ""}`}>
            {rightValue}
            {suffix}
            {rightWins && " ✓"}
          </p>

          {rightBarValue !== undefined && (
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${rightPercent}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}