import type { AtlasStrategyReport } from "@/app/intelligence";

type AtlasStrategyReportCardProps = {
  report: AtlasStrategyReport;
};

export default function AtlasStrategyReportCard({
  report,
}: AtlasStrategyReportCardProps) {
  return (
    <section className="rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
        Atlas Strategy Report
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        {report.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Atlas has combined your memory, recommendation, simulation, and
        forecast data into a strategic overview.
      </p>


      <div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-wide text-violet-400">
          Current Empire Status
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {report.empireStatus}
        </p>
      </div>


      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Current Strength
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {report.strength}
        </p>
      </div>


      <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-400">
          Recommended Move
        </p>

        <p className="mt-3 text-xl font-black text-white">
          {report.recommendedMove}
        </p>

        <div className="mt-4 space-y-2">
          {report.reasoning.map((reason) => (
            <p
              key={reason}
              className="text-sm text-zinc-300"
            >
              ✓ {reason}
            </p>
          ))}
        </div>
      </div>


      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Insight
          title="Simulation"
          value={report.simulationSummary}
        />

        <Insight
          title="Forecast"
          value={report.forecastSummary}
        />
      </div>


      <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-wide text-cyan-400">
          Next Focus
        </p>

        <p className="mt-3 text-lg font-black text-white">
          {report.nextFocus}
        </p>
      </div>
    </section>
  );
}


function Insight({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        {title}
      </p>

      <p className="mt-3 text-sm leading-6 text-zinc-300">
        {value}
      </p>
    </div>
  );
}