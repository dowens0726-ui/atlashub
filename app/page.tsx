"use client";

import AtlasSearch from "./components/AtlasSearch";
import FeatureCard from "./components/FeatureCard";
import Button from "./components/ui/Button";
import Container from "./components/ui/Container";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <div className="grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Atlas Companion for GTA VI
            </p>

            <h1 className="text-6xl font-black leading-tight md:text-7xl">
              MASTER GTA VI.
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300">
              <span className="font-semibold text-white">
                Spend less time searching. More time playing.
              </span>
              <br />
              AtlasHub is your premium companion for missions, vehicles,
              weapons, collectibles, businesses, and everything else.
            </p>

            <div className="mt-10">
              <AtlasSearch />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/missions">Explore Missions</Button>
              <Button href="/map" variant="secondary">
                View Map
              </Button>
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
                    className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-300 transition-all duration-200 hover:scale-[1.02] hover:border-emerald-400 hover:bg-zinc-800"
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
            Why AtlasHub?
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
          </div>
        </section>
      </Container>
    </main>
  );
}