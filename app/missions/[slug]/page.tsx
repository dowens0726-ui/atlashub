import { notFound } from "next/navigation";
import { missions } from "@/app/data/missions";

import {
  MissionStats,
  AtlasTips,
  MissionUnlocks,
  RelatedMissions,
  RecommendedVehicle,
  RecommendedWeapon,
} from "@/app/components/mission";

type MissionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MissionPage({ params }: MissionPageProps) {
  const { slug } = await params;

  const mission = missions.find((mission) => mission.slug === slug);

  if (!mission) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
        {mission.category}
      </p>

      <h1 className="mt-2 text-4xl font-bold text-white">
        {mission.title}
      </h1>

      <p className="mt-4 max-w-3xl text-zinc-400">
        {mission.description}
      </p>

      <div className="mt-8">
        <MissionStats mission={mission} />
      </div>

      <AtlasTips tips={mission.atlasTips} />

      <MissionUnlocks unlocks={mission.unlocks} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecommendedVehicle vehicleSlug={mission.recommendedVehicle} />
        <RecommendedWeapon weaponSlug={mission.recommendedWeapon} />
      </div>

      <RelatedMissions relatedMissions={mission.relatedMissions} />
    </main>
  );
}