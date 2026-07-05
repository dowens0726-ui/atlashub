import { GarageBuilderForm } from "@/app/components/garage";
import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function GarageBuilderPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Intelligence"
          title="Garage Builder"
          description="Build a recommended garage based on your budget and play style."
        />

        <div className="mt-10">
          <GarageBuilderForm />
        </div>
      </Container>
    </main>
  );
}