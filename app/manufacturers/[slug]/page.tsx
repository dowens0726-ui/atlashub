import Link from "next/link";
import { notFound } from "next/navigation";

import { ManufacturerHero, ManufacturerStats } from "@/app/components/manufacturers";
import VehicleCard from "@/app/components/VehicleCard";
import Container from "@/app/components/ui/Container";
import { getManufacturerBySlug } from "@/app/services/manufacturer.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ManufacturerPage({ params }: Props) {
  const { slug } = await params;

  const manufacturer = getManufacturerBySlug(slug);

  if (!manufacturer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <Link
          href="/manufacturers"
          className="text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Manufacturers
        </Link>

        <div className="mt-8">
          <ManufacturerHero manufacturer={manufacturer} />
        </div>

        <div className="mt-8">
          <ManufacturerStats manufacturer={manufacturer} />
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-black text-white">
            {manufacturer.name} Vehicles
          </h2>

          <p className="mt-3 text-zinc-400">
            Browse every {manufacturer.name} vehicle currently available in Atlas.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {manufacturer.vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}