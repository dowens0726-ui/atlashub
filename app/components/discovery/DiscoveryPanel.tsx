import type { ReactNode } from "react";

type DiscoveryPanelProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function DiscoveryPanel({
  children,
  title = "Search & Filters",
  description = "Refine Atlas results using custom discovery parameters.",
}: DiscoveryPanelProps) {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-6 shadow-xl">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Atlas Control Module
        </p>

        <h3 className="mt-3 text-2xl font-black text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {children}
      </div>
    </section>
  );
}