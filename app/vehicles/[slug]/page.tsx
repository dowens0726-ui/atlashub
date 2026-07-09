import Link from "next/link";
import { notFound } from "next/navigation";

import AtlasScoreCard from "@/app/components/intelligence/AtlasScoreCard";
import {
  AtlasIntelligenceCard,
  VehicleRecommendations,
} from "@/app/components/intelligence";
import { RecommendedMissions } from "@/app/components/mission";
import { AppShell } from "@/app/components/layout";
import Container from "@/app/components/ui/Container";
import QuickActions from "@/app/components/ui/QuickActions";
import VehicleHero from "@/app/components/vehicles/VehicleHero";
import RelatedVehicles from "@/app/components/vehicles/RelatedVehicles";
import VehicleStats from "@/app/components/vehicles/VehicleStats";

import { vehicles } from "@/app/data";
import { getAtlasVehicleScore, getMissionsForVehicle } from "@/app/services";
import AtlasMatchCard from "@/app/components/intelligence/AtlasMatchCard";
import { getVehicleMatch } from "@/app/intelligence";
import { defaultPlayerProfile } from "@/app/services/profile.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;

  const vehicle = vehicles.find((v) => v.slug === slug);

  if (!vehicle) {
    notFound();
  }

  const recommendedMissions = getMissionsForVehicle(vehicle.slug);
  const atlasScore = getAtlasVehicleScore(vehicle);
  const atlasMatch = getVehicleMatch(
  defaultPlayerProfile,
  vehicle
);

  return (
    <AppShell>
      <Container className="py-10">
        <Link
          href="/vehicles"
          className="text-sm font-bold text-amber-400 hover:text-amber-300"
        >
          ← Back to Vehicles
        </Link>

        <VehicleHero vehicle={vehicle} />

        <div className="mt-6">
          <QuickActions
            actions={[
              {
                label: "Compare",
                href: `/compare?vehicle=${vehicle.slug}`,
                icon: "⇄",
              },
              {
                label: "View Missions",
                href: "/missions",
                icon: "◎",
              },
              {
                label: "Garage Builder",
                href: "/garage-builder",
                icon: "▣",
              },
              {
                label: "Back to Vehicles",
                href: "/vehicles",
                icon: "◈",
              },
            ]}
          />
        </div>

        <div className="mt-10">
          <AtlasIntelligenceCard
            score={atlasScore.overall}
            title="Atlas vehicle analysis"
            summary={`${vehicle.name} has been evaluated across performance, value, daily usability, and beginner friendliness to determine how useful it is across your garage strategy.`}
            metrics={[
              {
                label: "Performance",
                value: `${atlasScore.performance}/100`,
              },
              {
                label: "Value",
                value: `${atlasScore.value}/100`,
              },
              {
                label: "Daily Driver",
                value: `${atlasScore.dailyDriver}/100`,
              },
              {
                label: "Beginner Friendly",
                value: `${atlasScore.beginner}/100`,
              },
            ]}
          />
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Description</h2>

          <p className="mt-3 leading-8 text-zinc-300">
            {vehicle.description}
          </p>
        </div>

        <AtlasScoreCard vehicle={vehicle} />

<AtlasMatchCard match={atlasMatch} />

        <VehicleStats vehicle={vehicle} />

        <RecommendedMissions
          title="Recommended In"
          missions={recommendedMissions}
        />

        <RelatedVehicles vehicle={vehicle} vehicles={vehicles} />

        <VehicleRecommendations vehicle={vehicle} />
      </Container>
    </AppShell>
  );
}