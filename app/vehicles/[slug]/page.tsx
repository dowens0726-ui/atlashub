import Link from "next/link";
import { notFound } from "next/navigation";

import AtlasMatchCard from "@/app/components/intelligence/AtlasMatchCard";
import AtlasScoreCard from "@/app/components/intelligence/AtlasScoreCard";

import {
  AtlasIntelligenceCard,
  VehicleIntelligenceCard,
  VehicleRecommendations,
} from "@/app/components/intelligence";

import {
  AppShell,
} from "@/app/components/layout";

import {
  RecommendedMissions,
} from "@/app/components/mission";

import Container from "@/app/components/ui/Container";
import QuickActions from "@/app/components/ui/QuickActions";

import RelatedVehicles from "@/app/components/vehicles/RelatedVehicles";
import VehicleHero from "@/app/components/vehicles/VehicleHero";
import VehicleStats from "@/app/components/vehicles/VehicleStats";

import {
  vehicles,
} from "@/app/data";

import {
  getVehicleMatch,
} from "@/app/intelligence";

import {
  getAtlasVehicleScore,
  getMissionsForVehicle,
} from "@/app/services";

import {
  defaultPlayerProfile,
} from "@/app/services/profile.service";


type Props = {
  params:
    Promise<{
      slug:
        string;
    }>;
};


export default async function VehiclePage({
  params,
}: Props) {
  const {
    slug,
  } = await params;

  const vehicle =
    vehicles.find(
      (
        currentVehicle
      ) =>
        currentVehicle.slug ===
        slug
    );


  if (!vehicle) {
    notFound();
  }


  const recommendedMissions =
    getMissionsForVehicle(
      vehicle.slug
    );

  const atlasScore =
    getAtlasVehicleScore(
      vehicle
    );

  const atlasMatch =
    getVehicleMatch(
      defaultPlayerProfile,
      vehicle
    );


  return (
    <AppShell>
      <Container className="py-10">
        <Link
          href="/vehicles"
          className="text-sm font-bold text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Vehicles
        </Link>


        <VehicleHero
          vehicle={
            vehicle
          }
        />


        <div className="mt-6">
          <QuickActions
            actions={[
              {
                label:
                  "Compare",

                href:
                  `/compare?vehicle=${vehicle.slug}`,

                icon:
                  "⇄",
              },

              {
                label:
                  "View Missions",

                href:
                  "/missions",

                icon:
                  "◎",
              },

              {
                label:
                  "Garage Builder",

                href:
                  "/garage-builder",

                icon:
                  "▣",
              },

              {
                label:
                  "Back to Vehicles",

                href:
                  "/vehicles",

                icon:
                  "◀",
              },
            ]}
          />
        </div>


        <div className="mt-10">
          {atlasScore.overall !==
          null ? (
            <AtlasIntelligenceCard
              score={
                atlasScore.overall
              }
              title="Atlas vehicle analysis"
              summary={`${vehicle.name} has been evaluated across the vehicle data currently available to Atlas. Score confidence is ${atlasScore.confidence}%.`}
              metrics={[
                {
                  label:
                    "Performance",

                  value:
                    getScoreLabel(
                      atlasScore.performance
                    ),
                },

                {
                  label:
                    "Value",

                  value:
                    getScoreLabel(
                      atlasScore.value
                    ),
                },

                {
                  label:
                    "Daily Driver",

                  value:
                    getScoreLabel(
                      atlasScore.dailyDriver
                    ),
                },

                {
                  label:
                    "Beginner Friendly",

                  value:
                    getScoreLabel(
                      atlasScore.beginner
                    ),
                },

                {
                  label:
                    "Score Confidence",

                  value:
                    `${atlasScore.confidence}%`,
                },
              ]}
            />
          ) : (
            <UnconfirmedIntelligencePanel
              vehicleName={
                vehicle.name
              }
              confidence={
                atlasScore.confidence
              }
            />
          )}
        </div>


        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">
            Description
          </h2>

          <p className="mt-3 leading-8 text-zinc-300">
            {vehicle.description}
          </p>
        </section>


        <AtlasScoreCard
          vehicle={
            vehicle
          }
        />

        <VehicleIntelligenceCard
          vehicle={
            vehicle
          }
        />


        <AtlasMatchCard
          match={
            atlasMatch
          }
        />


        <VehicleStats
          vehicle={
            vehicle
          }
        />


        <RecommendedMissions
          title="Recommended In"
          missions={
            recommendedMissions
          }
        />


        <RelatedVehicles
          vehicle={
            vehicle
          }
          vehicles={
            vehicles
          }
        />


        <VehicleRecommendations
          vehicle={
            vehicle
          }
        />
      </Container>
    </AppShell>
  );
}


function UnconfirmedIntelligencePanel({
  vehicleName,
  confidence,
}: {
  vehicleName:
    string;

  confidence:
    number;
}) {
  return (
    <section className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
        Atlas Intelligence
      </p>

      <h2 className="mt-2 text-3xl font-black text-white">
        Vehicle analysis not yet confirmed
      </h2>

      <p className="mt-3 max-w-3xl leading-7 text-zinc-300">
        Atlas does not yet have enough confirmed performance and pricing data
        to calculate a reliable overall score for {vehicleName}.
      </p>

      <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
        <p className="text-sm text-zinc-400">
          Current score confidence
        </p>

        <p className="mt-2 text-2xl font-black text-amber-300">
          {confidence}%
        </p>
      </div>
    </section>
  );
}


function getScoreLabel(
  score:
    number | null
): string {
  return score ===
    null
    ? "Not yet confirmed"
    : `${score}/100`;
}