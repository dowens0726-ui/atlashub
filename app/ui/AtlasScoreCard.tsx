import type { AtlasScore } from "@/app/services";

type AtlasScoreCardProps = {
  score: AtlasScore;
};

function ScoreRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-400">{label}</span>

      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

export default function AtlasScoreCard({
  score,
}: AtlasScoreCardProps) {
  return (
    <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Atlas Score
      </p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            Overall
          </p>

          <h2 className="text-6xl font-black text-white">
            {score.overall}
          </h2>
        </div>

        <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-bold text-emerald-300">
          ★ Atlas Rated
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <ScoreRow
          label="Profitability"
          value={score.profitability}
        />

        <ScoreRow
          label="Solo"
          value={score.solo}
        />

        <ScoreRow
          label="Beginner"
          value={score.beginner}
        />

        <ScoreRow
          label="Progression"
          value={score.progression}
        />
      </div>
    </section>
  );
}