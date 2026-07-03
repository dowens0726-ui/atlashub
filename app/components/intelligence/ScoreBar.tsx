type ScoreBarProps = {
  label: string;
  value: number;
};

export default function ScoreBar({ label, value }: ScoreBarProps) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-300">{label}</span>
        <span className="text-sm font-bold text-amber-400">
          {safeValue}/100
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-700"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}