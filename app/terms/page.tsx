import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Terms of Use"
          title="Using Atlas"
          description="Terms governing the use of the Atlas platform."
        />

        <div className="mt-10 max-w-4xl space-y-8 text-lg leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white">
              Acceptance
            </h2>

            <p className="mt-3">
              By using Atlas, you agree to these Terms of Use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Accuracy
            </h2>

            <p className="mt-3">
              While Atlas strives for accuracy, game information may change over
              time. Users should verify important details against the current
              version of the game when necessary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Intellectual Property
            </h2>

            <p className="mt-3">
              Atlas content, including Atlas Score, original descriptions, and
              original software, may not be reproduced without permission.
              Trademarks remain the property of their respective owners.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}