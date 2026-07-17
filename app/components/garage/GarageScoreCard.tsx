type GarageScoreCardProps = {
  score: number;
  vehicleCount: number;
};

function getScoreLabel(score: number): string {
  if (score >= 90) {
    return "Elite";
  }

  if (score >= 80) {
    return "Excellent";
  }

  if (score >= 70) {
    return "Strong";
  }

  if (score >= 60) {
    return "Developing";
  }

  if (score > 0) {
    return "Limited";
  }

  return "Not Rated";
}

export default function GarageScoreCard({
  score,
  vehicleCount,
}: GarageScoreCardProps) {
  const scoreLabel = getScoreLabel(score);

  return (
    <article className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-zinc-900/80 to-zinc-950 p-6 shadow-xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
        Atlas Garage Score
      </p>

      <div className="mt-5 flex items-end gap-3">
        <p className="text-6xl font-black tracking-tight text-white">
          {score}
        </p>

        <p className="pb-2 text-lg font-bold text-zinc-500">
          / 100
        </p>
      </div>

      <p className="mt-4 text-xl font-bold text-emerald-400">
        {scoreLabel}
      </p>

      <p className="mt-3 leading-7 text-zinc-400">
        {vehicleCount === 0
          ? "Add vehicles to generate your Atlas Garage Score."
          : `Calculated from ${vehicleCount} ${
              vehicleCount === 1 ? "vehicle" : "vehicles"
            }, capability coverage, performance, utility, and versatility.`}
      </p>
    </article>
  );
}