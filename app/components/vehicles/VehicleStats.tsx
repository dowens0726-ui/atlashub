import StatBar from "../ui/StatBar";
import type { Vehicle } from "../../types/vehicle";

type VehicleStatsProps = {
  vehicle: Vehicle;
};

export default function VehicleStats({ vehicle }: VehicleStatsProps) {
  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-2xl font-bold">Performance</h2>

      <StatBar
        label="Top Speed"
        value={vehicle.topSpeed}
        max={180}
        suffix=" mph"
      />

      <StatBar label="Acceleration" value={vehicle.acceleration} max={100} />

      <StatBar label="Handling" value={vehicle.handling} max={100} />

      <StatBar label="Braking" value={vehicle.braking} max={100} />
    </div>
  );
}