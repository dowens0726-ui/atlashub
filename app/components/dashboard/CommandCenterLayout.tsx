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


type AtlasNetworkStageProps = {
  number: string;

  label: string;

  description: string;

  children: ReactNode;

  final?: boolean;
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
      <AtlasNetworkStage
        number="01"
        label="Command Brief"
        description="Atlas establishes the active mission context and current operating posture."
      >
        <AtlasCommandSection variant="transparent">
          {hero}
        </AtlasCommandSection>

        {changes ? (
          <div className="mt-6">
            <AtlasCommandSection variant="transparent">
              {changes}
            </AtlasCommandSection>
          </div>
        ) : null}
      </AtlasNetworkStage>

      {copilot ? (
        <AtlasNetworkStage
          number="02"
          label="Strategic Direction"
          description="Atlas converts live intelligence into the highest-value recommendation for this session."
        >
          <AtlasCommandSection
            variant="primary"
            eyebrow="Strategic Command"
            title="Atlas Recommendations"
            description="Your highest-value opportunities for this session, generated from your empire, player identity, and historical progression."
          >
            {copilot}
          </AtlasCommandSection>
        </AtlasNetworkStage>
      ) : null}

      <AtlasNetworkStage
        number="03"
        label="Executive Intelligence"
        description="Empire health, strategic position, and decision intelligence synchronize inside the executive workspace."
      >
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
      </AtlasNetworkStage>

      <AtlasNetworkStage
        number="04"
        label="Session Operations"
        description="Atlas converts strategic direction into an executable mission sequence for the current play session."
        final
      >
        <AtlasCommandSection
          variant="primary"
          eyebrow="Operations Console"
          title="Session Execution"
          description="Your recommended objectives, mission sequence, and execution plan for this play session."
        >
          {session}
        </AtlasCommandSection>
      </AtlasNetworkStage>

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


function AtlasNetworkStage({
  number,
  label,
  description,
  children,
  final = false,
}: AtlasNetworkStageProps) {
  return (
    <section className="relative lg:grid lg:grid-cols-[5.75rem_minmax(0,1fr)] lg:gap-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 top-0 hidden h-full w-24 lg:block"
      >
        <div className="absolute left-[2.86rem] top-5 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-300/20 bg-[#07101f]/95 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-xl">
          <div className="absolute inset-1 rounded-full border border-cyan-300/[0.08]" />

          <span className="relative text-[0.58rem] font-black tracking-[0.16em] text-cyan-200">
            {number}
          </span>

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-[#07101f] bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]" />
        </div>

        {!final ? (
          <>
            <div className="absolute bottom-[-3rem] left-[2.86rem] top-16 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/25 via-violet-300/12 to-transparent" />

            <div className="absolute bottom-[-2.4rem] left-[2.86rem] h-14 w-px -translate-x-1/2 overflow-hidden">
              <div className="h-5 w-px animate-pulse bg-gradient-to-b from-transparent via-cyan-200/80 to-transparent" />
            </div>
          </>
        ) : null}
      </div>

      <div className="hidden pt-4 lg:block">
        <p className="text-[0.52rem] font-black uppercase tracking-[0.24em] text-cyan-300/75">
          {label}
        </p>

        <p className="mt-2 max-w-[4.75rem] text-[0.62rem] leading-4 text-zinc-600">
          {description}
        </p>
      </div>

      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-3 lg:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] text-[0.52rem] font-black tracking-[0.14em] text-cyan-200">
            {number}
          </span>

          <div>
            <p className="text-[0.56rem] font-black uppercase tracking-[0.22em] text-cyan-300/80">
              {label}
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              {description}
            </p>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
