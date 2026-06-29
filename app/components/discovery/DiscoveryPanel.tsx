import { ReactNode } from "react";

type DiscoveryPanelProps = {
  children: ReactNode;
};

export default function DiscoveryPanel({
  children,
}: DiscoveryPanelProps) {
  return (
    <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        {children}
      </div>
    </section>
  );
}