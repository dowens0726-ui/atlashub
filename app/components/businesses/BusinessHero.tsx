import type { Business } from "@/app/types";

type BusinessHeroProps = {
  business: Business;
};

export default function BusinessHero({ business }: BusinessHeroProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Atlas Enterprise
      </p>

      <h1 className="mt-3 text-5xl font-black text-white">
        {business.name}
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
        {business.description}
      </p>
    </section>
  );
}