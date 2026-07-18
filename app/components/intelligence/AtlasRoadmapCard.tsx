import Link from "next/link";

import type {
  StrategicRoadmap,
  StrategicRoadmapStage,
} from "@/app/intelligence";

type AtlasRoadmapCardProps = {
  roadmap: StrategicRoadmap;

  actionLabel?: string;

  href?: string;
};

const stageLabels: Record<
  StrategicRoadmapStage,
  string
> = {
  Immediate: "Immediate",
  Next: "Next",
  Then: "Then",
  Later: "Later",
  "Long Term": "Long Term",
};

function getStageNumber(
  index: number
): string {
  return String(
    index + 1
  ).padStart(
    2,
    "0"
  );
}

export default function AtlasRoadmapCard({
  roadmap,
  actionLabel = "View Recommended Strategy",
  href,
}: AtlasRoadmapCardProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
      <header className="border-b border-zinc-800 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-cyan-500/10 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
              Atlas Strategic Roadmap
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {roadmap.objective}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
              Follow this progression in order to convert the current Atlas
              recommendation into measurable long-term empire growth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-64">
            <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Priority
              </p>

              <p className="mt-2 text-lg font-black text-white">
                {roadmap.priority}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Confidence
              </p>

              <p className="mt-2 text-lg font-black text-emerald-400">
                {roadmap.confidence}%
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 sm:p-8">
        <ol className="relative space-y-0">
          {roadmap.steps.map(
            (
              step,
              index
            ) => {
              const isLast =
                index ===
                roadmap.steps.length - 1;

              return (
                <li
                  key={`${step.stage}-${step.title}`}
                  className="relative grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4rem_1fr] sm:gap-6"
                >
                  <div className="relative flex justify-center">
                    {!isLast ? (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 top-12 w-px bg-gradient-to-b from-emerald-500/60 to-zinc-800"
                      />
                    ) : null}

                    <div
                      className={[
                        "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-xs font-black",
                        step.completed
                          ? "border-emerald-400 bg-emerald-400 text-zinc-950"
                          : index === 0
                            ? "border-emerald-400 bg-emerald-400/10 text-emerald-300"
                            : "border-zinc-700 bg-zinc-900 text-zinc-400",
                      ].join(
                        " "
                      )}
                    >
                      {step.completed
                        ? "✓"
                        : getStageNumber(
                            index
                          )}
                    </div>
                  </div>

                  <article
                    className={[
                      "mb-6 rounded-2xl border p-5 transition-colors sm:p-6",
                      index === 0
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-zinc-800 bg-zinc-900/40",
                    ].join(
                      " "
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p
                          className={[
                            "text-xs font-bold uppercase tracking-[0.2em]",
                            index === 0
                              ? "text-emerald-400"
                              : "text-zinc-500",
                          ].join(
                            " "
                          )}
                        >
                          {stageLabels[
                            step.stage
                          ]}
                        </p>

                        <h3 className="mt-2 text-lg font-black text-white sm:text-xl">
                          {step.title}
                        </h3>
                      </div>

                      {index === 0 ? (
                        <span className="w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                          Current Focus
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
                      {step.description}
                    </p>
                  </article>
                </li>
              );
            }
          )}
        </ol>

        {href ? (
          <div className="mt-2 border-t border-zinc-800 pt-6">
            <Link
              href={href}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              {actionLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}