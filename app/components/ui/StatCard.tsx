import type { ReactNode } from "react";
import Card from "./Card";
import { cn } from "@/app/lib/cn";

type StatCardAccent = "amber" | "emerald" | "sky" | "red" | "zinc";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  footer?: ReactNode;
  accent?: StatCardAccent;
  className?: string;
};

const valueClasses: Record<StatCardAccent, string> = {
  amber: "text-amber-400",
  emerald: "text-emerald-400",
  sky: "text-sky-400",
  red: "text-red-400",
  zinc: "text-white",
};

export default function StatCard({
  label,
  value,
  helper,
  footer,
  accent = "zinc",
  className,
}: StatCardProps) {
  return (
    <Card
      accent={accent}
      className={cn("min-w-0 overflow-hidden", className)}
    >
      <p className="text-sm text-zinc-500">{label}</p>

      <p
        className={cn(
          "mt-1 truncate text-xl font-black",
          valueClasses[accent]
        )}
      >
        {value}
      </p>

      {helper ? (
        <p className="mt-2 text-sm leading-6 text-zinc-400">{helper}</p>
      ) : null}

      {footer ? <div className="mt-4">{footer}</div> : null}
    </Card>
  );
}