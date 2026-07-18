import type { ReactNode } from "react";

type CommandCenterLayoutProps = {
  hero: ReactNode;
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
    <div className="space-y-12">
      <section>{hero}</section>

      {copilot ? (
        <section>{copilot}</section>
      ) : null}

      <section className="grid gap-8 2xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          {overview}
        </div>

        <div className="space-y-8">
          {atlas}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/5 bg-white/[0.01] p-1">
        {session}
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        {insights}
        {objectives}
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        {activity}
        {achievements}
      </section>
    </div>
  );
}