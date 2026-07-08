import { cn } from "@/app/lib/cn";

type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
};

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

export default function ProgressBar({
  value,
  label,
  showValue = true,
  className,
}: ProgressBarProps) {
  const progress = clampProgress(value);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-4 text-sm">
          {label ? (
            <span className="font-medium text-zinc-300">{label}</span>
          ) : (
            <span />
          )}

          {showValue ? (
            <span className="font-bold text-amber-400">{progress}%</span>
          ) : null}
        </div>
      )}

      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-amber-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}