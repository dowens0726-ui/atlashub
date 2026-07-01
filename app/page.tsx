"use client";

import AtlasDashboard from "./components/home/AtlasDashboard";
import Container from "./components/ui/Container";
import Hero from "./components/home/Hero";
import AtlasStats from "./components/home/AtlasStats";
import FeaturedContent from "./components/home/FeaturedContent";
import RecentlyAdded from "./components/home/RecentlyAdded";
import Features from "./components/home/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <div className="grid items-start gap-10 py-16 lg:grid-cols-2">
          <Hero />

          <FeaturedContent />
        </div>

        <AtlasStats />

        <AtlasDashboard />

        <RecentlyAdded />

        <Features />
      </Container>
    </main>
  );
}