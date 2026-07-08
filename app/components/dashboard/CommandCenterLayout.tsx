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
    <div className="space-y-8">
      {hero}

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        {overview}
        {atlas}
      </div>

      {session}

      <div className="grid gap-8 xl:grid-cols-2">
        {insights}
        {objectives}
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {activity}
        {achievements}
      </div>
    </div>
  );
}