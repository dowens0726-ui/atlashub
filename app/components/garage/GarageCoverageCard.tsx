export type GarageCoverageItem = {
  key: string;
  label: string;
  score: number;
};

type GarageCoverageCardProps = {
  coverage: GarageCoverageItem[];
};

function getCoverageLabel(score: number): string {
  if (score >= 85) {
    return "Elite";
  }

  if (score >= 70) {
    return "Strong";
  }

  if (score >= 55) {
    return "Covered";
  }

  if (score > 0) {
    return "Weak";
  }

  return "Missing";
}

export default function GarageCoverageCard({
  coverage,
}: GarageCoverageCardProps) {
  return (
    <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Capability Analysis
        </p>

        <h3 className="mt-2 text-2xl font-black text-white">
          Garage Coverage
        </h3>

        <p className="mt-3 leading-7 text-zinc-400">
          Atlas evaluates how effectively your garage supports major gameplay
          activities.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {coverage.map((item) => (
          <div key={item.key}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-zinc-200">
                {item.label}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-zinc-500">
                  {getCoverageLabel(item.score)}
                </span>

                <span className="w-8 text-right font-black text-white">
                  {item.score}
                </span>
              </div>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                style={{
                  width: `${Math.max(0, Math.min(100, item.score))}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}