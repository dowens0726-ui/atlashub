import RankingCard from "./RankingCard";

type RankingListProps<T> = {
  items: T[];
  metric: (item: T) => string;
  getKey: (item: T) => string;
  getHref: (item: T) => string;
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
};

export default function RankingList<T>({
  items,
  metric,
  getKey,
  getHref,
  getTitle,
  getSubtitle,
}: RankingListProps<T>) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <RankingCard
          key={getKey(item)}
          rank={index + 1}
          item={item}
          metric={metric(item)}
          href={getHref(item)}
          title={getTitle(item)}
          subtitle={
            getSubtitle
              ? getSubtitle(item)
              : undefined
          }
        />
      ))}
    </div>
  );
}