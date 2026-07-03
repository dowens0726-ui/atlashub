import Container from "@/app/components/ui/Container";
import PageHeader from "@/app/components/ui/PageHeader";
import { ManufacturerCard } from "@/app/components/manufacturers";
import { getManufacturers } from "@/app/services/manufacturer.service";

export default function ManufacturersPage() {
  const manufacturers = getManufacturers();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Garage"
          title="Manufacturers"
          description="Explore vehicle manufacturers, brand lineups, Atlas Scores, and performance leaders."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {manufacturers.map((manufacturer) => (
            <ManufacturerCard
              key={manufacturer.slug}
              manufacturer={manufacturer}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}