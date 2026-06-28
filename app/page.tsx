"use client";

import { useEffect, useState } from "react";
import FeatureCard from "./components/FeatureCard";

export default function Home() {
  const searchPlaceholders = [
    "🔍 Search anything in GTA VI...",
    "🚗 Find the fastest car...",
    "💰 Best money methods...",
    "🔫 Weapon locations...",
    "⭐ Hidden collectibles...",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((currentIndex) =>
        currentIndex === searchPlaceholders.length - 1
          ? 0
          : currentIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between border-b border-zinc-800 pb-6">
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">
      ATLAS
    </p>

    <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
      HUB
    </h1>

    <p className="mt-2 text-sm text-zinc-400">
      Play Anything.
      <span className="font-semibold text-white"> Find Everything.</span>
    </p>
  </div>

  <div className="hidden gap-6 text-sm text-zinc-400 md:flex">
    <a href="/missions" className="hover:text-white">Missions</a>
    <a href="/vehicles" className="hover:text-white">Vehicles</a>
    <a href="/weapons" className="hover:text-white">Weapons</a>
    <a href="/news" className="hover:text-white">News</a>
  </div>
</nav>

        <div className="grid flex-1 items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
  Atlas Companion for GTA VI
</p>

            <h2 className="text-6xl font-black leading-tight md:text-7xl">
  MASTER GTA VI.
</h2>

<p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300">
  <span className="font-semibold text-white">
    Spend less time searching. More time playing.
  </span>
  <br />
  Atlas Companion is AtlasHub's premium companion for GTA VI.

Find missions, vehicles, weapons, collectibles, businesses, and everything else—fast.
</p>

<div className="mt-10 max-w-2xl">
  <input
    type="text"
    placeholder={searchPlaceholders[placeholderIndex]}
    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-lg text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none"
  />
</div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/missions"
                className="rounded-xl bg-emerald-500 px-6 py-3 text-center font-bold text-zinc-950 hover:bg-emerald-400"
              >
                Explore Missions
              </a>

              <a
                href="/map"
                className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-bold hover:border-zinc-500"
              >
                View Map
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl">
            <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
  Popular Searches
</p>

<div className="mt-4 grid gap-3">
  {[
    "🔥 Fastest Car",
    "💰 Best Money Method",
    "🚁 Buzzard Location",
    "🔫 Weapon Locations",
    "⭐ Hidden Businesses",
  ].map((search) => (
    <div
      key={search}
      className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-300 transition-all duration-200 hover:border-emerald-400 hover:bg-zinc-800 hover:scale-[1.02] cursor-pointer"
    >
      {search}
    </div>
  ))}
</div>
            </div>

            <div className="grid gap-3">
              {[
                "Mission walkthroughs",
                "Vehicle database",
                "Weapon locations",
                "Interactive map",
                "100% completion tracker",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
              <section className="border-t border-zinc-800 py-20">
  <h2 className="mb-12 text-center text-4xl font-bold">
    Why Atlas Companion?
  </h2>

  <div className="grid gap-6 md:grid-cols-3">
    {[
      {
        title: "⚡ Fast Answers",
        text: "Find exactly what you need without searching through videos or forums.",
      },
      {
        title: "🗺 Interactive Maps",
        text: "Discover vehicles, businesses, collectibles, and hidden locations.",
      },
      {
        title: "🎯 Mission Guides",
        text: "Complete every mission with clear, spoiler-conscious walkthroughs.",
      },
      {
        title: "🚗 Complete Database",
        text: "Every vehicle, weapon, and business in one searchable place.",
      },
      {
        title: "⭐ Track Progress",
        text: "Work toward 100% completion with built-in tracking tools.",
      },
      {
        title: "🚀 Built for Players",
        text: "Everything is designed to get you back into the game faster.",
      },
    ].map((feature) => (
  <FeatureCard
    key={feature.title}
    title={feature.title}
    description={feature.text}
  />
))}
  </div><footer className="mt-20 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
  <p>© 2026 AtlasHub</p>
  <p className="mt-2">
    Spend less time searching. More time playing.
  </p>
</footer>
        </section>
      </section>
    </main>
  );
}
