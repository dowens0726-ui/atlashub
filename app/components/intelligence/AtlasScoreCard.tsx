import type {
  Vehicle,
} from "@/app/types";

import {
  getAtlasVehicleScore,
} from "@/app/services/atlas-score.service";

import ScoreBar from "./ScoreBar";


type AtlasScoreCardProps = {
  vehicle:
    Vehicle;
};


export default function AtlasScoreCard({
  vehicle,
}: AtlasScoreCardProps) {
  const score =
    getAtlasVehicleScore(
      vehicle
    );

  return (
    <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            Atlas Intelligence
          </p>

          <h2 className="mt-1 text-3xl font-black text-white">
            Atlas Score
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Score confidence: {score.confidence}%
          </p>
        </div>

        <div className="text-right">
          <p className="text-5xl font-black text-amber-400">
            {score.overall ??
              "—"}
          </p>

          <p className="text-sm text-zinc-400">
            {score.overall ===
            null
              ? "Not yet confirmed"
              : "Overall Rating"}
          </p>
        </div>
      </div>


      <div className="space-y-5">
        <ScoreMetric
          label="Performance"
          value={
            score.performance
          }
        />

        <ScoreMetric
          label="Value"
          value={
            score.value
          }
        />

        <ScoreMetric
          label="Daily Driver"
          value={
            score.dailyDriver
          }
        />

        <ScoreMetric
          label="Beginner"
          value={
            score.beginner
          }
        />
      </div>


      {!score.complete ? (
        <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
          <p className="text-sm leading-6 text-amber-200">
            Some Atlas scores are unavailable because the underlying vehicle
            data has not been confirmed.
          </p>
        </div>
      ) : null}
    </section>
  );
}


function ScoreMetric({
  label,
  value,
}: {
  label:
    string;

  value:
    number | null;
}) {
  if (
    value ===
    null
  ) {
    return (
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-zinc-300">
            {label}
          </p>

          <p className="text-sm font-bold text-zinc-500">
            Not yet confirmed
          </p>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-0 rounded-full bg-amber-400" />
        </div>
      </div>
    );
  }

  return (
    <ScoreBar
      label={
        label
      }
      value={
        value
      }
    />
  );
}