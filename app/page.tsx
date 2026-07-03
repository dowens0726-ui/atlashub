"use client";

import AtlasSearchPanel from "./components/search/AtlasSearchPanel";

import Hero from "./components/home/Hero";
import QuickLaunch from "./components/home/QuickLaunch";
import ContinueExploring from "./components/home/ContinueExploring";
import FeaturedContent from "./components/home/FeaturedContent";
import AtlasStats from "./components/home/AtlasStats";
import AtlasDashboard from "./components/home/AtlasDashboard";
import RecentlyAdded from "./components/home/RecentlyAdded";
import Features from "./components/home/Features";

import Container from "./components/ui/Container";
import AtlasSection from "./components/ui/AtlasSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Hero />
          <AtlasSearchPanel />
        </div>

        <AtlasSection>
          <QuickLaunch />
        </AtlasSection>

        <AtlasSection>
          <ContinueExploring />
        </AtlasSection>

        <AtlasSection>
          <FeaturedContent />
        </AtlasSection>

        <AtlasSection>
          <AtlasStats />
        </AtlasSection>

        <AtlasSection>
          <AtlasDashboard />
        </AtlasSection>

        <AtlasSection>
          <RecentlyAdded />
        </AtlasSection>

        <AtlasSection>
          <Features />
        </AtlasSection>
      </Container>
    </main>
  );
}