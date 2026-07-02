import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";
import { MapCanvas } from "@/app/components/map";
import { getMapMarkers } from "@/app/services";

export default function MapPage() {
  const markers = getMapMarkers();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Explorer"
          title="Interactive Map"
          description="Explore missions, vehicles, weapons, and future GTA VI world content in one connected view."
        />

        <div className="mt-8">
          <MapCanvas markers={markers} />
        </div>
      </Container>
    </main>
  );
}