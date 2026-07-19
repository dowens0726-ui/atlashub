import { notFound } from "next/navigation";

import {
  AtlasRelationshipPanel,
} from "@/app/components/intelligence";

import {
  AtlasTips,
  MissionStats,
  MissionUnlocks,
  RecommendedVehicle,
  RecommendedWeapon,
  RelatedMissions,
} from "@/app/components/mission";

import {
  missions,
} from "@/app/data/missions";

import {
  getRelationships,
} from "@/app/intelligence";

type MissionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MissionPage({
  params,
}: MissionPageProps) {
  const {
    slug,
  } = await params;

  const mission =
    missions.find(
      (
        currentMission
      ) =>
        currentMission.slug === slug
    );

  if (!mission) {
    notFound();
  }

  const relationships =
    getRelationships({
      type: "mission",
      slug: mission.slug,
    });

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
        <MissionStats
          mission={
            mission
          }
        />
      </div>

      <AtlasTips
        tips={
          mission.atlasTips
        }
      />

      <MissionUnlocks
        unlocks={
          mission.unlocks
        }
      />

      {relationships && (
        <div className="mt-8">
          <AtlasRelationshipPanel
            relationships={
              relationships
            }
          />
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <RecommendedVehicle
          vehicleSlug={
            mission.recommendedVehicle
          }
        />

        <RecommendedWeapon
          weaponSlug={
            mission.recommendedWeapon
          }
        />
      </div>

      <RelatedMissions
        relatedMissions={
          mission.relatedMissions
        }
      />
    </main>
  );
}