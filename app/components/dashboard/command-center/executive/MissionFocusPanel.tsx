import AtlasButton from "@/app/components/design-system/AtlasButton";

import ExecutiveMetrics, {
  type ExecutiveMetric,
} from "./ExecutiveMetrics";

type MissionFocusPanelProps = {
  title: string;
  summary: string;
  immediateNextStep: string;
  rationale: string;
  longTermDirection: string;
  coachingResponse: string;
  urgencyLabel: string;
  urgencyClasses: string;
  shouldActNow: boolean;
  confidence: number;
  metrics: ExecutiveMetric[];
  pipelineError?: string | null;
};

export default function MissionFocusPanel({
  title,
  summary,
  immediateNextStep,
  rationale,
  longTermDirection,
  coachingResponse,
  urgencyLabel,
  urgencyClasses,
  shouldActNow,
  confidence,
  metrics,
  pipelineError,
}: MissionFocusPanelProps) {
  return (
    <div className="max-w-5xl">
      <section className="relative overflow-hidden rounded-[1.9rem] border border-white/[0.09] bg-[linear-gradient(135deg,rgba(3,7,18,0.8),rgba(8,15,30,0.52)_58%,rgba(34,211,238,0.06))] px-5 py-6 shadow-[0_32px_100px_-66px_rgba(34,211,238,0.9)] backdrop-blur-xl sm:px-7 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-cyan-300/[0.07] blur-3xl"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] px-3 py-1.5 text-[0.58rem] font-black uppercase tracking-[0.24em] text-cyan-200">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]"
                />

                Current Operation
              </span>

              <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Atlas Mission Brief
              </p>
            </div>

            <span
              className={[
                "rounded-full border px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.18em]",
                urgencyClasses,
              ].join(" ")}
            >
              {urgencyLabel}
            </span>
          </div>

          <div className="mt-7">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.28em] text-cyan-300">
              Primary Objective
            </p>

            <h1 className="mt-3 max-w-5xl text-4xl font-black leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl 2xl:text-7xl">
              {title}
            </h1>

            <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-zinc-300 sm:text-base">
              {summary}
            </p>
          </div>

          <div className="mt-7">
            <ExecutiveMetrics metrics={metrics} />
          </div>
        </div>
      </section>

      <section className="mt-7 overflow-hidden rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(3,7,18,0.8),rgba(6,13,26,0.62)_60%,rgba(139,92,246,0.07))] shadow-[0_28px_90px_-58px_rgba(34,211,238,0.95)] backdrop-blur-xl">
        <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.85)]"
              />

              <div>
                <p className="text-[0.58rem] font-black uppercase tracking-[0.28em] text-cyan-300">
                  Mission Execution
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Atlas directive, strategic rationale, and execution controls
                </p>
              </div>
            </div>

            <span
              className={[
                "rounded-full border px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.18em]",
                urgencyClasses,
              ].join(" ")}
            >
              {shouldActNow ? "Ready to Execute" : "Strategic Window"}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-[0.55rem] font-black uppercase tracking-[0.24em] text-zinc-500">
            Recommended Action
          </p>

          <p className="mt-3 max-w-4xl text-xl font-black leading-8 text-white sm:text-2xl">
            {immediateNextStep}
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.06] bg-black/25 p-4">
              <p className="text-[0.55rem] font-black uppercase tracking-[0.22em] text-cyan-300">
                Why Atlas Chose It
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {rationale}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-black/25 p-4">
              <p className="text-[0.55rem] font-black uppercase tracking-[0.22em] text-violet-300">
                Long-Term Direction
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {longTermDirection}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-violet-300/10 bg-violet-300/[0.04] p-4">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.8)]"
              />

              <div>
                <p className="text-[0.55rem] font-black uppercase tracking-[0.22em] text-violet-300">
                  Atlas Coaching
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-zinc-200">
                  {coachingResponse}
                </p>
              </div>
            </div>
          </div>

          {pipelineError ? (
            <div className="mt-4 rounded-2xl border border-rose-400/15 bg-rose-400/[0.06] p-4">
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-rose-300">
                Pipeline Notice
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {pipelineError}
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AtlasButton href="/planner">
              Execute Atlas Plan
            </AtlasButton>

            <AtlasButton
              href="/copilot"
              variant="secondary"
            >
              Review with Copilot
            </AtlasButton>

            <div className="ml-0 rounded-xl border border-white/[0.06] bg-black/25 px-4 py-2.5 sm:ml-auto">
              <p className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Decision Confidence
              </p>

              <p className="mt-1 text-sm font-black text-cyan-100">
                {confidence}%
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}