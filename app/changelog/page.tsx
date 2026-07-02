import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Internal"
          title="Atlas Control Center"
          description="Private workspace for tracking Atlas development."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm uppercase tracking-wider text-emerald-400">
              Current Sprint
            </p>
            <h2 className="mt-3 text-2xl font-bold">Sprint 1.3</h2>
            <p className="mt-3 text-zinc-400">Mission Hub</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm uppercase tracking-wider text-yellow-400">
              Open Bugs
            </p>
            <h2 className="mt-3 text-4xl font-black">0</h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm uppercase tracking-wider text-blue-400">
              Feature Requests
            </p>
            <h2 className="mt-3 text-4xl font-black">0</h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm uppercase tracking-wider text-pink-400">
              Version
            </p>
            <h2 className="mt-3 text-3xl font-black">Beta v0.9</h2>
          </div>
        </div>
      </Container>
    </main>
  );
}