import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type CardPadding = "none" | "sm" | "md" | "lg";

type CardAccent = "amber" | "emerald" | "sky" | "red" | "zinc";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
  hover?: boolean;
  accent?: CardAccent;
};

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

const accentClasses: Record<CardAccent, string> = {
  amber: "border-amber-400/40",
  emerald: "border-emerald-400/40",
  sky: "border-sky-400/40",
  red: "border-red-400/40",
  zinc: "border-zinc-800",
};

export default function Card({
  children,
  className,
  padding = "md",
  hover = false,
  accent = "zinc",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-zinc-900",
        paddingClasses[padding],
        accentClasses[accent],
        hover && "transition hover:-translate-y-1 hover:border-amber-400",
        className
      )}
    >
      {children}
    </div>
  );
}