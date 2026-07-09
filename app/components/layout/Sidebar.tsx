"use client";

import { useEffect, useState } from "react";

import {
  Logo,
  NavigationItem,
  NavigationSection,
} from "@/app/components/layout";

import { GlassPanel } from "@/app/components/design-system";

import { useDashboard } from "@/app/hooks/useDashboard";

export default function Sidebar() {
  const dashboard = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="hidden min-h-screen w-80 shrink-0 border-r border-white/10 bg-zinc-950/90 p-6 backdrop-blur-xl lg:block">
      <Logo />

      {mounted ? (
        <div className="mt-8">
          <GlassPanel
            title="Empire Score"
            subtitle="Live overview of your current empire position."
            className="border-amber-400/20 bg-amber-400/[0.03]"
          >
            <div className="flex items-end gap-3">
              <p className="text-6xl font-black text-white">
                {dashboard.empire.overallScore}
              </p>

              <p className="pb-2 text-sm font-black uppercase tracking-wider text-amber-400">
                Grade {dashboard.empire.overallGrade}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <SidebarStat
                label="Cash"
                value={`$${dashboard.summary.cash.toLocaleString()}`}
              />

              <SidebarStat
                label="Businesses"
                value={dashboard.profile.ownedBusinesses.length.toString()}
              />

              <SidebarStat
                label="Playstyle"
                value={dashboard.profile.playstyle}
                accent
              />
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
                Today's Mission
              </p>

              <p className="mt-3 text-sm font-bold leading-6 text-white">
                {dashboard.recommendation?.title ??
                  "Continue building your empire"}
              </p>
            </div>
          </GlassPanel>
        </div>
      ) : (
        <div className="mt-8 h-[360px] rounded-3xl border border-white/10 bg-white/[0.03]" />
      )}

      <nav className="mt-10 space-y-8">
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

function SidebarStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-500">{label}</span>

      <span
        className={`text-sm font-black ${
          accent ? "text-cyan-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}