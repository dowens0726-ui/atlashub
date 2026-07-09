import RankingsClient from "./RankingsClient";
import Container from "@/app/components/ui/Container";

import {
  RankingCategoryTabs,
  RankingHero,
  RankingSection,
} from "@/app/components/rankings";

import {
  getAtlasVehicleScore,
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
  vehicleRankingAdapter,
} from "@/app/services";

import {
  getBestBeginnerBusinesses,
  getBestOverallBusinesses,
  getBestProgressionBusinesses,
  getBestSoloBusinesses,
  getMostProfitableBusinesses,
  businessRankingAdapter,
} from "@/app/services";

type RankingsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function RankingsPage({
  searchParams,
}: RankingsPageProps) {
  const params = await searchParams;

  const category = params?.category ?? "vehicles";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <RankingHero
          totalRankings={
            category === "businesses"
              ? 5
              : 10
          }
          totalCategories={4}
        />

        <RankingCategoryTabs
          activeCategory={category}
        />

        <div className="mt-12">
  <RankingsClient />
</div>

        <div className="mt-12 grid gap-8">
          {category === "businesses" ? (
            <>
              <RankingSection
                title="🏢 Best Overall Businesses"
                description="Ranked by total Atlas Business Score."
                items={getBestOverallBusinesses(10)}
                metric={(business) =>
                  `${business.name}`
                }
                {...businessRankingAdapter}
              />

              <RankingSection
                title="💰 Most Profitable Businesses"
                description="Ranked by income potential and profitability."
                items={getMostProfitableBusinesses(10)}
                metric={(business) =>
                  `${business.incomePotential}/100`
                }
                {...businessRankingAdapter}
              />

              <RankingSection
                title="🧑 Best Solo Businesses"
                description="Ranked by solo-friendly empire value."
                items={getBestSoloBusinesses(10)}
                metric={() => "Solo Ready"}
                {...businessRankingAdapter}
              />

              <RankingSection
                title="🌱 Best Beginner Businesses"
                description="Ranked by accessibility and difficulty."
                items={getBestBeginnerBusinesses(10)}
                metric={(business) =>
                  business.difficulty
                }
                {...businessRankingAdapter}
              />

              <RankingSection
                title="📈 Best Progression Businesses"
                description="Ranked by long-term empire growth."
                items={getBestProgressionBusinesses(10)}
                metric={() => "Progression"}
                {...businessRankingAdapter}
              />
            </>
          ) : (
            <>
              <RankingSection
                title="🏆 Best Overall"
                description="Ranked by overall Atlas Score."
                items={getBestOverallVehicles(10)}
                metric={(vehicle) =>
                  `${getAtlasVehicleScore(vehicle).overall}/100`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="🏁 Best Performance"
                description="Ranked by speed, acceleration, handling, and braking."
                items={getBestPerformanceVehicles(10)}
                metric={(vehicle) =>
                  `${getAtlasVehicleScore(vehicle).performance}/100`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="💰 Best Value"
                description="Ranked by performance relative to price."
                items={getBestValueVehicles(10)}
                metric={(vehicle) =>
                  `${getAtlasVehicleScore(vehicle).value}/100`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="🚗 Best Daily Drivers"
                description="Ranked by handling, braking, seats, and drivetrain."
                items={getBestDailyDriverVehicles(10)}
                metric={(vehicle) =>
                  `${getAtlasVehicleScore(vehicle).dailyDriver}/100`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="🌱 Best Beginner Vehicles"
                description="Ranked by affordability, handling, braking, and stability."
                items={getBestBeginnerVehicles(10)}
                metric={(vehicle) =>
                  `${getAtlasVehicleScore(vehicle).beginner}/100`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="🏎 Fastest Vehicles"
                description="Ranked by top speed."
                items={getFastestVehicles(10)}
                metric={(vehicle) =>
                  `${vehicle.topSpeed} mph`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="🚀 Best Acceleration"
                description="Ranked by acceleration rating."
                items={getBestAccelerationVehicles(10)}
                metric={(vehicle) =>
                  `${vehicle.acceleration}/100`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="🎯 Best Handling"
                description="Ranked by handling rating."
                items={getBestHandlingVehicles(10)}
                metric={(vehicle) =>
                  `${vehicle.handling}/100`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="💎 Most Expensive"
                description="Ranked by purchase price."
                items={getMostExpensiveVehicles(10)}
                metric={(vehicle) =>
                  `$${vehicle.price.toLocaleString()}`
                }
                {...vehicleRankingAdapter}
              />

              <RankingSection
                title="💵 Cheapest Vehicles"
                description="Ranked by lowest purchase price."
                items={getCheapestVehicles(10)}
                metric={(vehicle) =>
                  `$${vehicle.price.toLocaleString()}`
                }
                {...vehicleRankingAdapter}
              />
            </>
          )}
        </div>
      </Container>
    </main>
  );
}