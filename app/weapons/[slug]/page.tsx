import { notFound } from "next/navigation";

import { RecommendedMissions } from "@/app/components/mission";
import Container from "@/app/components/ui/Container";
import FeatureChip from "@/app/components/ui/FeatureChip";
import StatBar from "@/app/components/ui/StatBar";

import { weapons } from "@/app/data/weapons";

import { getMissionsForWeapon } from "@/app/services"

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WeaponPage({ params }: Props) {
  const { slug } = await params;

  const weapon = weapons.find((item) => item.slug === slug);

  if (!weapon) {
    notFound();
  }

  const recommendedMissions = getMissionsForWeapon(weapon.slug);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
          {weapon.category}
        </p>

        <h1 className="mt-3 text-5xl font-black">
          {weapon.name}
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-zinc-300">
          {weapon.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <FeatureChip>🔫 {weapon.category}</FeatureChip>
          <FeatureChip>
            💰 ${weapon.price.toLocaleString()}
          </FeatureChip>
        </div>

        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-bold">
            Performance
          </h2>

          <StatBar label="Damage" value={weapon.damage} max={100} />
          <StatBar label="Fire Rate" value={weapon.fireRate} max={100} />
          <StatBar label="Accuracy" value={weapon.accuracy} max={100} />
          <StatBar label="Range" value={weapon.range} max={100} />
        </div>

        <RecommendedMissions
          title="Best Used In"
          missions={recommendedMissions}
        />
      </Container>
    </main>
  );
}