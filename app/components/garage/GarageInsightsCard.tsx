type GarageInsightsCardProps = {
  strengths: string[];
  weaknesses: string[];
};

export default function GarageInsightsCard({
  strengths,
  weaknesses,
}: GarageInsightsCardProps) {
  return (
    <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Atlas Assessment
        </p>

        <h3 className="mt-2 text-2xl font-black text-white">
          Garage Insights
        </h3>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
            Strengths
          </p>

          {strengths.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {strengths.map((strength) => (
                <li
                  key={strength}
                  className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4 text-sm leading-6 text-zinc-300"
                >
                  {strength}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              Add vehicles to identify garage strengths.
            </p>
          )}
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-amber-300">
            Opportunities
          </p>

          {weaknesses.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {weaknesses.map((weakness) => (
                <li
                  key={weakness}
                  className="rounded-2xl border border-amber-300/15 bg-amber-300/5 p-4 text-sm leading-6 text-zinc-300"
                >
                  {weakness}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              No major weaknesses detected.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}