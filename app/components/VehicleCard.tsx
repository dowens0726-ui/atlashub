import Image from "next/image";
import Link from "next/link";
import Card from "./ui/Card";
import type { Vehicle } from "../types/vehicle";

type Props = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: Props) {
  return (
    <Card>
      <Image
        src={vehicle.image}
        alt={vehicle.name}
        width={600}
        height={350}
        className="mb-5 h-48 w-full rounded-xl object-cover"
      />
      {vehicle.featured && (
  <div className="mb-3 inline-flex rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-950">
    ⭐ Featured
  </div>
)}
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
        {vehicle.class}
      </p>

      <h2 className="mt-2 text-2xl font-bold">{vehicle.name}</h2>

      <p className="mt-2 text-zinc-400">
        {vehicle.manufacturer}
      </p>

      <div className="mt-6 space-y-2 text-sm text-zinc-300">
        <p>💰 ${vehicle.price.toLocaleString()}</p>
        <p>🏁 {vehicle.topSpeed} mph</p>
        <p>⚙ {vehicle.drivetrain}</p>
      </div>

      <Link
        href={`/vehicles/${vehicle.slug}`}
        className="mt-6 inline-block rounded-xl bg-emerald-500 px-5 py-2 font-bold text-zinc-950 hover:bg-emerald-400"
      >
        View Vehicle →
      </Link>
    </Card>
  );
}