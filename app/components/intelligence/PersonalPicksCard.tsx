import type { AtlasRecommendation } from "@/app/intelligence";
import Link from "next/link";

type PersonalPicksCardProps = {
  picks: AtlasRecommendation[];
};

export default function PersonalPicksCard({
  picks,
}: PersonalPicksCardProps) {
  if (!picks.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.03] p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Personal Picks
      </p>

      <h3 className="mt-3 text-2xl font-black text-white">
        Optimized For Your Empire
      </h3>

      <p className="mt-2 text-zinc-400">
        Atlas selected these recommendations based on your profile,
        progression, and current resources.
      </p>

      <div className="mt-6 space-y-4">
        {picks.map((pick) => (
          <Link
            key={pick.id}
            href={pick.href ?? "#"}
            className="block rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-cyan-400"
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="font-black text-white">
                {pick.title}
              </h4>

              <span className="text-sm font-black text-cyan-400">
                {pick.confidence}%
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {pick.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}