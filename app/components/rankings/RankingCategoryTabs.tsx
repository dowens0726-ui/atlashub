import Link from "next/link";

type RankingCategoryTabsProps = {
  activeCategory: string;
};

const categories = [
  {
    label: "Vehicles",
    value: "vehicles",
    icon: "🚗",
  },
  {
    label: "Businesses",
    value: "businesses",
    icon: "🏢",
  },
  {
    label: "Weapons",
    value: "weapons",
    icon: "🔫",
  },
  {
    label: "Missions",
    value: "missions",
    icon: "◎",
  },
];

export default function RankingCategoryTabs({
  activeCategory,
}: RankingCategoryTabsProps) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {categories.map((category) => {
        const active =
          activeCategory === category.value;

        return (
          <Link
            key={category.value}
            href={`/rankings?category=${category.value}`}
            className={`rounded-full px-5 py-3 text-sm font-black transition ${
              active
                ? "bg-amber-400 text-zinc-950"
                : "border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-amber-400 hover:text-white"
            }`}
          >
            {category.icon} {category.label}
          </Link>
        );
      })}
    </div>
  );
}