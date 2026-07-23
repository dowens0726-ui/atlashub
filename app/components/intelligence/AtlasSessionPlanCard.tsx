import type {
  AtlasSessionPlan,
  SessionReasoning,
} from "@/app/intelligence";


type AtlasSessionPlanCardProps = {
  plan:
    AtlasSessionPlan;

  reasoning?:
    SessionReasoning;
};


function formatCurrency(
  value:
    number
): string {
  return new Intl.NumberFormat(
    "en-US",
    {
      style:
        "currency",

      currency:
        "USD",

      notation:
        "compact",

      maximumFractionDigits:
        1,
    }
  ).format(
    value
  );
}


function getDifficulty(
  time:
    number
): string {
  if (
    time <= 45
  ) {
    return "Easy";
  }

  if (
    time <= 90
  ) {
    return "Medium";
  }

  return "Advanced";
}


function normalizePercentage(
  value:
    number
): number {
  const percentage =
    value <= 1
      ? value * 100
      : value;

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        percentage
      )
    )
  );
}


function getReadiness(
  confidence:
    number
): {
  label:
    string;

  summary:
    string;
} {
  if (
    confidence >= 85
  ) {
    return {
      label:
        "Optimal",

      summary:
        "Atlas has high confidence in the current operation route.",
    };
  }

  if (
    confidence >= 70
  ) {
    return {
      label:
        "Ready",

      summary:
        "The operation is ready, with minor variables still under review.",
    };
  }

  return {
    label:
      "Review",

    summary:
      "Atlas recommends reviewing the route before committing resources.",
  };
}


