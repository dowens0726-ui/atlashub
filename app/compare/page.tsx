import Image from "next/image";
import AtlasVerdict from "../components/compare/AtlasVerdict";
import ComparisonRow from "../components/compare/ComparisonRow";
import CompareVehicleSelector from "../components/compare/CompareVehicleSelector";
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

  const leftVehicle = vehicles.find((v) => v.slug === vehicle);
  const rightVehicle = vehicles.find((v) => v.slug === compareWith);

  const defaultLeft = vehicles[0];
const defaultRight = vehicles[1];

const leftVehicle = leftVehicle ?? defaultLeft;
const rightVehicle = rightVehicle ?? defaultRight;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <h1 className="text-5xl font-black">Compare Vehicles</h1>

        <p className="mt-4 text-xl text-zinc-400">
          Compare two vehicles side by side.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {leftVehicle && (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <Image src={leftVehicle.image} alt={leftVehicle.name} width={800} height={450} className="h-56 w-full object-cover" />
              <div className="p-8">
                <FeaturedBadge featured={leftVehicle.featured} />
                <h2 className="mt-4 text-3xl font-bold">{leftVehicle.name}</h2>
                <p className="mt-2 text-zinc-400">{leftVehicle.manufacturer}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <FeatureChip>🏁 {leftVehicle.class}</FeatureChip>
                  <FeatureChip>⚙ {leftVehicle.drivetrain}</FeatureChip>
                </div>
              </div>
            </div>
          )}

          {rightVehicle && (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <Image src={rightVehicle.image} alt={rightVehicle.name} width={800} height={450} className="h-56 w-full object-cover" />
              <div className="p-8">
                <FeaturedBadge featured={rightVehicle.featured} />
                <h2 className="mt-4 text-3xl font-bold">{rightVehicle.name}</h2>
                <p className="mt-2 text-zinc-400">{rightVehicle.manufacturer}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <FeatureChip>🏁 {rightVehicle.class}</FeatureChip>
                  <FeatureChip>⚙ {rightVehicle.drivetrain}</FeatureChip>
                </div>
              </div>
            </div>
          )}
        </div>

        {leftVehicle && rightVehicle && (
          <AtlasVerdict left={leftVehicle} right={rightVehicle} />
        )}

{leftVehicle && rightVehicle && (
  <div className="mt-8 max-w-sm">
    <CompareVehicleSelector
      vehicle={leftVehicle.slug}
      compareWith={rightVehicle.slug}
      options={vehicles
        .filter((item) => item.slug !== leftVehicle.slug)
        .map((item) => ({
          label: item.name,
          value: item.slug,
        }))}
    />
  </div>
)}

        {leftVehicle && rightVehicle && (
          <div className="mt-10 space-y-6">
            <ComparisonRow label="Price" leftValue={`$${leftVehicle.price.toLocaleString()}`} rightValue={`$${comparisonVehicle.price.toLocaleString()}`} leftBarValue={selectedVehicle.price} rightBarValue={comparisonVehicle.price} max={3000000} lowerIsBetter />
            <ComparisonRow label="Top Speed" leftValue={leftVehicle.topSpeed} rightValue={comparisonVehicle.topSpeed} leftBarValue={selectedVehicle.topSpeed} rightBarValue={comparisonVehicle.topSpeed} max={180} suffix=" mph" />
            <ComparisonRow label="Acceleration" leftValue={leftVehicle.acceleration} rightValue={comparisonVehicle.acceleration} leftBarValue={selectedVehicle.acceleration} rightBarValue={comparisonVehicle.acceleration} />
            <ComparisonRow label="Handling" leftValue={leftVehicle.handling} rightValue={comparisonVehicle.handling} leftBarValue={selectedVehicle.handling} rightBarValue={comparisonVehicle.handling} />
            <ComparisonRow label="Braking" leftValue={leftVehicle.braking} rightValue={comparisonVehicle.braking} leftBarValue={selectedVehicle.braking} rightBarValue={comparisonVehicle.braking} />
          </div>
        )}
      </Container>
    </main>
  );
}