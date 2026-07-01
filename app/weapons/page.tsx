import DiscoveryToolbar from "../components/discovery/DiscoveryToolbar";
import Link from "next/link";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import { weapons } from "../data/weapons";

export default function WeaponsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <PageHeader
          eyebrow="Atlas Armory"
          title="Weapons"
          description="Browse weapon stats, categories, prices, and performance."
        />
        <DiscoveryToolbar title="Weapon Database" count={weapons.length} />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {weapons.map((weapon) => (
            <Link
  key={weapon.slug}
  href={`/weapons/${weapon.slug}`}
  className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-emerald-400"
>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                {weapon.category}
              </p>

              <h2 className="mt-2 text-2xl font-bold">{weapon.name}</h2>

              <p className="mt-3 text-zinc-400">{weapon.description}</p>

              <div className="mt-6 text-sm text-zinc-400">
                Price: ${weapon.price.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}