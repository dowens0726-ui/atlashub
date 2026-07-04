import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function DataPolicyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Data Policy"
          title="Trust Through Transparency"
          description="How Atlas collects, verifies, and presents information."
        />

        <div className="mt-10 max-w-4xl space-y-8 text-lg leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white">Original Content</h2>
            <p className="mt-3">
              Atlas descriptions, recommendations, rankings, and Atlas Score
              logic are written and maintained by Atlas. We avoid copying
              third-party descriptions or guide text.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Data Sources</h2>
            <p className="mt-3">
              Atlas may use official game information, in-game testing, patch
              notes, and community-verified observations to improve accuracy.
              Where information is uncertain, Atlas may mark it as pending or
              unverified.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Atlas Score</h2>
            <p className="mt-3">
              Atlas Score is a proprietary scoring system designed to help
              players compare vehicles and make faster decisions. It is based on
              performance, value, usability, and beginner friendliness.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}