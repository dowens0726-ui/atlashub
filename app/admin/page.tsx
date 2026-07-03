import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import VehicleGenerator from "../components/admin/VehicleGenerator";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Admin"
          title="Vehicle Generator"
          description="Internal development tools for generating Atlas vehicle objects."
        />

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <VehicleGenerator />
        </div>
      </Container>
    </main>
  );
}