export default function AtlasSessionPlanCard({
  plan,
  reasoning,
}: AtlasSessionPlanCardProps) {
  const difficulty =
    getDifficulty(
      plan.estimatedTimeMinutes
    );

  const confidence =
    normalizePercentage(
      reasoning?.confidence ??
        82
    );

  const readiness =
    getReadiness(
      confidence
    );

  const routeSteps =
    plan.steps;

  const primaryStep =
    routeSteps[0];

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-[linear-gradient(145deg,rgba(3,7,18,0.94),rgba(4,10,20,0.88)_58%,rgba(16,185,129,0.055))] shadow-[0_34px_110px_-72px_rgba(52,211,153,0.9)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-emerald-300/[0.08] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-cyan-300/[0.05] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/65 to-transparent"
      />

      <header className="relative border-b border-white/[0.06] px-5 py-5 sm:px-6 lg:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.85)]"
              />

              <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-emerald-300">
                Atlas Operations
              </p>

              <span className="hidden h-3 w-px bg-white/10 sm:block" />

              <p className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-zinc-500">
                Session Command Console
              </p>
            </div>

            <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl">
              {plan.title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-zinc-400">
              {reasoning?.objective ??
                "Atlas has prepared an optimized session route based on your current empire position."}
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
            <StatusMetric
              label="Operation"
              value="Ready"
              accent="text-emerald-200"
            />

            <StatusMetric
              label="Phase"
              value="Planning"
              accent="text-cyan-200"
            />

            <StatusMetric
              label="Runtime"
              value={`${plan.estimatedTimeMinutes} min`}
            />

            <StatusMetric
              label="Confidence"
              value={`${confidence}%`}
              accent="text-emerald-200"
            />
          </div>
        </div>
      </header>

      <div className="relative p-5 sm:p-6 lg:p-7">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <div className="min-w-0">
            <div className="rounded-[1.6rem] border border-white/[0.06] bg-black/25 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[0.58rem] font-black uppercase tracking-[0.26em] text-emerald-300">
                    Active Operation Route
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Atlas-ordered actions for the current session
                  </p>
                </div>

                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.18em] text-emerald-200">
                  {routeSteps.length}{" "}
                  {routeSteps.length === 1
                    ? "Phase"
                    : "Phases"}
                </span>
              </div>

              <div className="mt-6">
                {routeSteps.map(
                  (
                    step,
                    index
                  ) => {
                    const isPrimary =
                      index === 0;

                    const isFinal =
                      index ===
                      routeSteps.length -
                        1;

                    return (
                      <div
                        key={
                          step.order
                        }
                        className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4"
                      >
                        <div className="relative flex justify-center">
                          {!isFinal ? (
                            <div
                              aria-hidden="true"
                              className="absolute bottom-0 top-11 w-px bg-gradient-to-b from-emerald-300/35 via-cyan-300/15 to-white/[0.04]"
                            />
                          ) : null}

                          <div
                            className={[
                              "relative z-10 flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black",
                              isPrimary
                                ? "border-emerald-300/30 bg-emerald-300 text-zinc-950 shadow-[0_0_24px_rgba(110,231,183,0.28)]"
                                : "border-white/[0.09] bg-zinc-950/85 text-zinc-300",
                            ].join(
                              " "
                            )}
                          >
                            {String(
                              step.order
                            ).padStart(
                              2,
                              "0"
                            )}
                          </div>
                        </div>

                        <article
                          className={[
                            "mb-4 overflow-hidden rounded-2xl border p-4 transition sm:p-5",
                            isPrimary
                              ? "border-emerald-300/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.09),rgba(255,255,255,0.025))] shadow-[0_22px_70px_-52px_rgba(52,211,153,0.9)]"
                              : "border-white/[0.06] bg-white/[0.025] hover:border-cyan-300/15",
                          ].join(
                            " "
                          )}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p
                              className={[
                                "text-[0.54rem] font-black uppercase tracking-[0.22em]",
                                isPrimary
                                  ? "text-emerald-300"
                                  : "text-zinc-500",
                              ].join(
                                " "
                              )}
                            >
                              {isPrimary
                                ? "Primary Objective"
                                : `Queued Phase ${step.order}`}
                            </p>

                            <span
                              className={[
                                "rounded-full border px-2.5 py-1 text-[0.5rem] font-black uppercase tracking-[0.16em]",
                                isPrimary
                                  ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200"
                                  : "border-white/[0.07] bg-black/20 text-zinc-500",
                              ].join(
                                " "
                              )}
                            >
                              {isPrimary
                                ? "Current"
                                : "Queued"}
                            </span>
                          </div>

                          <h3 className="mt-3 text-lg font-black leading-7 text-white sm:text-xl">
                            {
                              step
                                .recommendation
                                .title
                            }
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-zinc-400">
                            {
                              step
                                .recommendation
                                .summary
                            }
                          </p>
                        </article>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-emerald-300/15 bg-emerald-300/[0.045]">
              <div className="border-b border-white/[0.06] px-5 py-4">
                <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-emerald-300">
                  Mission Readiness
                </p>
              </div>

              <div className="p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-black tracking-[-0.04em] text-white">
                      {confidence}%
                    </p>

                    <p className="mt-1 text-sm font-bold text-emerald-200">
                      {readiness.label}
                    </p>
                  </div>

                  <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1.5 text-[0.54rem] font-black uppercase tracking-[0.18em] text-emerald-200">
                    Route Ready
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-200 shadow-[0_0_18px_rgba(110,231,183,0.45)] transition-[width] duration-700 ease-out"
                    style={{
                      width:
                        `${confidence}%`,
                    }}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {readiness.summary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SummaryMetric
                label="Expected Return"
                value={formatCurrency(
                  plan.estimatedProfit
                )}
                accent="text-emerald-200"
              />

              <SummaryMetric
                label="Session Length"
                value={`${plan.estimatedTimeMinutes} min`}
              />

              <SummaryMetric
                label="Difficulty"
                value={difficulty}
                accent="text-violet-200"
              />

              <SummaryMetric
                label="Route Phases"
                value={String(
                  routeSteps.length
                )}
                accent="text-cyan-200"
              />
            </div>

            {reasoning ? (
              <div className="rounded-[1.5rem] border border-white/[0.06] bg-black/25 p-5">
                <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-cyan-300">
                  Atlas Analysis
                </p>

                <div className="mt-4 space-y-5">
                  <AnalysisBlock
                    label="Why This Route"
                    value={
                      reasoning.explanation
                    }
                  />

                  <AnalysisBlock
                    label="Expected Outcome"
                    value={
                      reasoning.expectedOutcome
                    }
                  />
                </div>
              </div>
            ) : null}

            {primaryStep ? (
              <div className="rounded-[1.5rem] border border-violet-300/10 bg-violet-300/[0.035] p-5">
                <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-violet-300">
                  Current Directive
                </p>

                <p className="mt-3 text-base font-black leading-6 text-white">
                  {
                    primaryStep
                      .recommendation
                      .title
                  }
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Begin with the primary objective before advancing to queued phases.
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}


function StatusMetric({
  label,
  value,
  accent =
    "text-white",
}: {
  label:
    string;

  value:
    string;

  accent?:
    string;
}) {
  return (
    <div className="min-w-[7.5rem] rounded-xl border border-white/[0.06] bg-black/25 px-3 py-2.5">
      <p className="text-[0.48rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={[
          "mt-1 text-sm font-black",
          accent,
        ].join(
          " "
        )}
      >
        {value}
      </p>
    </div>
  );
}


function SummaryMetric({
  label,
  value,
  accent =
    "text-white",
}: {
  label:
    string;

  value:
    string;

  accent?:
    string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-black/25 p-4">
      <p className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={[
          "mt-2 text-lg font-black",
          accent,
        ].join(
          " "
        )}
      >
        {value}
      </p>
    </div>
  );
}


function AnalysisBlock({
  label,
  value,
}: {
  label:
    string;

  value:
    string;
}) {
  return (
    <div>
      <p className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-300">
        {value}
      </p>
    </div>
  );
}
