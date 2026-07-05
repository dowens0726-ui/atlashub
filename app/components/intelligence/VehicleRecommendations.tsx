import type { Vehicle } from "@/app/types";
import { getVehicleRecommendations } from "@/app/services/recommendation.service";
import RecommendationCardV2 from "./RecommendationCardV2";

type VehicleRecommendationsProps = {
  vehicle: Vehicle;
};

export default function VehicleRecommendations({
  vehicle,
}: VehicleRecommendationsProps) {
  const recommendations = getVehicleRecommendations(vehicle, 4);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Atlas Intelligence
      </p>

      <h2 className="mt-2 text-3xl font-black text-white">
        Recommended Vehicles
      </h2>

      <p className="mt-3 max-w-3xl text-zinc-400">
        Similar picks based on class, manufacturer, drivetrain, price, and Atlas
        Score.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {recommendations.map((recommendation) => (
          <RecommendationCardV2
            key={recommendation.vehicle.slug}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
}