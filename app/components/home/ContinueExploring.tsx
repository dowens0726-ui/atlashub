"use client";

import Link from "next/link";
import { useRecentlyViewed } from "@/app/hooks/useRecentlyViewed";

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
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Continue Exploring
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Nothing viewed yet
        </h2>

        <p className="mt-3 max-w-xl text-zinc-400">
          Start exploring vehicles, missions and weapons to build your personal dashboard.
        </p>

        <Link
          href="/map"
          className="mt-6 inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-bold text-zinc-950 transition hover:scale-105"
        >
          Open Explorer →
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Continue Exploring
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Pick up where you left off
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recent.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={item.href}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:-translate-y-1 hover:border-emerald-400"
          >
            <div className="text-3xl">
              {icons[item.type]}
            </div>

            <p className="mt-4 text-xs uppercase tracking-wider text-emerald-400">
              {item.type}
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {item.title}
            </h3>

            <p className="mt-4 font-semibold text-emerald-400">
              Continue →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}