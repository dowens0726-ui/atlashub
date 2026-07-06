import type { Business } from "@/app/types";

type BusinessTipsProps = {
  business: Business;
};

export default function BusinessTips({ business }: BusinessTipsProps) {
  const hasTips = business.atlasTips && business.atlasTips.length > 0;
  const hasRecommendations =
    business.recommendedFor && business.recommendedFor.length > 0;

  if (!hasTips && !hasRecommendations) {
    return null;
  }

  return (
    <section className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Atlas Intelligence
      </p>

      <h2 className="mt-2 text-3xl font-black text-white">
        Strategy Notes
      </h2>

      {hasRecommendations && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-white">Recommended For</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {business.recommendedFor?.map((item) => (
              <span
                key={item}
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasTips && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white">Atlas Tips</h3>

          <div className="mt-4 grid gap-3">
            {business.atlasTips?.map((tip) => (
              <p
                key={tip}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-300"
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