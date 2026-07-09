"use client";

import { AppShell } from "@/app/components/layout";
import { AtlasAdvisor } from "@/app/components/advisor";
import Container from "@/app/components/ui/Container";
import { usePlayerProfile } from "@/app/hooks/usePlayerProfile";

export default function AdvisorPage() {
  const { profile } = usePlayerProfile();

  return (
    <AppShell>
      <Container size="wide" className="py-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-8 shadow-2xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
              Atlas Intelligence
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight text-white md:text-6xl">
              Empire Advisor
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
              Your personal strategist for building wealth,
              expanding your empire, and choosing your next move.
            </p>
          </div>
        </section>

        <AtlasAdvisor profile={profile} />
      </Container>
    </AppShell>
  );
}