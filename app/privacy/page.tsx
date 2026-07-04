import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Privacy Policy"
          title="Your Privacy"
          description="Atlas respects your privacy and is committed to protecting your information."
        />

        <div className="mt-10 max-w-4xl space-y-8 text-lg leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white">
              Information We Collect
            </h2>

            <p className="mt-3">
              Atlas currently collects little to no personal information. As
              future features such as user accounts and favorites are added,
              this policy will be updated accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Analytics
            </h2>

            <p className="mt-3">
              Atlas may use anonymous analytics to improve performance and user
              experience. No personally identifiable information is sold to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Changes
            </h2>

            <p className="mt-3">
              This Privacy Policy may be updated as Atlas evolves and new
              features are introduced.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}