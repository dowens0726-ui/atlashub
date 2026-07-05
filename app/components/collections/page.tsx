import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Collections"
          title="Collections"
          description="Curated discovery paths powered by Atlas data and intelligence."
        />

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-400">
          Collections engine coming next.
        </div>
      </Container>
    </main>
  );
}