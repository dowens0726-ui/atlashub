import Link from "next/link";
import { vehicles } from "@/app/data/vehicles";
import { Card, Badge } from "@/app/components/ui";

type RecommendedVehicleProps = {
  vehicleSlug?: string;
};

export default function RecommendedVehicle({
  vehicleSlug,
}: RecommendedVehicleProps) {
  if (!vehicleSlug) return null;

  const vehicle = vehicles.find((vehicle) => vehicle.slug === vehicleSlug);

  if (!vehicle) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">Recommended Vehicle</h2>

      <Link href={`/vehicles/${vehicle.slug}`}>
        <Card className="mt-4 transition hover:border-emerald-400">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
            <Badge>{vehicle.class}</Badge>
          </div>

          <p className="mt-3 text-sm text-zinc-400">
            {vehicle.description}
          </p>
        </Card>
      </Link>
    </section>
  );
}