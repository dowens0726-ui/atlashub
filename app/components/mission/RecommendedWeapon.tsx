import Link from "next/link";
import { weapons } from "@/app/data/weapons";
import { Card, Badge } from "@/app/components/ui";

type RecommendedWeaponProps = {
  weaponSlug?: string;
};

export default function RecommendedWeapon({
  weaponSlug,
}: RecommendedWeaponProps) {
  if (!weaponSlug) return null;

  const weapon = weapons.find((weapon) => weapon.slug === weaponSlug);

  if (!weapon) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">Recommended Weapon</h2>

      <Link href={`/weapons/${weapon.slug}`}>
        <Card className="mt-4 transition hover:border-emerald-400">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-white">{weapon.name}</h3>
            <Badge>{weapon.category}</Badge>
          </div>

          <p className="mt-3 text-sm text-zinc-400">
            {weapon.description}
          </p>
        </Card>
      </Link>
    </section>
  );
}