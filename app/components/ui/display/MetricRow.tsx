import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type MetricRowProps = {
  label: string;
  value: ReactNode;
  helper?: string;
  className?: string;
};

export default function MetricRow({
  label,
  value,
  helper,
  className,
}: MetricRowProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-zinc-800 py-3 last:border-b-0",
        className
      )}
    >
      <div>
        <p className="text-sm text-zinc-500">{label}</p>
        {helper ? <p className="mt-1 text-xs text-zinc-600">{helper}</p> : null}
      </div>

      <div className="text-right font-bold text-white">{value}</div>
    </div>
  );
}