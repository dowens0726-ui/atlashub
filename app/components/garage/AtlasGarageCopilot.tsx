import Link from "next/link";

import type {
  GarageCopilotHealth,
  GarageCopilotReport,
} from "@/app/intelligence/garage-copilot.engine";

type AtlasGarageCopilotProps = {
  report: GarageCopilotReport;
};

function getHealthStyles(
  health: GarageCopilotHealth
): string {
  switch (health) {
    case "Excellent":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";

    case "Good":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";

    case "Fair":
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";

    case "Needs Attention":
      return "border-rose-400/30 bg-rose-400/10 text-rose-300";

    default:
      return "border-zinc-700 bg-zinc-800/70 text-zinc-300";
  }
}

function ReportList({
  items,
  emptyMessage,
}: {
  items: string[];
  emptyMessage: string;
}) {
  if (
    items.length ===
    0
  ) {
    return (
      <p className="text-sm leading-6 text-zinc-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map(
        (
          item,
          index
        ) => (
          <li
            key={`${item}-${index}`}
            className="flex gap-3 text-sm leading-6 text-zinc-300"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
            />

            <span>
              {item}
            </span>
          </li>
        )
      )}
    </ul>
  );
}

export default function AtlasGarageCopilot({
  report,
}: AtlasGarageCopilotProps) {
  return (
    <article
      aria-labelledby="atlas-garage-copilot-heading"
      className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-zinc-950 shadow-2xl shadow-emerald-950/20"
    >
      <header className="border-b border-zinc-800 bg-gradient-to-br from-emerald-400/10 via-zinc-950 to-zinc-950 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
              Atlas Copilot
            </p>

            <h2
              id="atlas-garage-copilot-heading"
              className="mt-3 text-2xl font-black text-white sm:text-3xl"
            >
              {report.title}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
              {report.summary}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              Overall Health
            </span>

            <span
              className={`inline-flex rounded-full border px-4 py-2 text-sm font-black ${getHealthStyles(
                report.overallHealth
              )}`}
            >
              {report.overallHealth}
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-px bg-zinc-800 lg:grid-cols-2">
        <section className="bg-zinc-950 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Garage Strengths
          </p>

          <h3 className="mt-2 text-xl font-black text-white">
            What is working
          </h3>

          <div className="mt-5">
            <ReportList
              items={
                report.strengths
              }
              emptyMessage="Add more vehicles to establish measurable garage strengths."
            />
          </div>
        </section>

        <section className="bg-zinc-950 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Garage Weaknesses
          </p>

          <h3 className="mt-2 text-xl font-black text-white">
            What needs attention
          </h3>

          <div className="mt-5">
            <ReportList
              items={
                report.weaknesses
              }
              emptyMessage="Atlas has not identified any major weaknesses."
            />
          </div>
        </section>
      </div>

      <section className="border-t border-zinc-800 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          Strategic Priorities
        </p>

        <h3 className="mt-2 text-xl font-black text-white">
          Your next objectives
        </h3>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {report.priorities.map(
            (
              priority,
              index
            ) => (
              <div
                key={`${priority}-${index}`}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
              >
                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-zinc-950">
                    {index + 1}
                  </span>

                  <p className="text-sm font-semibold leading-6 text-zinc-200">
                    {priority}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {report.recommendation ? (
        <section className="border-t border-zinc-800 bg-emerald-400/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                Strategic Recommendation
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                {
                  report
                    .recommendation
                    .vehicleName
                }
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-300">
                {
                  report
                    .recommendation
                    .reason
                }
              </p>

              {report.recommendation
                .capabilityImprovements
                .length >
              0 ? (
                <div className="mt-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    Projected Improvements
                  </p>

                  <div className="mt-3">
                    <ReportList
                      items={
                        report
                          .recommendation
                          .capabilityImprovements
                      }
                      emptyMessage="No projected improvements are available."
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 lg:w-72">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Projected Score
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {report
                    .recommendation
                    .projectedScore ??
                    "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Score Gain
                </p>

                <p className="mt-2 text-3xl font-black text-emerald-400">
                  {report
                    .recommendation
                    .scoreIncrease !==
                  null
                    ? `+${
                        report
                          .recommendation
                          .scoreIncrease
                      }`
                    : "—"}
                </p>
              </div>

              <Link
                href={`/vehicles/${report.recommendation.vehicleSlug}`}
                className="col-span-2 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                View Recommended Vehicle
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-zinc-800 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          Long-Term Roadmap
        </p>

        <h3 className="mt-2 text-xl font-black text-white">
          Build the garage in the right order
        </h3>

        <ol className="mt-6 space-y-4">
          {report.roadmap.map(
            (
              item
            ) => (
              <li
                key={`${item.priority}-${item.title}`}
                className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 pl-16"
              >
                <span className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-sm font-black text-emerald-300">
                  {item.priority}
                </span>

                <h4 className="font-black text-white">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </li>
            )
          )}
        </ol>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-900/40 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              Atlas Confidence
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Confidence increases as your garage profile becomes more complete.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="h-2 w-32 overflow-hidden rounded-full bg-zinc-800 sm:w-40"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
                style={{
                  width: `${report.confidence}%`,
                }}
              />
            </div>

            <span className="text-2xl font-black text-white">
              {report.confidence}%
            </span>
          </div>
        </div>
      </footer>
    </article>
  );
}