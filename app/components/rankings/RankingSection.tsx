import RankingList from "./RankingList";

type RankingSectionProps<T> = {
  title: string;
  description: string;
  items: T[];
  metric: (item: T) => string;
  getKey: (item: T) => string;
  getHref: (item: T) => string;
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
};

export default function RankingSection<T>({
  title,
  description,
  items,
  metric,
  getKey,
  getHref,
  getTitle,
  getSubtitle,
}: RankingSectionProps<T>) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white">
          {title}
        </h2>

        <p className="mt-2 text-zinc-400">
          {description}
        </p>
      </div>

      <RankingList
        items={items}
        metric={metric}
        getKey={getKey}
        getHref={getHref}
        getTitle={getTitle}
        getSubtitle={getSubtitle}
      />
    </section>
  );
}