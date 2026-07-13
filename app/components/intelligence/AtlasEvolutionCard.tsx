import type {
  AtlasLearningProfile,
} from "@/app/intelligence";


type AtlasEvolutionCardProps = {
  learning: AtlasLearningProfile;
};


function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }
  ).format(value);
}


function formatDuration(
  totalMinutes: number
): string {
  if (totalMinutes <= 0) {
    return "No data";
  }

  const hours =
    Math.floor(
      totalMinutes / 60
    );

  const minutes =
    totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}


export default function AtlasEvolutionCard({
  learning,
}: AtlasEvolutionCardProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
        Atlas Evolution
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        {learning.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {learning.summary}
      </p>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Learning Stage"
          value={
            learning.learningStage
          }
        />

        <Metric
          label="Learning Confidence"
          value={`${learning.confidence}%`}
        />

        <Metric
          label="Completed Strategies"
          value={
            learning
              .completedStrategies
              .toString()
          }
        />

        <Metric
          label="Successful Strategies"
          value={
            learning
              .successfulActions
              .toString()
          }
        />
      </div>


      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Success Rate"
          value={`${learning.successRate}%`}
          tone="positive"
        />

        <Metric
          label="Failure Rate"
          value={`${learning.failureRate}%`}
          tone="negative"
        />

        <Metric
          label="Abandonment Rate"
          value={`${learning.abandonmentRate}%`}
          tone="warning"
        />

        <Metric
          label="Prediction Accuracy"
          value={
            learning.predictionAccuracy > 0
              ? `${learning.predictionAccuracy}%`
              : "No data"
          }
        />
      </div>


      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Average Income"
          value={
            learning.averageIncome !== 0
              ? formatCurrency(
                  learning.averageIncome
                )
              : "$0"
          }
        />

        <Metric
          label="Average Empire Gain"
          value={
            learning.averageEmpireScoreGain > 0
              ? `+${learning.averageEmpireScoreGain}`
              : learning.averageEmpireScoreGain.toString()
          }
        />

        <Metric
          label="Average Completion Time"
          value={
            formatDuration(
              learning.averageCompletionTimeMinutes
            )
          }
        />

        <Metric
          label="Abandoned Strategies"
          value={
            learning
              .abandonedStrategies
              .toString()
          }
        />
      </div>


      <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
          Learned Patterns
        </p>

        <div className="mt-4 space-y-2">
          {learning.patterns.map(
            (pattern) => (
              <p
                key={pattern}
                className="text-sm text-zinc-300"
              >
                ✓ {pattern}
              </p>
            )
          )}
        </div>
      </div>


      {learning.validatedPatterns.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            Validated Insights
          </p>

          <div className="mt-4 space-y-2">
            {learning.validatedPatterns.map(
              (pattern) => (
                <p
                  key={pattern}
                  className="text-sm text-zinc-300"
                >
                  ✓ {pattern}
                </p>
              )
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}


function Metric({
  label,
  value,
  tone = "default",
}: {
  label: string;

  value: string;

  tone?:
    | "default"
    | "positive"
    | "warning"
    | "negative";
}) {
  const valueClassName = {
    default:
      "text-white",

    positive:
      "text-emerald-400",

    warning:
      "text-amber-400",

    negative:
      "text-red-400",
  }[tone];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}