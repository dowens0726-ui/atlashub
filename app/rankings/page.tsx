import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";
import { RankingSection } from "@/app/components/rankings";
import { getAtlasVehicleScore } from "@/app/services/atlas-score.service";
import {
  getBestAccelerationVehicles,
  getBestBeginnerVehicles,
  getBestDailyDriverVehicles,
  getBestHandlingVehicles,
  getBestOverallVehicles,
  getBestPerformanceVehicles,
  getBestValueVehicles,
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
          description="Explore automatically generated vehicle leaderboards powered by Atlas Score."
        />

        <div className="mt-10 grid gap-8">
          <RankingSection
            title="🏆 Best Overall"
            description="Ranked by overall Atlas Score."
            vehicles={getBestOverallVehicles(10)}
            metric={(vehicle) =>
              `${getAtlasVehicleScore(vehicle).overall}/100`
            }
          />

          <RankingSection
            title="🏁 Best Performance"
            description="Ranked by speed, acceleration, handling, and braking."
            vehicles={getBestPerformanceVehicles(10)}
            metric={(vehicle) =>
              `${getAtlasVehicleScore(vehicle).performance}/100`
            }
          />

          <RankingSection
            title="💰 Best Value"
            description="Ranked by performance relative to price."
            vehicles={getBestValueVehicles(10)}
            metric={(vehicle) => `${getAtlasVehicleScore(vehicle).value}/100`}
          />

          <RankingSection
            title="🚗 Best Daily Drivers"
            description="Ranked by handling, braking, seats, and drivetrain."
            vehicles={getBestDailyDriverVehicles(10)}
            metric={(vehicle) =>
              `${getAtlasVehicleScore(vehicle).dailyDriver}/100`
            }
          />

          <RankingSection
            title="🌱 Best Beginner Vehicles"
            description="Ranked by affordability, handling, braking, and stability."
            vehicles={getBestBeginnerVehicles(10)}
            metric={(vehicle) =>
              `${getAtlasVehicleScore(vehicle).beginner}/100`
            }
          />

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
            title="💵 Cheapest Vehicles"
            description="Ranked by lowest purchase price."
            vehicles={getCheapestVehicles(10)}
            metric={(vehicle) => `$${vehicle.price.toLocaleString()}`}
          />
        </div>
      </Container>
    </main>
  );
}