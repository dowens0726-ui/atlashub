import Link from "next/link";
import { notFound } from "next/navigation";
import { vehicles } from "../../data/vehicles";
import Container from "../../components/ui/Container";

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

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm uppercase tracking-wider text-emerald-400">
            {vehicle.class}
          </p>

          <h1 className="mt-2 text-5xl font-black">
            {vehicle.name}
          </h1>

          <p className="mt-2 text-xl text-zinc-400">
            {vehicle.manufacturer}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Stat label="Price" value={`$${vehicle.price.toLocaleString()}`} />
            <Stat label="Top Speed" value={`${vehicle.topSpeed} mph`} />
            <Stat label="Drivetrain" value={vehicle.drivetrain} />
            <Stat label="Seats" value={vehicle.seats.toString()} />
            <Stat label="Location" value={vehicle.location} />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold">Description</h2>

            <p className="mt-3 text-zinc-300 leading-8">
              {vehicle.description}
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="text-sm uppercase tracking-wider text-zinc-500">
        {label}
      </div>

      <div className="mt-2 text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}