import type { ReactNode } from "react";

type AtlasCardProps = {
  children: ReactNode;
  className?: string;
};

export default function AtlasCard({
  children,
  className = "",
}: AtlasCardProps) {
  return (
    <div
      className={`group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 ${className}`}
    >
      {children}
    </div>
  );
}