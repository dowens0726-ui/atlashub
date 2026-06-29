import Image from "next/image";
import FeatureChip from "../ui/FeatureChip";
import FeaturedBadge from "./FeaturedBadge";
import type { Vehicle } from "../../types/vehicle";

type VehicleHeroProps = {
  vehicle: Vehicle;
};

export default function VehicleHero({ vehicle }: VehicleHeroProps) {
  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
      <div className="relative">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={1200}
          height={700}
          className="h-96 w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8">
          <FeaturedBadge featured={vehicle.featured} />

          <h1 className="mt-4 text-5xl font-black">{vehicle.name}</h1>

          <p className="mt-2 text-xl text-zinc-300">
            {vehicle.manufacturer}
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-3">
          <FeatureChip>🏁 {vehicle.class}</FeatureChip>
          <FeatureChip>⚙ {vehicle.drivetrain}</FeatureChip>
          <FeatureChip>👥 {vehicle.seats} Seats</FeatureChip>
          <FeatureChip>💰 ${vehicle.price.toLocaleString()}</FeatureChip>
        </div>
      </div>
    </section>
  );
}