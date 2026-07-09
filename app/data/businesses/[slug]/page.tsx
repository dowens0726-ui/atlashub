import Link from "next/link";
import { notFound } from "next/navigation";

import AtlasMatchCard from "@/app/components/intelligence/AtlasMatchCard";

import {
  BusinessCard,
  BusinessHero,
  BusinessStats,
  BusinessTips,
} from "@/app/components/businesses";

import MissionCard from "@/app/components/MissionCard";
import VehicleCard from "@/app/components/VehicleCard";
import AtlasScoreCard from "@/app/components/ui/AtlasScoreCard";
import Container from "@/app/components/ui/Container";

import {
  getBusinessMatch,
} from "@/app/intelligence";

import {
  defaultPlayerProfile,
  getBusiness,
  getBusinessScore,
  getRelatedBusinesses,
  getRelatedMissions,
  getRelatedVehicles,
} from "@/app/services";


type Props = {
  params: Promise<{ slug: string }>;
};


export default async function BusinessPage({
  params,
}: Props) {
  const { slug } = await params;

  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }


  const score =
    getBusinessScore(business);


  const atlasMatch =
    getBusinessMatch(
      defaultPlayerProfile,
      business
    );


  const relatedVehicles =
    getRelatedVehicles(business);

  const relatedMissions =
    getRelatedMissions(business);

  const relatedBusinesses =
    getRelatedBusinesses(business);


  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">

        <Link
          href="/data/businesses"
          className="text-emerald-400 transition hover:text-emerald-300"
        >
          ← Back to Businesses
        </Link>


        <div className="mt-8">
          <BusinessHero business={business} />
        </div>


        <div className="mt-8">
          <BusinessStats business={business} />
        </div>


        <div className="mt-8">
          <AtlasScoreCard score={score} />
        </div>


        <AtlasMatchCard
          match={atlasMatch}
        />


        <div className="mt-8">
          <BusinessTips business={business} />
        </div>


        {relatedVehicles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-black text-white">
              Related Vehicles
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.slug}
                  vehicle={vehicle}
                />
              ))}
            </div>
          </section>
        )}


        {relatedMissions.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-black text-white">
              Related Missions
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedMissions.map((mission) => (
                <MissionCard
                  key={mission.slug}
                  mission={mission}
                />
              ))}
            </div>
          </section>
        )}


        {relatedBusinesses.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-black text-white">
              Related Businesses
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedBusinesses.map((relatedBusiness) => (
                <BusinessCard
                  key={relatedBusiness.slug}
                  business={relatedBusiness}
                />
              ))}
            </div>
          </section>
        )}

      </Container>
    </main>
  );
}