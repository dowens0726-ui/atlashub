import Link from "next/link";

import type {
  AtlasRelationships,
} from "@/app/intelligence";

type AtlasRelationshipPanelProps = {
  relationships: AtlasRelationships;
};

function Section({
  title,
  items,
}: {
  title: string;
  items: {
    slug: string;
    label: string;
    href: string;
  }[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
        {title}
      </h3>

      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              • {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AtlasRelationshipPanel({
  relationships,
}: AtlasRelationshipPanelProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Related Content
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Atlas analyzed the current content and found the strongest
          connected recommendations.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          title="Recommended Vehicles"
          items={relationships.vehicles.map((vehicle) => ({
            slug: vehicle.slug,
            label: vehicle.name,
            href: `/vehicles/${vehicle.slug}`,
          }))}
        />

        <Section
          title="Recommended Missions"
          items={relationships.missions.map((mission) => ({
            slug: mission.slug,
            label: mission.title,
            href: `/missions/${mission.slug}`,
          }))}
        />

        <Section
          title="Recommended Businesses"
          items={relationships.businesses.map((business) => ({
            slug: business.slug,
            label: business.name,
            href: `/data/businesses/${business.slug}`,
          }))}
        />

        <Section
          title="Recommended Weapons"
          items={relationships.weapons.map((weapon) => ({
            slug: weapon.slug,
            label: weapon.name,
            href: `/weapons/${weapon.slug}`,
          }))}
        />
      </div>

      {relationships.reasons.length > 0 && (
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <h3 className="text-sm font-semibold text-emerald-400">
            Atlas Insight
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {relationships.reasons[0].reason}
          </p>
        </div>
      )}
    </section>
  );
}