import { BusinessCard } from "@/app/components/businesses";
import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";
import { getBusinesses } from "@/app/services";

export default function BusinessesPage() {
  const businesses = getBusinesses();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Enterprise"
          title="Businesses"
          description="Browse business opportunities, income potential, and Atlas recommendations."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.slug} business={business} />
          ))}
        </div>
      </Container>
    </main>
  );
}