import {
  GlassPanel,
  HeroBanner,
  HeroMetrics,
} from "@/app/components/design-system";

import {
  buildAtlasBriefing,
  buildAtlasGreeting,
  buildAtlasImpact,
} from "@/app/intelligence";

import type { DashboardModel } from "@/app/services";

type CommandCenterHeroProps = {
  dashboard: DashboardModel;
};

export default function CommandCenterHero({
  dashboard,
}: CommandCenterHeroProps) {
  const greeting = buildAtlasGreeting(dashboard.profile);
  const impact = buildAtlasImpact(dashboard.recommendation?.confidence ?? 90);
  const briefing = buildAtlasBriefing(dashboard.profile, impact);

  const heroMetrics = [
    {
      label: "Empire Health",
      value: `${dashboard.empire.overallScore}`,
    },
    {
      label: "Empire Grade",
      value: dashboard.empire.overallGrade,
    },
    {
      label: "Current Stage",
      value: dashboard.summary.stage,
    },
    {
      label: "Cash",
      value: `$${dashboard.summary.cash.toLocaleString()}`,
    },
  ];

  const briefingMetrics = [
    {
      label: "Recommended Session",
      value: `${briefing.recommendedSessionMinutes} min`,
    },
    {
      label: "Objective",
      value: briefing.objective,
    },
  ];

  return (
    <HeroBanner
      eyebrow={`${greeting.greeting}, Commander`}
      title="Empire Command Center"
      subtitle={greeting.subtitle}
    >
      <div className="space-y-8">
        <GlassPanel
          title={briefing.title}
          subtitle={briefing.summary}
          className="border-cyan-400/20 bg-cyan-400/[0.04]"
        >
          <HeroMetrics metrics={briefingMetrics} columns={2} />
        </GlassPanel>

        <HeroMetrics metrics={heroMetrics} columns={4} />
      </div>
    </HeroBanner>
  );
}