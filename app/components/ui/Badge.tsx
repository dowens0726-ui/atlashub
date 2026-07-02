import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-300 ${className}`}
    >
      {children}
    </span>
  );
}