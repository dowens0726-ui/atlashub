import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CollectionHero,
  CollectionStats,
} from "@/app/components/collections";
import VehicleCard from "@/app/components/VehicleCard";
import Container from "@/app/components/ui/Container";

import { getCollectionBySlug } from "@/app/services/collection.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <Link
          href="/collections"
          className="text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Collections
        </Link>

        <div className="mt-8">
          <CollectionHero collection={collection} />
        </div>

        <div className="mt-8">
          <CollectionStats collection={collection} />
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-black text-white">
            Vehicles in this Collection
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {collection.vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.slug}
                vehicle={vehicle}
              />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}