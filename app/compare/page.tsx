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

  const selectedVehicle = vehicles.find((v) => v.slug === vehicle);
  const comparisonVehicle = vehicles.find((v) => v.slug === compareWith);

  const leftVehicle = selectedVehicle ?? vehicles[0];
  const rightVehicle =
    comparisonVehicle ??
    vehicles.find((v) => v.slug !== leftVehicle.slug) ??
    vehicles[1];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <h1 className="text-5xl font-black">Compare Vehicles</h1>

        <p className="mt-4 text-xl text-zinc-400">
          Compare two vehicles side by side.
        </p>

        <div className="mt-8">
          <CompareVehicleSelector
            vehicles={vehicles}
            leftVehicle={leftVehicle}
            rightVehicle={rightVehicle}
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Left Vehicle */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Image
              src={leftVehicle.image}
              alt={leftVehicle.name}
              width={800}
              height={450}
              className="h-56 w-full object-cover"
            />

            <div className="p-8">
              <FeaturedBadge featured={leftVehicle.featured} />

              <h2 className="mt-4 text-3xl font-bold">
                {leftVehicle.name}
              </h2>

              <p className="mt-2 text-zinc-400">
                {leftVehicle.manufacturer}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <FeatureChip>🏁 {leftVehicle.class}</FeatureChip>
                <FeatureChip>⚙ {leftVehicle.drivetrain}</FeatureChip>
              </div>
            </div>
          </div>

          {/* Right Vehicle */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Image
              src={rightVehicle.image}
              alt={rightVehicle.name}
              width={800}
              height={450}
              className="h-56 w-full object-cover"
            />

            <div className="p-8">
              <FeaturedBadge featured={rightVehicle.featured} />

              <h2 className="mt-4 text-3xl font-bold">
                {rightVehicle.name}
              </h2>

              <p className="mt-2 text-zinc-400">
                {rightVehicle.manufacturer}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <FeatureChip>🏁 {rightVehicle.class}</FeatureChip>
                <FeatureChip>⚙ {rightVehicle.drivetrain}</FeatureChip>
              </div>
            </div>
          </div>
        </div>

        <AtlasVerdict
          left={leftVehicle}
          right={rightVehicle}
        />

        <div className="mt-10 space-y-6">
          <ComparisonRow
            label="Price"
            leftValue={`$${leftVehicle.price.toLocaleString()}`}
            rightValue={`$${rightVehicle.price.toLocaleString()}`}
            leftBarValue={leftVehicle.price}
            rightBarValue={rightVehicle.price}
            max={3000000}
            lowerIsBetter
          />

          <ComparisonRow
            label="Top Speed"
            leftValue={leftVehicle.topSpeed}
            rightValue={rightVehicle.topSpeed}
            leftBarValue={leftVehicle.topSpeed}
            rightBarValue={rightVehicle.topSpeed}
            max={180}
            suffix=" mph"
          />

          <ComparisonRow
            label="Acceleration"
            leftValue={leftVehicle.acceleration}
            rightValue={rightVehicle.acceleration}
            leftBarValue={leftVehicle.acceleration}
            rightBarValue={rightVehicle.acceleration}
          />

          <ComparisonRow
            label="Handling"
            leftValue={leftVehicle.handling}
            rightValue={rightVehicle.handling}
            leftBarValue={leftVehicle.handling}
            rightBarValue={rightVehicle.handling}
          />

          <ComparisonRow
            label="Braking"
            leftValue={leftVehicle.braking}
            rightValue={rightVehicle.braking}
            leftBarValue={leftVehicle.braking}
            rightBarValue={rightVehicle.braking}
          />
        </div>
      </Container>
    </main>
  );
}