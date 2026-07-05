import Link from "next/link";
import type { AtlasCollection } from "@/app/services/collection.service";

type CollectionCardProps = {
  collection: AtlasCollection;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-white transition hover:-translate-y-1 hover:border-emerald-400"
    >
      <div className="text-4xl">{collection.emoji}</div>

      <h2 className="mt-5 text-2xl font-black">{collection.title}</h2>

      <p className="mt-3 leading-7 text-zinc-400">
        {collection.description}
      </p>

      <p className="mt-6 font-semibold text-emerald-400 transition group-hover:translate-x-1">
        Explore Collection →
      </p>
    </Link>
  );
}