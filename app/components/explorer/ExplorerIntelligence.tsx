import type { Business } from "@/app/types";
import { getBusinessScore } from "@/app/services";

type ExplorerIntelligenceProps = {
  business?: Business;
};

export default function ExplorerIntelligence({
  business,
}: ExplorerIntelligenceProps) {
  if (!business) {
    return null;
  }

  const score = getBusinessScore(business);

  return (
    <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
        Atlas Intelligence
      </p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-zinc-400">Atlas Score</p>
          <p className="text-5xl font-black text-white">{score.overall}</p>
        </div>

        <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-bold text-amber-300">
          ★ Rated
        </div>
      </div>

      {business.recommendedFor && business.recommendedFor.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-bold text-white">Recommended For</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {business.recommendedFor.map((item) => (
              <span
                key={item}
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {business.atlasTips && business.atlasTips.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-bold text-white">Atlas Tips</p>

          <div className="mt-3 space-y-2">
            {business.atlasTips.slice(0, 2).map((tip) => (
              <p
                key={tip}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm leading-6 text-zinc-300"
              >
                💡 {tip}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}