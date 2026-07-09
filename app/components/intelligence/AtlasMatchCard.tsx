import type { AtlasMatch } from "@/app/intelligence";

type AtlasMatchCardProps = {
  match: AtlasMatch;
};

export default function AtlasMatchCard({
  match,
}: AtlasMatchCardProps) {
  return (
    <section className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          {match.overall}% Match For Your Empire
        </h2>

        <p className="mt-2 text-zinc-400">
          Atlas analyzed this vehicle against your current cash,
          playstyle, and progression path.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <MatchStat
          label="Performance"
          value={match.factors.performance}
        />

        <MatchStat
          label="Budget Fit"
          value={match.factors.budget}
        />

        <MatchStat
          label="Playstyle"
          value={match.factors.playstyle}
        />

        <MatchStat
          label="Progression"
          value={match.factors.progression}
        />
      </div>

      {match.reasons.length > 0 && (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            Why Atlas Likes This
          </p>

          <div className="mt-4 space-y-2">
            {match.reasons.map((reason) => (
              <p
                key={reason}
                className="text-sm text-zinc-300"
              >
                ✓ {reason}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function MatchStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black text-white">
        {value}/100
      </p>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
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