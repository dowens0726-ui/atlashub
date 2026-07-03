import type { Vehicle } from "@/app/types";
import RankingCard from "./RankingCard";

type RankingListProps = {
  vehicles: Vehicle[];
  metric: (vehicle: Vehicle) => string;
};

export default function RankingList({ vehicles, metric }: RankingListProps) {
  return (
    <div className="space-y-3">
      {vehicles.map((vehicle, index) => (
        <RankingCard
          key={vehicle.slug}
          rank={index + 1}
          vehicle={vehicle}
          metric={metric(vehicle)}
        />
      ))}
    </div>
  );
}