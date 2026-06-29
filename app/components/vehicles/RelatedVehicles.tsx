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
  const relatedVehicles = vehicles
    .filter(
      (item) =>
        item.slug !== vehicle.slug &&
        (item.class === vehicle.class ||
          item.manufacturer === vehicle.manufacturer)
    )
    .slice(0, 3);

  if (relatedVehicles.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold">Related Vehicles</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {relatedVehicles.map((relatedVehicle) => (
          <VehicleCard key={relatedVehicle.slug} vehicle={relatedVehicle} />
        ))}
      </div>
    </section>
  );
}