import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Disclaimer"
          title="Independent Fan Project"
          description="Atlas is not affiliated with or endorsed by Rockstar Games or Take-Two Interactive."
        />

        <div className="mt-10 max-w-4xl space-y-8 text-lg leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white">Independence</h2>
            <p className="mt-3">
              Atlas is an independent fan-made companion platform. It is not
              sponsored, endorsed, approved, or affiliated with Rockstar Games,
              Take-Two Interactive, or any related entities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Trademarks</h2>
            <p className="mt-3">
              Grand Theft Auto, GTA, Rockstar Games, Take-Two Interactive, and
              related names, marks, characters, vehicles, locations, and assets
              are trademarks or property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Information</h2>
            <p className="mt-3">
              Atlas is provided for informational and entertainment purposes.
              Game details may change over time due to updates, patches, or new
              releases.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}