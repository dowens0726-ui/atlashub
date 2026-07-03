import type { Vehicle } from "@/app/types";
import { getAtlasVehicleScore } from "@/app/services/atlas-score.service";
import ScoreBar from "./ScoreBar";

type AtlasScoreCardProps = {
  vehicle: Vehicle;
};

export default function AtlasScoreCard({
  vehicle,
}: AtlasScoreCardProps) {
  const score = getAtlasVehicleScore(vehicle);

  return (
    <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            Atlas Intelligence
          </p>

          <h2 className="mt-1 text-3xl font-black text-white">
            Atlas Score
          </h2>
        </div>

        <div className="text-right">
          <p className="text-5xl font-black text-amber-400">
            {score.overall}
          </p>

          <p className="text-sm text-zinc-400">
            Overall Rating
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <ScoreBar
          label="Performance"
          value={score.performance}
        />

        <ScoreBar
          label="Value"
          value={score.value}
        />

        <ScoreBar
          label="Daily Driver"
          value={score.dailyDriver}
        />

        <ScoreBar
          label="Beginner"
          value={score.beginner}
        />
      </div>
    </section>
  );
}