import ComparisonRow from "../components/compare/ComparisonRow";
import Container from "../components/ui/Container";
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
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <h2 className="text-3xl font-bold">{selectedVehicle.name}</h2>
              <p className="mt-2 text-zinc-400">
                {selectedVehicle.manufacturer}
              </p>
            </div>
          )}

          {comparisonVehicle && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <h2 className="text-3xl font-bold">{comparisonVehicle.name}</h2>
              <p className="mt-2 text-zinc-400">
                {comparisonVehicle.manufacturer}
              </p>
            </div>
          )}
        </div>

        {selectedVehicle && comparisonVehicle && (
          <div className="mt-10 space-y-6">
            <ComparisonRow
              label="Price"
              leftValue={`$${selectedVehicle.price.toLocaleString()}`}
              rightValue={`$${comparisonVehicle.price.toLocaleString()}`}
              leftBarValue={selectedVehicle.price}
              rightBarValue={comparisonVehicle.price}
              max={3000000}
              lowerIsBetter
            />

            <ComparisonRow
              label="Top Speed"
              leftValue={selectedVehicle.topSpeed}
              rightValue={comparisonVehicle.topSpeed}
              leftBarValue={selectedVehicle.topSpeed}
              rightBarValue={comparisonVehicle.topSpeed}
              max={180}
              suffix=" mph"
            />

            <ComparisonRow
              label="Acceleration"
              leftValue={selectedVehicle.acceleration}
              rightValue={comparisonVehicle.acceleration}
              leftBarValue={selectedVehicle.acceleration}
              rightBarValue={comparisonVehicle.acceleration}
            />

            <ComparisonRow
              label="Handling"
              leftValue={selectedVehicle.handling}
              rightValue={comparisonVehicle.handling}
              leftBarValue={selectedVehicle.handling}
              rightBarValue={comparisonVehicle.handling}
            />

            <ComparisonRow
              label="Braking"
              leftValue={selectedVehicle.braking}
              rightValue={comparisonVehicle.braking}
              leftBarValue={selectedVehicle.braking}
              rightBarValue={comparisonVehicle.braking}
            />
          </div>
        )}
      </Container>
    </main>
  );
}