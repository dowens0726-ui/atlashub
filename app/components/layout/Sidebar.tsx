"use client";

import { useEffect, useState } from "react";

import {
  Logo,
  NavigationItem,
  NavigationSection,
} from "@/app/components/layout";

import { useDashboard } from "@/app/hooks/useDashboard";

export default function Sidebar() {
  const dashboard = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-zinc-800 bg-zinc-950/95 p-5 lg:block">
      <Logo />

      {mounted ? (
        <div className="mt-8 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
            Empire Score
          </p>

          <div className="mt-3 flex items-end gap-2">
            <p className="text-5xl font-black text-white">
              {dashboard.empire.overallScore}
            </p>

            <p className="pb-1 text-sm font-bold text-amber-400">
              Grade {dashboard.empire.overallGrade}
            </p>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Cash</span>
              <span className="font-bold text-white">
                ${dashboard.summary.cash.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Businesses</span>
              <span className="font-bold text-white">
                {dashboard.profile.ownedBusinesses.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Playstyle</span>
              <span className="font-bold text-amber-400">
                {dashboard.profile.playstyle}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Today's Mission
            </p>

            <p className="mt-2 text-sm font-semibold text-white">
              {dashboard.recommendation?.title ??
                "Continue building your empire"}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 h-[330px] rounded-3xl border border-zinc-800 bg-zinc-900/50" />
      )}

      <nav className="mt-8 space-y-8">
        <NavigationSection title="My Empire">
          <NavigationItem href="/dashboard" label="Empire Command" icon="⌂" />
          <NavigationItem href="/profile" label="Empire" icon="◇" />
          <NavigationItem href="/planner" label="Mission Planner" icon="⌁" />
          <NavigationItem href="/advisor" label="Advisor" icon="✦" />
        </NavigationSection>

        <NavigationSection title="Explore">
          <NavigationItem href="/vehicles" label="Vehicles" icon="◈" />
          <NavigationItem
            href="/data/businesses"
            label="Businesses"
            icon="▣"
          />
          <NavigationItem href="/weapons" label="Weapons" icon="⌖" />
          <NavigationItem href="/missions" label="Missions" icon="◎" />
          <NavigationItem href="/map" label="Map" icon="⌾" />
          <NavigationItem href="/explorer" label="Explorer" icon="◇" />
          <NavigationItem href="/rankings" label="Rankings" icon="▲" />
          <NavigationItem href="/compare" label="Compare" icon="⇄" />
        </NavigationSection>

        <NavigationSection title="Atlas">
          <NavigationItem href="/roadmap" label="Roadmap" icon="≋" />
          <NavigationItem href="/changelog" label="Changelog" icon="✎" />
          <NavigationItem href="/about" label="About" icon="ⓘ" />
        </NavigationSection>
      </nav>
    </aside>
  );
}