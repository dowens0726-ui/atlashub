import type {
  AtlasRouteContext,
} from "@/app/intelligence";


export type AtlasBriefingRecommendationModel = {
  title:
    string;

  explanation?:
    string | null;

  confidence?:
    number | null;

  urgency?:
    string | null;
};


export type AtlasBriefingHeroProps = {
  routeContext:
    AtlasRouteContext;

  empireScore:
    number;

  empireGrade:
    string;

  recommendation?:
    AtlasBriefingRecommendationModel | null;

  statusLabel:
    string;

  loading:
    boolean;
};


function formatLabel(
  value:
    string
): string {
  return value
    .replace(
      /[_-]+/g,
      " "
    )
    .split(" ")
    .filter(Boolean)
    .map(
      (
        segment
      ) =>
        segment.charAt(0)
          .toUpperCase() +
        segment.slice(1)
    )
    .join(" ");
}


function formatEntityName(
  entitySlug:
    string
): string {
  return formatLabel(
    entitySlug
  );
}


function formatPercentage(
  value:
    number
): string {
  const normalizedValue =
    value <= 1
      ? value * 100
      : value;

  return `${Math.round(
    normalizedValue
  )}%`;
}


function getContextDescription(
  routeContext:
    AtlasRouteContext
): string {
  if (
    routeContext.entitySlug
  ) {
    return [
      "Atlas is analyzing",
      formatEntityName(
        routeContext.entitySlug
      ),
      "within your current empire strategy.",
    ].join(" ");
  }

  switch (
    routeContext.section
  ) {
    case "dashboard":
      return "Atlas is reviewing your empire position, current objectives, and strongest available next move.";

    case "planner":
      return "Atlas is ready to build an efficient progression plan around your available resources and priorities.";

    case "businesses":
      return "Evaluate income potential, acquisition timing, portfolio fit, and long-term empire impact.";

    case "vehicles":
      return "Evaluate performance, utility, ownership value, purchase timing, and strategic alternatives.";

    case "properties":
      return "Evaluate utility, access, ownership priority, and how each property supports your progression.";

    case "weapons":
      return "Optimize your loadout around combat role, mission requirements, and current progression.";

    case "missions":
      return "Evaluate mission value, difficulty, preparation requirements, and progression impact.";

    case "collections":
      return "Track collection progress, identify missing targets, and prioritize the highest-value opportunities.";

    case "rankings":
      return "Compare opportunities and identify the strongest upgrade available for your current position.";

    case "copilot":
      return "Ask Atlas to evaluate your empire, compare opportunities, or determine your strongest next move.";

    default:
      return "Atlas is using your current location and empire state to guide the next strategic decision.";
  }
}


export default function AtlasBriefingHero({
  routeContext,
  empireScore,
  empireGrade,
  recommendation,
  statusLabel,
  loading,
}: AtlasBriefingHeroProps) {
  const entityName =
    routeContext.entitySlug
      ? formatEntityName(
          routeContext.entitySlug
        )
      : null;

  const strategicFocus =
    formatLabel(
      routeContext.strategicFocus
    );

  const domain =
    formatLabel(
      routeContext.domain
    );


  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 shadow-2xl shadow-cyan-950/10 sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-blue-500/[0.07] blur-3xl"
      />

      <div className="relative">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                aria-hidden="true"
                className={[
                  "h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]",
                  loading
                    ? "animate-pulse"
                    : "",
                ].join(" ")}
              />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Atlas Intelligence
              </p>

              <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                {domain}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {routeContext.title}
            </h1>

            {entityName ? (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Current Subject
                </p>

                <p className="mt-2 text-2xl font-black text-cyan-100 sm:text-3xl">
                  {entityName}
                </p>
              </div>
            ) : null}

            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              {getContextDescription(
                routeContext
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-zinc-300">
                Focus: {strategicFocus}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-zinc-300">
                {routeContext.depth ===
                "detail"
                  ? "Entity Analysis"
                  : "Strategic Overview"}
              </span>
            </div>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 xl:w-[28rem]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Empire Score
              </p>

              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-3xl font-black text-white">
                  {Math.round(
                    empireScore
                  )}
                </p>

                <p className="text-sm font-bold text-cyan-200">
                  Grade {empireGrade}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Brain Status
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={[
                    "h-2 w-2 rounded-full bg-cyan-300",
                    loading
                      ? "animate-pulse"
                      : "",
                  ].join(" ")}
                />

                <p className="text-sm font-bold text-white">
                  {statusLabel}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.055] p-4 sm:col-span-2">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Atlas Recommendation
              </p>

              {recommendation ? (
                <>
                  <p className="mt-3 text-lg font-black text-white">
                    {recommendation.title}
                  </p>

                  {recommendation.explanation ? (
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {recommendation.explanation}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {typeof recommendation.confidence ===
                    "number" ? (
                      <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.07] px-3 py-1 text-xs font-semibold text-cyan-100">
                        {formatPercentage(
                          recommendation.confidence
                        )} confidence
                      </span>
                    ) : null}

                    {recommendation.urgency ? (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-300">
                        {formatLabel(
                          recommendation.urgency
                        )} urgency
                      </span>
                    ) : null}
                  </div>
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Atlas is preparing a recommendation from your current empire state.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
