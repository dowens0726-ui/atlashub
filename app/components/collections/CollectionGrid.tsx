import type { AtlasCollection } from "@/app/services/collection.service";
import CollectionCard from "./CollectionCard";

type CollectionGridProps = {
  collections: AtlasCollection[];
};

export default function CollectionGrid({
  collections,
}: CollectionGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.slug}
          collection={collection}
        />
      ))}
    </div>
  );
}