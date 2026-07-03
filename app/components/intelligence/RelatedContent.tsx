import type { Mission } from "@/app/types";
import { vehicles, weapons, missions } from "@/app/data";
import RecommendationCard from "./RecommendationCard";

type RelatedContentProps = {
  mission: Mission;
};

export default function RelatedContent({ mission }: RelatedContentProps) {
  const vehicle = vehicles.find(
    (vehicle) => vehicle.slug === mission.recommendedVehicle
  );

  const weapon = weapons.find(
    (weapon) => weapon.slug === mission.recommendedWeapon
  );

  const relatedMissions = missions.filter((item) =>
    mission.relatedMissions?.includes(item.slug)
  );

  return (
    <div className="mt-5 space-y-4">
      {vehicle && (
        <RecommendationCard
          id={vehicle.id}
          type="vehicle"
          href={`/vehicles/${vehicle.slug}`}
          icon="🚗"
          title={vehicle.name}
          label="Recommended Vehicle"
          description={vehicle.description}
        />
      )}

      {weapon && (
        <RecommendationCard
          id={weapon.id}
          type="weapon"
          href={`/weapons/${weapon.slug}`}
          icon="🔫"
          title={weapon.name}
          label="Recommended Weapon"
          description={weapon.description}
        />
      )}

      {relatedMissions.map((relatedMission) => (
        <RecommendationCard
          key={relatedMission.id}
          id={relatedMission.id}
          type="mission"
          href={`/missions/${relatedMission.slug}`}
          icon="🎯"
          title={relatedMission.title}
          label="Related Mission"
          description={relatedMission.description}
        />
      ))}
    </div>
  );
}