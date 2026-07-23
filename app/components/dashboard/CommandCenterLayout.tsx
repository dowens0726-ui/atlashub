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
          eyebrow="Strategic Command"
          title="Atlas Recommendations"
          description="Your highest-value opportunities for this session, generated from your empire, player identity, and historical progression."
        >
          {copilot}
        </AtlasCommandSection>
      ) : null}

      <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/20 p-3 shadow-[0_32px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-5 lg:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(34,211,238,0.10),transparent_36%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.08),transparent_34%)]" />

        <div className="relative">
          <header className="mb-6 flex flex-col gap-4 border-b border-white/[0.07] px-2 pb-6 sm:px-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />

                <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-cyan-200/80">
                  Atlas OS Workspace
                </p>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                Executive Workspace
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Monitor empire health, strategic position, and live Atlas decision intelligence from one unified command deck.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />

              <span className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-cyan-100">
                Systems Synchronized
              </span>
            </div>
          </header>

          <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <AtlasCommandSection
              variant="default"
              eyebrow="Empire Monitor"
              title="Strategic Position"
              description="Track overall progression, current operating posture, and empire health."
            >
              <div className="space-y-8">
                {overview}
              </div>
            </AtlasCommandSection>

            <AtlasCommandRail
              status="AI Online"
              title="Atlas Decision Engine"
              description="Live recommendations generated from strategy, memory, forecasting, and adaptive intelligence."
            >
              {atlas}
            </AtlasCommandRail>
          </div>
        </div>
      </section>

      <AtlasCommandSection
        variant="primary"
        eyebrow="Operations Console"
        title="Session Execution"
        description="Your recommended objectives, mission sequence, and execution plan for this play session."
      >
        {session}
      </AtlasCommandSection>

      <section className="grid gap-8 xl:grid-cols-2">
        <AtlasCommandSection
          eyebrow="Intelligence Analysis"
          title="Strategic Signals"
          description="High-level trends, opportunities, and intelligence affecting your empire."
        >
          {insights}
        </AtlasCommandSection>

        <AtlasCommandSection
          eyebrow="Mission Queue"
          title="Current Priorities"
          description="The highest-impact objectives Atlas recommends completing next."
        >
          {objectives}
        </AtlasCommandSection>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <AtlasCommandSection
          eyebrow="Operational History"
          title="Recent Activity"
          description="Your latest actions, session changes, and meaningful empire events."
        >
          {activity}
        </AtlasCommandSection>

        <AtlasCommandSection
          eyebrow="Empire Progress"
          title="Milestones & Achievements"
          description="Track completed accomplishments and long-term progression."
        >
          {achievements}
        </AtlasCommandSection>
      </section>
    </AtlasCommandCenter>
  );
}
