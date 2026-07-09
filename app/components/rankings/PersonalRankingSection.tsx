import RankingCard from "./RankingCard";

type PersonalRankingSectionProps<T> = {
  title: string;
  description: string;
  rankings: {
    item: T;
    match: number;
    factors: {
      performance: number;
      budget: number;
      playstyle: number;
      progression: number;
    };
    reasons: string[];
  }[];
  getKey: (item: T) => string;
  getHref: (item: T) => string;
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
};

export default function PersonalRankingSection<T>({
  title,
  description,
  rankings,
  getKey,
  getHref,
  getTitle,
  getSubtitle,
}: PersonalRankingSectionProps<T>) {
  return (
    <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.03] p-6">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          {title}
        </h2>

        <p className="mt-2 text-zinc-400">
          {description}
        </p>
      </div>

      <div className="space-y-6">
        {rankings.map((ranking, index) => (
          <div
            key={getKey(ranking.item)}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <RankingCard
              rank={index + 1}
              item={ranking.item}
              metric={`${ranking.match}% Match`}
              href={getHref(ranking.item)}
              title={getTitle(ranking.item)}
              subtitle={
                getSubtitle
                  ? getSubtitle(ranking.item)
                  : undefined
              }
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Factor
                label="Performance"
                value={ranking.factors.performance}
              />

              <Factor
                label="Budget Fit"
                value={ranking.factors.budget}
              />

              <Factor
                label="Playstyle"
                value={ranking.factors.playstyle}
              />

              <Factor
                label="Progression"
                value={ranking.factors.progression}
              />
            </div>

            <div className="mt-5 space-y-2 pl-2">
              {ranking.reasons.map((reason) => (
                <p
                  key={reason}
                  className="text-sm text-zinc-400"
                >
                  ✓ {reason}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


function Factor({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-400"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}