import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="About Atlas"
          title="Built for Players"
          description="Atlas exists to help players spend less time searching and more time playing."
        />

        <div className="mt-10 max-w-4xl space-y-8 text-lg leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white">
              Our Mission
            </h2>

            <p className="mt-3">
              Atlas is a modern gaming companion platform focused on delivering
              accurate, well-organized, and easy-to-understand information for
              Grand Theft Auto VI. Our goal is to replace scattered searches and
              outdated guides with a single, trusted destination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              What Makes Atlas Different
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Original descriptions and curated content</li>
              <li>Atlas Score for intelligent recommendations</li>
              <li>Automatic rankings powered by live data</li>
              <li>Fast search and modern navigation</li>
              <li>Designed for desktop and mobile players alike</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Looking Ahead
            </h2>

            <p className="mt-3">
              Atlas is designed to grow beyond GTA VI. The long-term vision is a
              unified companion platform supporting multiple games while
              maintaining the same quality, speed, and player-first experience.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}