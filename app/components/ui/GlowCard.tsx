import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type GlowCardAccent = "amber" | "emerald" | "cyan" | "zinc";

type GlowCardProps = {
  children: ReactNode;
  accent?: GlowCardAccent;
  className?: string;
};

const glowStyles: Record<GlowCardAccent, string> = {
  amber:
    "border-amber-400/20 before:bg-amber-400/10",
  emerald:
    "border-emerald-400/20 before:bg-emerald-400/10",
  cyan:
    "border-cyan-400/20 before:bg-cyan-400/10",
  zinc:
    "border-zinc-800 before:bg-zinc-500/5",
};

export default function GlowCard({
  children,
  accent = "zinc",
  className,
}: GlowCardProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2rem] border bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6",
        "before:pointer-events-none before:absolute before:-right-20 before:-top-20 before:h-64 before:w-64 before:rounded-full before:blur-3xl",
        "transition-all duration-300",
        glowStyles[accent],
        className
      )}
    >
      <div className="relative">
        {children}
      </div>
    </section>
  );
}