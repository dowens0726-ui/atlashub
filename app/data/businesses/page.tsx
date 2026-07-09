import { BusinessCard } from "@/app/components/businesses";
import {
  HeroBanner,
  HeroMetrics,
} from "@/app/components/design-system";
import DiscoveryToolbar from "@/app/components/discovery/DiscoveryToolbar";
import Container from "@/app/components/ui/Container";
import {
  getBusinesses,
  getSoloFriendlyBusinesses,
  getTopIncomeBusinesses,
} from "@/app/services";

export default function BusinessesPage() {
  const businesses = getBusinesses();
  const soloBusinesses = getSoloFriendlyBusinesses();
  const topIncomeBusiness = getTopIncomeBusinesses(1)[0];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container size="wide" className="py-10">
        <HeroBanner
          eyebrow="Atlas Enterprise"
          title="Business Intelligence"
          subtitle="Optimize your empire, analyze income opportunities, and discover the best businesses for your playstyle."
        >
          <HeroMetrics
            metrics={[
              {
                label: "Total Businesses",
                value: businesses.length.toString(),
              },
              {
                label: "Solo Friendly",
                value: soloBusinesses.length.toString(),
              },
              {
                label: "Top Income",
                value:
                  topIncomeBusiness?.name ??
                  "None",
              },
            ]}
            columns={3}
          />
        </HeroBanner>

        <DiscoveryToolbar
          title="Business Portfolio"
          count={businesses.length}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard
              key={business.slug}
              business={business}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}