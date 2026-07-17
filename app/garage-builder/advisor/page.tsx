import { GarageAdvisor } from "@/app/components/garage";
import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function GarageAdvisorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Garage"
          title="Analyze My Garage"
          description="Build your owned-vehicle profile and prepare it for Atlas intelligence analysis."
        />

        <div className="mt-10">
          <GarageAdvisor />
        </div>
      </Container>
    </main>
  );
}