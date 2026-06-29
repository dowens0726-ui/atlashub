import CompareButton from "../../components/compare/CompareButton";
import RelatedVehicles from "../../components/vehicles/RelatedVehicles";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vehicles } from "../../data/vehicles";
import Container from "../../components/ui/Container";
import VehicleHero from "../../components/vehicles/VehicleHero";
import VehicleStats from "../../components/vehicles/VehicleStats";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;

  const vehicle = vehicles.find((v) => v.slug === slug);

  if (!vehicle) {
    notFound();
  }

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

<RelatedVehicles
  vehicle={vehicle}
  vehicles={vehicles}
/>

      </Container>
    </main>
  );
}