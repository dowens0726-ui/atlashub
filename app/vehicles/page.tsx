import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="AtlasHub"
          title="Vehicles"
          description="The vehicle database is coming soon."
        />

        <div className="mt-8">
          <Button href="/missions" variant="secondary">
            Browse Missions
          </Button>
        </div>
      </Container>
    </main>
  );
}