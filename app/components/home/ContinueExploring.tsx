"use client";

import Link from "next/link";
import { useRecentlyViewed } from "@/app/hooks/useRecentlyViewed";
import SectionHeader from "../ui/SectionHeader";

const icons = {
  mission: "🎯",
  vehicle: "🚗",
  weapon: "🔫",
};

export default function ContinueExploring() {
  const { recent } = useRecentlyViewed();

  if (recent.length === 0) {
    return (
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <SectionHeader
          eyebrow="Continue Exploring"
          title="Nothing viewed yet"
          description="Start exploring vehicles, missions, and weapons to build your personal dashboard."
        />

        <Link
          href="/map"
          className="inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-bold text-zinc-950 transition hover:scale-105"
        >
          Open Explorer →
        </Link>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader
        eyebrow="Continue Exploring"
        title="Pick up where you left off"
        description="Recently viewed missions, vehicles, and weapons stay ready when you return."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recent.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={item.href}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="text-4xl transition-transform duration-200 group-hover:scale-110">
              {icons[item.type]}
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {item.type}
            </p>

            <h3 className="mt-1 text-xl font-bold">{item.title}</h3>

            <p className="mt-5 font-semibold text-emerald-400 transition-transform duration-200 group-hover:translate-x-1">
              Continue →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}