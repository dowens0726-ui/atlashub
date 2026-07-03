import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function ImportPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Admin"
          title="Bulk Import"
          description="Internal tool for generating Atlas content from structured data."
        />

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          Bulk import tool coming next.
        </div>
      </Container>
    </main>
  );
}