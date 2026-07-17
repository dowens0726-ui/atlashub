import { GarageBuilder } from "@/app/components/garage";
import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function GarageBuilderPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Intelligence"
          title="Garage Builder"
          description="Create a recommended vehicle lineup based on your budget and preferred play style."
        />

        <div className="mt-10">
          <GarageBuilder />
        </div>
      </Container>
    </main>
  );
}