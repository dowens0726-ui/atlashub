import Link from "next/link";

import type { Weapon } from "@/app/types";

type WeaponCardProps = {
  weapon: Weapon;
};

export default function WeaponCard({
  weapon,
}: WeaponCardProps) {
  return (
    <Link
      href={`/weapons/${weapon.slug}`}
      className="group block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400"
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
        {weapon.category}
      </p>

      <h2 className="mt-2 text-2xl font-black text-white">
        {weapon.name}
      </h2>

      <p className="mt-3 text-zinc-400">
        {weapon.description}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
          <p className="text-zinc-500">
            Damage
          </p>

          <p className="mt-1 font-bold text-white">
            {weapon.damage}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
          <p className="text-zinc-500">
            Range
          </p>

          <p className="mt-1 font-bold text-white">
            {weapon.range}
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-zinc-400">
        Price: ${weapon.price.toLocaleString()}
      </div>
    </Link>
  );
}