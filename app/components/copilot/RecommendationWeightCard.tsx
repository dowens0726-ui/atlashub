import { AtlasCard } from "@/app/components/design-system";
import type { AtlasRecommendationWeight } from "@/app/intelligence";

type RecommendationWeightCardProps = {
  weight: AtlasRecommendationWeight;
};

function formatDelta(delta: number) {
  return delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1);
}

function formatFactor(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function RecommendationWeightCard({
  weight,
}: RecommendationWeightCardProps) {
  const breakdown = [
    ["Identity", weight.breakdown.identityScore],
    ["Behavior", weight.breakdown.behaviorScore],
    ["Learning", weight.breakdown.learningScore],
    ["Memory", weight.breakdown.memoryScore],
    ["Empire", weight.breakdown.empireScore],
    ["Cash", weight.breakdown.cashScore],
    ["Situation", weight.breakdown.situationScore],
  ] as const;

  return (
    <AtlasCard
      title="Recommendation Intelligence"
      subtitle={weight.summary}
    >
      <div className="space-y-6">

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Confidence
            </p>

            <p className="text-2xl font-bold">
              {weight.confidence}%
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Base
            </p>

            <p className="text-2xl font-bold">
              {weight.baseConfidence}%
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Delta
            </p>

            <p className="text-2xl font-bold">
              {formatDelta(weight.confidenceDelta)}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Total Score
            </p>

            <p className="text-2xl font-bold">
              {weight.totalScore}
            </p>
          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl border border-zinc-800 p-4">
            <p className="text-sm font-semibold">
              Strongest Signal
            </p>

            <p className="mt-2 text-zinc-300">
              {formatFactor(weight.strongestFactor)}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 p-4">
            <p className="text-sm font-semibold">
              Weakest Signal
            </p>

            <p className="mt-2 text-zinc-300">
              {formatFactor(weight.weakestFactor)}
            </p>
          </div>

        </div>

        <details className="rounded-xl border border-zinc-800">
          <summary className="cursor-pointer px-4 py-3 font-semibold">
            Recommendation Breakdown
          </summary>

          <div className="space-y-3 border-t border-zinc-800 p-4">

            {breakdown.map(([label, value]) => (
              <div
                key={label}
                className="space-y-1"
              >
                <div className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, value)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}

          </div>
        </details>

        {weight.explanations.length > 0 && (
          <details className="rounded-xl border border-zinc-800">
            <summary className="cursor-pointer px-4 py-3 font-semibold">
              Why Atlas Chose This
            </summary>

            <ul className="list-disc space-y-2 border-t border-zinc-800 p-5 pl-10 text-sm text-zinc-300">
              {weight.explanations.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </details>
        )}

      </div>
    </AtlasCard>
  );
}