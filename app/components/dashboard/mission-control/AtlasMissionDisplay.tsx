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
  pipelineStatusLabel,
  pipelineIndicatorClasses,
  urgencyLabel,
  shouldActNow,
  stage,
  coachingResponse,
  operatingSummary,
}: AtlasMissionDisplayProps) {
  const normalizedEmpireScore =
    clampPercentage(
      empireScore
    );

  const normalizedConfidence =
    clampPercentage(
      confidence
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

      <div className="relative flex h-full min-h-[620px] flex-col p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-cyan-300">
              Atlas Mission Display
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Live strategic command visualization
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

        <div className="relative mt-7 flex min-h-[320px] items-center justify-center">
          <div
            aria-hidden="true"
            className="atlas-mission-display__scanner pointer-events-none absolute inset-x-6 top-1/2 h-px"
          />

          <div
            aria-hidden="true"
            className="atlas-mission-display__orbit atlas-mission-display__orbit--outer absolute rounded-full border border-cyan-300/10"
          />

          <div
            aria-hidden="true"
            className="atlas-mission-display__orbit atlas-mission-display__orbit--middle absolute rounded-full border border-violet-300/10"
          />

          <div
            aria-hidden="true"
            className="atlas-mission-display__orbit atlas-mission-display__orbit--inner absolute rounded-full border border-emerald-300/10"
          />

          <div
            className="atlas-mission-display__core relative flex h-56 w-56 items-center justify-center rounded-full p-[8px]"
            style={{
              background:
                `conic-gradient(
                  rgb(34 211 238) 0%,
                  rgb(52 211 153) ${normalizedConfidence}%,
                  rgba(255,255,255,0.055) ${normalizedConfidence}%,
                  rgba(255,255,255,0.025) 100%
                )`,
            }}
          >
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full border border-white/[0.09] bg-zinc-950/95 shadow-[inset_0_0_55px_rgba(34,211,238,0.08)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-5 rounded-full border border-cyan-300/10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-10 rounded-full border border-violet-300/10"
              />

              <span className="text-[0.58rem] font-black uppercase tracking-[0.3em] text-cyan-300">
                Atlas Core
              </span>

              <span className="mt-3 text-6xl font-black tracking-[-0.08em] text-white">
                {normalizedConfidence}
              </span>

              <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Confidence
              </span>

              <span className="mt-4 rounded-full border border-cyan-400/15 bg-cyan-400/[0.07] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-cyan-200">
                {confidenceLabel}
              </span>
            </div>
          </div>

          <div className="absolute left-0 top-8 rounded-xl border border-white/[0.07] bg-black/45 px-3 py-2 backdrop-blur-md">
            <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Empire
            </p>

            <p className="mt-1 text-sm font-black text-emerald-200">
              {normalizedEmpireScore}/100
            </p>
          </div>

          <div className="absolute right-0 top-14 rounded-xl border border-white/[0.07] bg-black/45 px-3 py-2 text-right backdrop-blur-md">
            <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Grade
            </p>

            <p className="mt-1 text-sm font-black text-white">
              {empireGrade}
            </p>
          </div>

          <div className="absolute bottom-8 left-2 rounded-xl border border-white/[0.07] bg-black/45 px-3 py-2 backdrop-blur-md">
            <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Stage
            </p>

            <p className="mt-1 max-w-[120px] truncate text-sm font-black text-violet-200">
              {stage}
            </p>
          </div>

          <div className="absolute bottom-5 right-0 rounded-xl border border-white/[0.07] bg-black/45 px-3 py-2 text-right backdrop-blur-md">
            <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Posture
            </p>

            <p
              className={[
                "mt-1 text-sm font-black",
                shouldActNow
                  ? "text-amber-200"
                  : "text-cyan-200",
              ].join(" ")}
            >
              {urgencyLabel}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
            <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Empire Condition
            </p>

            <p className="mt-2 text-xl font-black text-white">
              {empireStatus}
            </p>

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

            <p
              className={[
                "mt-2 text-xl font-black",
                shouldActNow
                  ? "text-amber-200"
                  : "text-cyan-200",
              ].join(" ")}
            >
              {shouldActNow
                ? "Execute"
                : "Planned"}
            </p>

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Atlas has classified this as a {urgencyLabel.toLowerCase()} decision.
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
