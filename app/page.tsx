"use client";

import AtlasSearchPanel from "./components/search/AtlasSearchPanel";

import Hero from "./components/home/Hero";
import FeaturedContent from "./components/home/FeaturedContent";
import AtlasDashboard from "./components/home/AtlasDashboard";
import AtlasStats from "./components/home/AtlasStats";
import RecentlyAdded from "./components/home/RecentlyAdded";
import Features from "./components/home/Features";

import Container from "./components/ui/Container";
import QuickLaunch from "./components/home/QuickLaunch";
import ContinueExploring from "./components/home/ContinueExploring";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Hero />

          <div className="mt-16">

<div className="mt-16">
  <ContinueExploring />
</div>

  <QuickLaunch />
</div>

          <AtlasSearchPanel />
        </div>

        <div className="mt-16">

<div className="mt-16">
  <ContinueExploring />
</div>

          <FeaturedContent />
        </div>

        <div className="mt-16">
          <AtlasStats />
        </div>

        <div className="mt-16">
          <AtlasDashboard />
        </div>

        <div className="mt-16">
          <RecentlyAdded />
        </div>

        <div className="mt-16">
          <Features />
        </div>
      </Container>
    </main>
  );
}