import Link from "next/link";

import HeroImage from "./ui/HeroImage";
import Card from "./ui/Card";

import type { Vehicle } from "../types/vehicle";

type Props = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: Props) {
  return (
    <Card>
      <HeroImage
        src={vehicle.image}
        alt={vehicle.name}
      />

      {vehicle.featured && (
        <div className="mt-5 inline-flex rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-950">
          Featured
        </div>
      )}

      <h3 className="mt-5 text-2xl font-black text-white">
        {vehicle.name}
      </h3>

      <p className="mt-2 text-zinc-400">
        {vehicle.manufacturer}
      </p>

      <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
        <span>
          🏁 {vehicle.topSpeed} mph
        </span>

        <span>
          ⚙️ {vehicle.drivetrain}
        </span>

        <span>
          👥 {vehicle.seats} Seats
        </span>
      </div>

      <Link
        href={`/vehicles/${vehicle.slug}`}
        className="mt-6 inline-block rounded-xl bg-emerald-500 px-5 py-2 font-bold text-zinc-950 transition hover:bg-emerald-400"
      >
        View Vehicle →
      </Link>
    </Card>
  );
}