type WorldStatusMetricProps = {
  label: string;
  value: string;
  icon: string;
};

export default function WorldStatusMetric({
  label,
  value,
  icon,
}: WorldStatusMetricProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>

        <span className="text-xs uppercase tracking-[0.25em] text-white/50">
          {label}
        </span>
      </div>

      <span className="font-semibold text-white">
        {value}
      </span>
    </div>
  );
}
