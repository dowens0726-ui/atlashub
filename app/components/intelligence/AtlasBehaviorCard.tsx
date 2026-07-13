import type {
  AtlasBehaviorProfile,
} from "@/app/intelligence";


type AtlasBehaviorCardProps = {
  behavior: AtlasBehaviorProfile;
};


export default function AtlasBehaviorCard({
  behavior,
}: AtlasBehaviorCardProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Behavioral Intelligence
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        {behavior.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {behavior.summary}
      </p>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Strongest Category"
          value={behavior.strongestCategory}
        />

        <Metric
          label="Observed Pattern"
          value={behavior.playPattern}
        />

        <Metric
          label="Behavioral Risk"
          value={behavior.averageRisk}
          tone={
            behavior.averageRisk === "Low"
              ? "positive"
              : behavior.averageRisk === "High"
                ? "negative"
                : "warning"
          }
        />

        <Metric
          label="Atlas Confidence"
          value={`${behavior.confidence}%`}
        />
      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          Category Preferences
        </p>

        <div className="mt-5 space-y-5">
          <PreferenceBar
            label="Business"
            value={behavior.businessPreference}
          />

          <PreferenceBar
            label="Missions"
            value={behavior.missionPreference}
          />

          <PreferenceBar
            label="Vehicles"
            value={behavior.vehiclePreference}
          />
        </div>
      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Metric
          label="Completion Rate"
          value={`${behavior.completionRate}%`}
          tone="positive"
        />

        <Metric
          label="Abandonment Rate"
          value={`${behavior.abandonmentRate}%`}
          tone={
            behavior.abandonmentRate >= 40
              ? "negative"
              : behavior.abandonmentRate >= 20
                ? "warning"
                : "positive"
          }
        />
      </div>
    </section>
  );
}


function PreferenceBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-zinc-300">
          {label}
        </p>

        <p className="text-sm font-black text-cyan-400">
          {value}%
        </p>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{
            width: `${Math.min(
              100,
              Math.max(
                0,
                value
              )
            )}%`,
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
        className={`mt-2 text-xl font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}