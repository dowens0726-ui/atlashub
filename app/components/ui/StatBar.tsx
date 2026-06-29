type StatBarProps = {
  label: string;
  value: number;
  max: number;
  suffix?: string;
};

export default function StatBar({
  label,
  value,
  max,
  suffix = "",
}: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-white">{label}</span>

        <span className="text-sm text-emerald-400">
          {value}
          {suffix}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}