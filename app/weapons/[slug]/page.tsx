import Link from "next/link";
import { notFound } from "next/navigation";

import { AtlasIntelligenceCard } from "@/app/components/intelligence";
import { AppShell } from "@/app/components/layout";
import { RecommendedMissions } from "@/app/components/mission";
import Container from "@/app/components/ui/Container";
import FeatureChip from "@/app/components/ui/FeatureChip";
import QuickActions from "@/app/components/ui/QuickActions";
import StatBar from "@/app/components/ui/StatBar";

import { weapons } from "@/app/data/weapons";
import { getMissionsForWeapon } from "@/app/services";

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

  const atlasScore = Math.round(
    (weapon.damage + weapon.fireRate + weapon.accuracy + weapon.range) / 4
  );

  return (
    <AppShell>
      <Container className="py-10">
        <Link
          href="/weapons"
          className="text-sm font-bold text-amber-400 hover:text-amber-300"
        >
          ← Back to Weapons
        </Link>

        <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-8">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-amber-400">
            {weapon.category}
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-white xl:text-7xl">
            {weapon.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            {weapon.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <FeatureChip>🔫 {weapon.category}</FeatureChip>
            <FeatureChip>💰 ${weapon.price.toLocaleString()}</FeatureChip>
          </div>
        </section>

        <div className="mt-6">
          <QuickActions
            actions={[
              {
                label: "Back to Weapons",
                href: "/weapons",
                icon: "⌖",
              },
              {
                label: "View Missions",
                href: "/missions",
                icon: "◎",
              },
              {
                label: "Compare",
                href: "/compare",
                icon: "⇄",
              },
              {
                label: "Rankings",
                href: "/rankings",
                icon: "▲",
              },
            ]}
          />
        </div>

        <div className="mt-10">
          <AtlasIntelligenceCard
            score={atlasScore}
            title="Atlas weapon analysis"
            summary={`${weapon.name} has been evaluated across damage, fire rate, accuracy, and range to determine how useful it is across combat scenarios.`}
            metrics={[
              {
                label: "Damage",
                value: `${weapon.damage}/100`,
              },
              {
                label: "Fire Rate",
                value: `${weapon.fireRate}/100`,
              },
              {
                label: "Accuracy",
                value: `${weapon.accuracy}/100`,
              },
              {
                label: "Range",
                value: `${weapon.range}/100`,
              },
            ]}
          />
        </div>

        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-bold">Performance</h2>

          <StatBar label="Damage" value={weapon.damage} max={100} />
          <StatBar label="Fire Rate" value={weapon.fireRate} max={100} />
          <StatBar label="Accuracy" value={weapon.accuracy} max={100} />
          <StatBar label="Range" value={weapon.range} max={100} />
        </div>

        <RecommendedMissions title="Best Used In" missions={recommendedMissions} />
      </Container>
    </AppShell>
  );
}