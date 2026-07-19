import type {
  AtlasRecommendationWeight,
  AtlasRecommendationWeightingFactor,
} from "@/app/intelligence";


type AtlasRecommendationAnalysisCardProps = {
  weighting:
    AtlasRecommendationWeight;
};


const factorLabels: Record<
  AtlasRecommendationWeightingFactor,
  string
> = {
  identity: "Identity",
  behavior: "Behavior",
  learning: "Learning",
  memory: "Memory",
  empire: "Empire",
  cash: "Cash",
  situation: "Situation",
};


const maximumScores = {
  identityScore:
    20,

  behaviorScore:
    25,

  learningScore:
    25,

  memoryScore:
    15,

  empireScore:
    10,

  cashScore:
    5,
};


export default function AtlasRecommendationAnalysisCard({
  weighting,
}: AtlasRecommendationAnalysisCardProps) {
  const confidenceDeltaLabel =
    weighting.confidenceDelta > 0
      ? `+${weighting.confidenceDelta}`
      : weighting.confidenceDelta.toString();

  const confidenceDeltaTone =
    weighting.confidenceDelta > 0
      ? "text-emerald-400"
      : weighting.confidenceDelta < 0
        ? "text-red-400"
        : "text-zinc-300";

  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-zinc-950 to-violet-500/10 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Recommendation Analysis
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        {weighting.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {weighting.summary}
      </p>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Base Confidence"
          value={`${weighting.baseConfidence}%`}
        />

        <Metric
          label="Weighted Confidence"
          value={`${weighting.confidence}%`}
          tone="positive"
        />

        <Metric
          label="Confidence Change"
          value={confidenceDeltaLabel}
          valueClassName={confidenceDeltaTone}
        />

        <Metric
          label="Weighting Score"
          value={`${weighting.totalScore}/100`}
        />
      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          Signal Breakdown
        </p>

        <div className="mt-5 space-y-5">
          <ScoreBar
            label="Identity"
            score={
              weighting
                .breakdown
                .identityScore
            }
            maximum={
              maximumScores
                .identityScore
            }
          />

          <ScoreBar
            label="Behavior"
            score={
              weighting
                .breakdown
                .behaviorScore
            }
            maximum={
              maximumScores
                .behaviorScore
            }
          />

          <ScoreBar
            label="Learning"
            score={
              weighting
                .breakdown
                .learningScore
            }
            maximum={
              maximumScores
                .learningScore
            }
          />

          <ScoreBar
            label="Memory"
            score={
              weighting
                .breakdown
                .memoryScore
            }
            maximum={
              maximumScores
                .memoryScore
            }
          />

          <ScoreBar
            label="Empire"
            score={
              weighting
                .breakdown
                .empireScore
            }
            maximum={
              maximumScores
                .empireScore
            }
          />

          <ScoreBar
            label="Cash"
            score={
              weighting
                .breakdown
                .cashScore
            }
            maximum={
              maximumScores
                .cashScore
            }
          />
        </div>
      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FactorCard
          label="Strongest Signal"
          value={
            factorLabels[
              weighting
                .strongestFactor
            ]
          }
          tone="positive"
        />

        <FactorCard
          label="Weakest Signal"
          value={
            factorLabels[
              weighting
                .weakestFactor
            ]
          }
          tone="warning"
        />
      </div>


      <div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-400">
          Why Atlas Scored It This Way
        </p>

        <div className="mt-4 space-y-3">
          {weighting.explanations.map(
            (explanation) => (
              <p
                key={explanation}
                className="text-sm leading-6 text-zinc-300"
              >
                ✓ {explanation}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}


function ScoreBar({
  label,
  score,
  maximum,
}: {
  label: string;

  score: number;

  maximum: number;
}) {
  const percentage =
    maximum > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              (
                score /
                maximum
              ) *
                100
            )
          )
        )
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-zinc-300">
          {label}
        </p>

        <p className="text-sm font-black text-cyan-400">
          {score}/{maximum}
        </p>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{
            width:
              `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}


function Metric({
  label,
  value,
  tone = "default",
  valueClassName,
}: {
  label: string;

  value: string;

  tone?:
    | "default"
    | "positive";

  valueClassName?: string;
}) {
  const toneClassName =
    tone === "positive"
      ? "text-emerald-400"
      : "text-white";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${
          valueClassName ??
          toneClassName
        }`}
      >
        {value}
      </p>
    </div>
  );
}


function FactorCard({
  label,
  value,
  tone,
}: {
  label: string;

  value: string;

  tone:
    | "positive"
    | "warning";
}) {
  const valueClassName =
    tone === "positive"
      ? "text-emerald-400"
      : "text-amber-400";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-xl font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}