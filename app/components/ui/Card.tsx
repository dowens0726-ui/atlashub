import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900 p-5",
        className
      )}
    >
      {children}
    </div>
  );
}