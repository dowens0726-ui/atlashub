import type { AtlasCollection } from "@/app/services/collection.service";

type CollectionHeroProps = {
  collection: AtlasCollection;
};

export default function CollectionHero({ collection }: CollectionHeroProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="text-5xl">{collection.emoji}</div>

      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Atlas Collection
      </p>

      <h1 className="mt-3 text-5xl font-black text-white">
        {collection.title}
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
        {collection.description}
      </p>
    </section>
  );
}