import type {
  Vehicle,
} from "@/app/types";

import {
  buildVehicleIntelligenceProfile,
  scoreVehicle,
} from "@/app/intelligence";


type VehicleIntelligenceCardProps = {
  vehicle:
    Vehicle;
};


export default function VehicleIntelligenceCard({
  vehicle,
}: VehicleIntelligenceCardProps) {
  const scoreBreakdown =
    scoreVehicle(
      vehicle
    );

  const profile =
    buildVehicleIntelligenceProfile(
      vehicle
    );

  const {
    ratings,
    bestUses,
    strengths,
    weaknesses,
    summary,
  } = profile;


  return (
    <section className="mt-10 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-zinc-950 to-violet-500/10 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
            Atlas Vehicle Intelligence
          </p>

          <h2 className="mt-3 text-3xl font-black text-white">
            Atlas Analysis
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            {summary}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-zinc-950/70 px-6 py-5 text-center">
          <p className="text-5xl font-black text-cyan-300">
            {scoreBreakdown.score.overall}
          </p>

          <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Overall Score
          </p>
        </div>
      </div>


      <div className="mt-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-400">
          Use-Case Ratings
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RatingMetric
            label="Getaway"
            value={
              ratings.getaway
            }
          />

          <RatingMetric
            label="Off-Road"
            value={
              ratings.offRoad
            }
          />

          <RatingMetric
            label="Racing"
            value={
              ratings.racing
            }
          />

          <RatingMetric
            label="Business"
            value={
              ratings.business
            }
          />

          <RatingMetric
            label="Crew"
            value={
              ratings.crew
            }
          />

          <RatingMetric
            label="PvP"
            value={
              ratings.pvp
            }
          />

          <RatingMetric
            label="PvE"
            value={
              ratings.pve
            }
          />
        </div>
      </div>


      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <InsightList
          title="Best Uses"
          items={
            bestUses
          }
          emptyMessage="No priority use cases were identified."
          tone="primary"
        />

        <InsightList
          title="Strengths"
          items={
            strengths
          }
          emptyMessage="No standout strengths were identified."
          tone="positive"
        />

        <InsightList
          title="Considerations"
          items={
            weaknesses
          }
          emptyMessage="Atlas found no major weaknesses in the current model."
          tone="warning"
        />
      </div>


      <div className="mt-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-400">
          Core Intelligence Scores
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <ScoreMetric
            label="Performance"
            value={
              scoreBreakdown.score.performance
            }
          />

          <ScoreMetric
            label="Value"
            value={
              scoreBreakdown.score.value
            }
          />

          <ScoreMetric
            label="Utility"
            value={
              scoreBreakdown.score.utility
            }
          />

          <ScoreMetric
            label="Accessibility"
            value={
              scoreBreakdown.score.accessibility
            }
          />

          <ScoreMetric
            label="Versatility"
            value={
              scoreBreakdown.score.versatility
            }
          />
        </div>
      </div>
    </section>
  );
}


function RatingMetric({
  label,
  value,
}: {
  label:
    string;

  value:
    number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </p>

        <p className="text-2xl font-black text-white">
          {value}
        </p>
      </div>

      <p className="mt-2 text-xs font-bold text-zinc-500">
        {getRatingLabel(
          value
        )}
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-violet-400"
          style={{
            width:
              `${clampPercentage(
                value
              )}%`,
          }}
        />
      </div>
    </div>
  );
}


function ScoreMetric({
  label,
  value,
}: {
  label:
    string;

  value:
    number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </p>

        <p className="text-xl font-black text-white">
          {value}
        </p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-400"
          style={{
            width:
              `${clampPercentage(
                value
              )}%`,
          }}
        />
      </div>
    </div>
  );
}


function InsightList({
  title,
  items,
  emptyMessage,
  tone,
}: {
  title:
    string;

  items:
    string[];

  emptyMessage:
    string;

  tone:
    | "primary"
    | "positive"
    | "warning";
}) {
  const titleClassName = {
    primary:
      "text-violet-400",

    positive:
      "text-emerald-400",

    warning:
      "text-amber-400",
  }[
    tone
  ];

  const markerClassName = {
    primary:
      "bg-violet-400",

    positive:
      "bg-emerald-400",

    warning:
      "bg-amber-400",
  }[
    tone
  ];


  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
      <p
        className={`text-xs font-black uppercase tracking-[0.2em] ${titleClassName}`}
      >
        {title}
      </p>

      {items.length >
      0 ? (
        <div className="mt-4 space-y-3">
          {items.map(
            (
              item
            ) => (
              <div
                key={
                  item
                }
                className="flex items-start gap-3"
              >
                <span
                  className={`mt-2 h-2 w-2 shrink-0 rounded-full ${markerClassName}`}
                />

                <p className="text-sm leading-6 text-zinc-300">
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-zinc-500">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}


function clampPercentage(
  value:
    number
): number {
  return Math.max(
    0,
    Math.min(
      100,
      value
    )
  );
}


function getRatingLabel(
  value:
    number
): string {
  if (
    value >=
    90
  ) {
    return "Elite";
  }

  if (
    value >=
    80
  ) {
    return "Excellent";
  }

  if (
    value >=
    70
  ) {
    return "Strong";
  }

  if (
    value >=
    60
  ) {
    return "Capable";
  }

  if (
    value >=
    50
  ) {
    return "Average";
  }

  return "Limited";
}