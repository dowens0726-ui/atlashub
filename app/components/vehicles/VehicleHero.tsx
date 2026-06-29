import FeatureChip from "../ui/FeatureChip";
import Image from "next/image";
import FeaturedBadge from "./FeaturedBadge";
import type { Vehicle } from "../../types/vehicle";

type VehicleHeroProps = {
  vehicle: Vehicle;
};

export default function VehicleHero({ vehicle }: VehicleHeroProps) {
  return (
    <>
      <Image
        src={vehicle.image}
        alt={vehicle.name}
        width={1200}
        height={700}
        className="mt-8 h-96 w-full rounded-2xl object-cover"
      />

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-sm uppercase tracking-wider text-emerald-400">
          {vehicle.class}
        </p>

        <div className="mt-3">
          <FeaturedBadge featured={vehicle.featured} />
        </div>

        <h1 className="mt-2 text-5xl font-black">
          {vehicle.name}
        </h1>

        <p className="mt-2 text-xl text-zinc-400">
          {vehicle.manufacturer}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
  <FeatureChip>🏁 {vehicle.class}</FeatureChip>
  <FeatureChip>⚙ {vehicle.drivetrain}</FeatureChip>
  <FeatureChip>👥 {vehicle.seats} Seats</FeatureChip>
  
</div>
      </div>
    </>
  );
}