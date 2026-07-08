import { Card } from "@/app/components/ui";
import { buildAtlasBriefing, buildAtlasGreeting, buildAtlasImpact } from "@/app/intelligence";
import type { DashboardModel } from "@/app/services";

type CommandCenterHeroProps = {
  dashboard: DashboardModel;
};

export default function CommandCenterHero({ dashboard }: CommandCenterHeroProps) {
  const greeting = buildAtlasGreeting(dashboard.profile);
  const impact = buildAtlasImpact(dashboard.recommendation?.confidence ?? 90);
  const briefing = buildAtlasBriefing(dashboard.profile, impact);

  return (
    <Card
      padding="lg"
      accent="amber"
      className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950"
    >
      <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-400">
          {greeting.greeting}, Commander
        </p>

        <h1 className="mt-4 text-6xl font-black tracking-tight text-white">
          Empire Command Center
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
          {greeting.subtitle}
        </p>

        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            {briefing.title}
          </p>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-300">
            {briefing.summary}
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Metric
              label="Recommended Session"
              value={`${briefing.recommendedSessionMinutes} min`}
            />

            <Metric label="Objective" value={briefing.objective} />
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <Metric label="Empire Health" value={`${dashboard.empire.overallScore}`} />
          <Metric label="Empire Grade" value={dashboard.empire.overallGrade} />
          <Metric label="Current Stage" value={dashboard.summary.stage} />
          <Metric label="Cash" value={`$${dashboard.summary.cash.toLocaleString()}`} />
        </div>
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </p>

      <p className="mt-3 truncate text-2xl font-black text-white">{value}</p>
    </div>
  );
}