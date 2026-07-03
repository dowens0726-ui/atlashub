import Link from "next/link";
import { notFound } from "next/navigation";

import CompareButton from "@/app/components/compare/CompareButton";
import { RecommendedMissions } from "@/app/components/mission";
import Container from "@/app/components/ui/Container";
import VehicleHero from "@/app/components/vehicles/VehicleHero";
import RelatedVehicles from "@/app/components/vehicles/RelatedVehicles";
import VehicleStats from "@/app/components/vehicles/VehicleStats";

import { vehicles } from "@/app/data";
import { getMissionsForVehicle } from "@/app/services";

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

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <Link
          href="/vehicles"
          className="text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Vehicles
        </Link>

        <VehicleHero vehicle={vehicle} />

        <div className="mt-6">
          <CompareButton slug={vehicle.slug} />
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Description</h2>

          <p className="mt-3 leading-8 text-zinc-300">
            {vehicle.description}
          </p>
        </div>

        <VehicleStats vehicle={vehicle} />

        <RecommendedMissions
          title="Recommended In"
          missions={recommendedMissions}
        />

        <RelatedVehicles vehicle={vehicle} vehicles={vehicles} />
      </Container>
    </main>
  );
}