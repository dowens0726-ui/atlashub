import {
  DatasetCard,
  EngineeringHealthPanel,
  EngineeringOverview,
  ManufacturerTable,
} from "@/app/components/engineering";

import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

import {
  buildEngineeringDashboard,
} from "@/app/engineering";


export default function EngineeringPage() {
  const dashboard =
    buildEngineeringDashboard();

  const {
    statistics,
  } = dashboard;


  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Engineering"
          title="Engineering Dashboard"
          description="Monitor content coverage, validation health, manufacturer depth, and cross-dataset relationships across AtlasHub."
        />


        <div className="mt-4">
          <p className="text-xs font-semibold text-zinc-600">
            Generated{" "}
            {new Date(
              dashboard.generatedAt
            ).toLocaleString(
              "en-US"
            )}
          </p>
        </div>


        <div className="mt-10">
          <EngineeringOverview
            statistics={
              statistics
            }
          />
        </div>


        <section className="mt-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
              Dataset Coverage
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              Content Library
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Current production content totals, featured records, and
              verification progress by entity type.
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {statistics.datasets.map(
              (
                dataset
              ) => (
                <DatasetCard
                  key={
                    dataset.entity
                  }
                  statistic={
                    dataset
                  }
                />
              )
            )}
          </div>
        </section>


        <div className="mt-10">
          <EngineeringHealthPanel
            health={
              statistics.health
            }
            relationships={
              statistics.relationships
            }
          />
        </div>


        <div className="mt-10">
          <ManufacturerTable
            manufacturers={
              statistics.manufacturers
            }
            largestManufacturer={
              statistics.largestManufacturer
            }
            smallestManufacturer={
              statistics.smallestManufacturer
            }
          />
        </div>
      </Container>
    </main>
  );
}