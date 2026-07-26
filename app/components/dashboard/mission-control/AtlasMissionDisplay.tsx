import AtlasNeuralCommandCore from "./AtlasNeuralCommandCore";


type AtlasMissionDisplayProps = {
  empireScore:
    number;

  empireGrade:
    string;

  empireStatus:
    string;

  confidence:
    number;

  confidenceLabel:
    string;

  pipelineStatus:
    string;

  pipelineStatusLabel:
    string;

  pipelineIndicatorClasses:
    string;

  urgencyLabel:
    string;

  shouldActNow:
    boolean;

  stage:
    string;

  cash:
    number;

  coachingResponse:
    string;

  operatingSummary:
    string;
};


function clampPercentage(
  value:
    number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        value
      )
    )
  );
}


export default function AtlasMissionDisplay({
  empireScore,
  empireGrade,
  empireStatus,
  confidence,
  confidenceLabel,
  pipelineStatus,
  pipelineStatusLabel,
  pipelineIndicatorClasses,
  urgencyLabel,
  shouldActNow,
  stage,
  cash,
  coachingResponse,
  operatingSummary,
}: AtlasMissionDisplayProps) {
  const normalizedEmpireScore =
    clampPercentage(
      empireScore
    );

  return (
    <aside className="atlas-mission-display relative overflow-hidden border-t border-white/[0.07] bg-white/[0.018] xl:border-l xl:border-t-0">
      <div
        aria-hidden="true"
        className="atlas-mission-display__ambient pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-display__grid pointer-events-none absolute inset-0 opacity-55"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent"
      />

      <div className="relative flex h-full min-h-[600px] flex-col p-5 sm:p-6 lg:p-7 2xl:min-h-[640px]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-cyan-300">
              Atlas Neural Command Core
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Live empire intelligence visualization
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5">
            <span
              aria-hidden="true"
              className={[
                "h-2 w-2 rounded-full",
                pipelineIndicatorClasses,
              ].join(" ")}
            />

            <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-zinc-300">
              {pipelineStatusLabel}
            </span>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <AtlasNeuralCommandCore
            empireScore={normalizedEmpireScore}
            confidence={confidence}
            cash={cash}
            stage={stage}
            pipelineStatus={pipelineStatus}
            pipelineStatusLabel={pipelineStatusLabel}
            shouldActNow={shouldActNow}
            urgencyLabel={urgencyLabel}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
            <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Empire Condition
            </p>

            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-xl font-black text-white">
                {empireStatus}
              </p>

              <span className="text-xs font-black text-emerald-200">
                {empireGrade}
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 transition-[width] duration-700"
                style={{
                  width:
                    `${normalizedEmpireScore}%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
            <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Decision State
            </p>

            <div className="mt-2 flex items-end justify-between gap-3">
              <p
                className={[
                  "text-xl font-black",
                  shouldActNow
                    ? "text-amber-200"
                    : "text-cyan-200",
                ].join(" ")}
              >
                {shouldActNow
                  ? "Execute"
                  : "Planned"}
              </p>

              <span className="text-xs font-black text-zinc-400">
                {confidenceLabel}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Atlas classified this as a {urgencyLabel.toLowerCase()} decision.
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-white/[0.07] bg-black/25 p-4">
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-violet-300">
            Atlas Coaching
          </p>

          <p className="mt-3 text-sm font-semibold leading-6 text-zinc-200">
            {coachingResponse}
          </p>
        </div>

        <div className="mt-3 rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4">
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Operating Condition
          </p>

          <p className="mt-2 text-xs leading-5 text-zinc-400">
            {operatingSummary}
          </p>
        </div>
      </div>
    </aside>
  );
}

