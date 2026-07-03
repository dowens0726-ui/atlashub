import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";
import { RankingSection } from "@/app/components/rankings";
import {
  getBestAccelerationVehicles,
  getBestHandlingVehicles,
  getCheapestVehicles,
  getFastestVehicles,
  getMostExpensiveVehicles,
} from "@/app/services/ranking.service";

export default function RankingsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Intelligence"
          title="Vehicle Rankings"
          description="Explore automatically generated vehicle leaderboards powered by Atlas data."
        />

        <div className="mt-10 grid gap-8">
          <RankingSection
            title="🏎 Fastest Vehicles"
            description="Ranked by top speed."
            vehicles={getFastestVehicles(10)}
            metric={(vehicle) => `${vehicle.topSpeed} mph`}
          />

          <RankingSection
            title="🚀 Best Acceleration"
            description="Ranked by acceleration rating."
            vehicles={getBestAccelerationVehicles(10)}
            metric={(vehicle) => `${vehicle.acceleration}/100`}
          />

          <RankingSection
            title="🎯 Best Handling"
            description="Ranked by handling rating."
            vehicles={getBestHandlingVehicles(10)}
            metric={(vehicle) => `${vehicle.handling}/100`}
          />

          <RankingSection
            title="💎 Most Expensive"
            description="Ranked by purchase price."
            vehicles={getMostExpensiveVehicles(10)}
            metric={(vehicle) => `$${vehicle.price.toLocaleString()}`}
          />

          <RankingSection
            title="💰 Cheapest Vehicles"
            description="Ranked by lowest purchase price."
            vehicles={getCheapestVehicles(10)}
            metric={(vehicle) => `$${vehicle.price.toLocaleString()}`}
          />
        </div>
      </Container>
    </main>
  );
}