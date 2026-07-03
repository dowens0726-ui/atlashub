import type { ManufacturerSummary } from "@/app/services/manufacturer.service";

type ManufacturerHeroProps = {
  manufacturer: ManufacturerSummary;
};

export default function ManufacturerHero({
  manufacturer,
}: ManufacturerHeroProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Atlas Manufacturer
      </p>

      <h1 className="mt-3 text-5xl font-black text-white">
        {manufacturer.name}
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
        Explore {manufacturer.name} vehicles, performance rankings, Atlas Score
        insights, and related Garage data.
      </p>
    </section>
  );
}