import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";
import { CollectionGrid } from "@/app/components/collections";
import { getCollections } from "@/app/services/collection.service";

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Discovery"
          title="Collections"
          description="Discover curated vehicle collections powered by Atlas Intelligence."
        />

        <div className="mt-10">
          <CollectionGrid collections={collections} />
        </div>
      </Container>
    </main>
  );
}
