import type {
  DashboardModel,
} from "@/app/services";

import CapitalIntelligencePanel from "./CapitalIntelligencePanel";
import EmpireHealthPanel from "./EmpireHealthPanel";
import ProgressRoadmapPanel from "./ProgressRoadmapPanel";
import AtlasSignalsPanel from "./AtlasSignalsPanel";

type AtlasInstrumentClusterProps = {
  dashboard:
    DashboardModel;
};

export default function AtlasInstrumentCluster({
  dashboard,
}: AtlasInstrumentClusterProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#030712]/90 p-4 shadow-[0_35px_110px_-58px_rgba(34,211,238,0.55)] sm:p-5 lg:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_4%,rgba(251,191,36,0.075),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(34,211,238,0.075),transparent_31%),radial-gradient(circle_at_62%_92%,rgba(139,92,246,0.06),transparent_30%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
      />

      <div className="relative">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-amber-300">
                Executive Instrument Cluster
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.055] px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.18em] text-emerald-200">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]"
                />

                Empire synchronized
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
              Live Empire Operations
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
              Executive telemetry for empire health, deployable capital,
              portfolio expansion, and strategic progression.
            </p>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:min-w-[390px]">
            <div className="rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3.5">
              <p className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-zinc-600">
                Current Stage
              </p>

              <p className="mt-1.5 truncate text-base font-black text-white">
                {dashboard.summary.stage}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.025] px-4 py-3.5">
              <p className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-zinc-600">
                Player Strategy
              </p>

              <p className="mt-1.5 truncate text-base font-black text-cyan-200">
                {dashboard.profile.playstyle}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-5 grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]">
          <EmpireHealthPanel
            empire={dashboard.empire}
          />

          <div className="grid min-w-0 gap-5">
            <CapitalIntelligencePanel
              dashboard={dashboard}
            />

            <ProgressRoadmapPanel
              dashboard={dashboard}
            />
          </div>
        </div>

        <div className="mt-5">
          <AtlasSignalsPanel
            dashboard={dashboard}
          />
        </div>
      </div>
    </section>
  );
}