import type { ReactNode } from "react";

type CommandCenterLayoutProps = {
  hero: ReactNode;
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
  overview,
  atlas,
  session,
  insights,
  objectives,
  activity,
  achievements,
}: CommandCenterLayoutProps) {
  return (
    <div className="space-y-10">
      <section>{hero}</section>

      <section className="grid gap-8 2xl:grid-cols-[1fr_1.15fr]">
        <div className="space-y-8">{overview}</div>

        <div className="space-y-8">{atlas}</div>
      </section>

      <section>{session}</section>

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