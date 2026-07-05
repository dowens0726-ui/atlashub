import FeatureChip from "../ui/FeatureChip";
import HeroImage from "../ui/HeroImage";
import AtlasBadge from "../ui/AtlasBadge";
import FeaturedBadge from "./FeaturedBadge";

import { getVehicleBadges } from "@/app/services/badge.service";

import type { Vehicle } from "../../types/vehicle";

type VehicleHeroProps = {
  vehicle: Vehicle;
};

export default function VehicleHero({ vehicle }: VehicleHeroProps) {
  const badges = getVehicleBadges(vehicle);

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
      <div className="relative">
        <HeroImage
          src={vehicle.image}
          alt={vehicle.name}
          fallback="/placeholders/vehicle.webp"
          priority
        />

        <div className="absolute bottom-0 left-0 w-full p-8">
          <FeaturedBadge featured={vehicle.featured} />

          <h1 className="mt-4 text-5xl font-black text-white">
            {vehicle.name}
          </h1>

          <p className="mt-2 text-xl text-zinc-300">
            {vehicle.manufacturer}
          </p>

          {badges.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <AtlasBadge
                  key={badge.label}
                  badge={badge}
                />
              ))}
            </div>
          )}
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