import SectionHeader from "../ui/SectionHeader";
import VehicleCard from "../VehicleCard";
import type { Vehicle } from "../../types/vehicle";

type RelatedVehiclesProps = {
  vehicle: Vehicle;
  vehicles: Vehicle[];
};

export default function RelatedVehicles({
  vehicle,
  vehicles,
}: RelatedVehiclesProps) {
  const sameClass = vehicles.filter(
    (item) =>
      item.slug !== vehicle.slug &&
      item.class === vehicle.class
  );

  const sameManufacturer = vehicles.filter(
    (item) =>
      item.slug !== vehicle.slug &&
      item.manufacturer === vehicle.manufacturer &&
      !sameClass.some((match) => match.slug === item.slug)
  );

  const relatedVehicles = [
    ...sameClass,
    ...sameManufacturer,
  ].slice(0, 4);

  if (relatedVehicles.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <SectionHeader
        eyebrow="Atlas Intelligence"
        title="Recommended Vehicles"
        description="Vehicles selected automatically based on class and manufacturer."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {relatedVehicles.map((relatedVehicle) => (
          <VehicleCard
            key={relatedVehicle.slug}
            vehicle={relatedVehicle}
          />
        ))}
      </div>
    </section>
  );
}