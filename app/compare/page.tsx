import Image from "next/image";
import AtlasVerdict from "../components/compare/AtlasVerdict";
import ComparisonRow from "../components/compare/ComparisonRow";
import Container from "../components/ui/Container";
import FeatureChip from "../components/ui/FeatureChip";
import FeaturedBadge from "../components/vehicles/FeaturedBadge";
import { vehicles } from "../data/vehicles";

type ComparePageProps = {
  searchParams: Promise<{
    vehicle?: string;
    compareWith?: string;
  }>;
};

export default async function ComparePage({
  searchParams,
}: ComparePageProps) {
  const { vehicle, compareWith } = await searchParams;

  const selectedVehicle = vehicles.find((v) => v.slug === vehicle);
  const comparisonVehicle = vehicles.find((v) => v.slug === compareWith);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <h1 className="text-5xl font-black">Compare Vehicles</h1>

        <p className="mt-4 text-xl text-zinc-400">
          Compare two vehicles side by side.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {selectedVehicle && (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <Image src={selectedVehicle.image} alt={selectedVehicle.name} width={800} height={450} className="h-56 w-full object-cover" />
              <div className="p-8">
                <FeaturedBadge featured={selectedVehicle.featured} />
                <h2 className="mt-4 text-3xl font-bold">{selectedVehicle.name}</h2>
                <p className="mt-2 text-zinc-400">{selectedVehicle.manufacturer}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <FeatureChip>🏁 {selectedVehicle.class}</FeatureChip>
                  <FeatureChip>⚙ {selectedVehicle.drivetrain}</FeatureChip>
                </div>
              </div>
            </div>
          )}

          {comparisonVehicle && (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <Image src={comparisonVehicle.image} alt={comparisonVehicle.name} width={800} height={450} className="h-56 w-full object-cover" />
              <div className="p-8">
                <FeaturedBadge featured={comparisonVehicle.featured} />
                <h2 className="mt-4 text-3xl font-bold">{comparisonVehicle.name}</h2>
                <p className="mt-2 text-zinc-400">{comparisonVehicle.manufacturer}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <FeatureChip>🏁 {comparisonVehicle.class}</FeatureChip>
                  <FeatureChip>⚙ {comparisonVehicle.drivetrain}</FeatureChip>
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedVehicle && comparisonVehicle && (
          <AtlasVerdict left={selectedVehicle} right={comparisonVehicle} />
        )}

        {selectedVehicle && comparisonVehicle && (
          <div className="mt-10 space-y-6">
            <ComparisonRow label="Price" leftValue={`$${selectedVehicle.price.toLocaleString()}`} rightValue={`$${comparisonVehicle.price.toLocaleString()}`} leftBarValue={selectedVehicle.price} rightBarValue={comparisonVehicle.price} max={3000000} lowerIsBetter />
            <ComparisonRow label="Top Speed" leftValue={selectedVehicle.topSpeed} rightValue={comparisonVehicle.topSpeed} leftBarValue={selectedVehicle.topSpeed} rightBarValue={comparisonVehicle.topSpeed} max={180} suffix=" mph" />
            <ComparisonRow label="Acceleration" leftValue={selectedVehicle.acceleration} rightValue={comparisonVehicle.acceleration} leftBarValue={selectedVehicle.acceleration} rightBarValue={comparisonVehicle.acceleration} />
            <ComparisonRow label="Handling" leftValue={selectedVehicle.handling} rightValue={comparisonVehicle.handling} leftBarValue={selectedVehicle.handling} rightBarValue={comparisonVehicle.handling} />
            <ComparisonRow label="Braking" leftValue={selectedVehicle.braking} rightValue={comparisonVehicle.braking} leftBarValue={selectedVehicle.braking} rightBarValue={comparisonVehicle.braking} />
          </div>
        )}
      </Container>
    </main>
  );
}