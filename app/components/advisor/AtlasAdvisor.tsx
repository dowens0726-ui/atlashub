import { getAdvisorRecommendation } from "@/app/services";
import type { PlayerProfile } from "@/app/types";
import RecommendationCard from "./RecommendationCard";

type AtlasAdvisorProps = {
  profile: PlayerProfile;
};

export default function AtlasAdvisor({ profile }: AtlasAdvisorProps) {
  const recommendation = getAdvisorRecommendation(profile);

  return (
    <section className="mt-12">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Atlas Advisor
      </p>

      <h2 className="mt-2 text-3xl font-black text-white">
        What should you do next?
      </h2>

      <p className="mt-3 max-w-3xl text-zinc-400">
        Personalized recommendations based on your cash, play style, and owned
        content.
      </p>

      <div className="mt-6">
        {recommendation ? (
          <RecommendationCard recommendation={recommendation} />
        ) : (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            No recommendation available yet.
          </div>
        )}
      </div>
    </section>
  );
}