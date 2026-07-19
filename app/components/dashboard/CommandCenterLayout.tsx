import type {
  ReactNode,
} from "react";

import AtlasCommandCenter from "./AtlasCommandCenter";
import AtlasCommandRail from "./AtlasCommandRail";
import AtlasCommandSection from "./AtlasCommandSection";


type CommandCenterLayoutProps = {
  hero: ReactNode;

  changes?: ReactNode;

  copilot?: ReactNode;

  overview: ReactNode;

  atlas: ReactNode;

  session: ReactNode;

  insights: ReactNode;

  objectives: ReactNode;

  activity: ReactNode;

  achievements: ReactNode;
};


export default function CommandCenterLayout({
  hero,
  changes,
  copilot,
  overview,
  atlas,
  session,
  insights,
  objectives,
  activity,
  achievements,
}: CommandCenterLayoutProps) {
  return (
    <AtlasCommandCenter>
      <AtlasCommandSection variant="transparent">
        {hero}
      </AtlasCommandSection>

      {changes ? (
        <AtlasCommandSection variant="transparent">
          {changes}
        </AtlasCommandSection>
      ) : null}

      {copilot ? (
        <AtlasCommandSection
          variant="primary"
          eyebrow="Strategic Focus"
          title="Atlas Recommendations"
          description="Your highest-value opportunities for this session based on your empire, player identity, and historical progression."
        >
          {copilot}
        </AtlasCommandSection>
      ) : null}

      <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <AtlasCommandSection
          variant="default"
          eyebrow="Empire Pulse"
          title="Empire Overview"
          description="Monitor your overall progression, current status, and strategic health."
        >
          <div className="space-y-8">
            {overview}
          </div>
        </AtlasCommandSection>

        <AtlasCommandRail
          status="AI Online"
          title="Atlas Intelligence Core"
          description="Live recommendations generated from your strategy, memory, forecasting, and adaptive intelligence."
        >
          {atlas}
        </AtlasCommandRail>
      </section>

      <AtlasCommandSection
        variant="primary"
        eyebrow="Operations"
        title="Today's Session"
        description="Your recommended objectives and execution plan for this play session."
      >
        {session}
      </AtlasCommandSection>

      <section className="grid gap-8 xl:grid-cols-2">
        <AtlasCommandSection
          eyebrow="Intelligence"
          title="Empire Insights"
          description="High-level trends and strategic observations."
        >
          {insights}
        </AtlasCommandSection>

        <AtlasCommandSection
          eyebrow="Objectives"
          title="Current Priorities"
          description="The most impactful goals to complete next."
        >
          {objectives}
        </AtlasCommandSection>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <AtlasCommandSection
          eyebrow="Activity"
          title="Recent Activity"
          description="Your latest actions and empire events."
        >
          {activity}
        </AtlasCommandSection>

        <AtlasCommandSection
          eyebrow="Achievements"
          title="Progress & Milestones"
          description="Track accomplishments and long-term progression."
        >
          {achievements}
        </AtlasCommandSection>
      </section>
    </AtlasCommandCenter>
  );
}