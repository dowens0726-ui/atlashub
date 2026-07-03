type StatBarProps = {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  color?: "emerald" | "blue" | "amber" | "red";
};

const colorClasses = {
  emerald: "bg-emerald-400",
  blue: "bg-sky-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
};

export default function StatBar({
  label,
  value,
  max = 100,
  suffix = "",
  color = "emerald",
}: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm transition-all duration-200 hover:border-zinc-700">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          {label}
        </span>

        <span className="text-lg font-bold text-white">
          {value}
          <span className="text-emerald-400">{suffix}</span>
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`${colorClasses[color]} h-full rounded-full transition-all duration-700 ease-out`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-zinc-500">
        <span>0</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  );
}