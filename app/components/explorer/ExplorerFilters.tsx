export type ExplorerFilterKey =
  | "vehicles"
  | "missions"
  | "weapons"
  | "businesses"
  | "collectibles";

export type ExplorerFiltersState = Record<ExplorerFilterKey, boolean>;

type ExplorerFiltersProps = {
  filters: ExplorerFiltersState;
  onToggle: (filter: ExplorerFilterKey) => void;
};

const filterItems: {
  key: ExplorerFilterKey;
  label: string;
  icon: string;
}[] = [
  { key: "vehicles", label: "Vehicles", icon: "🚗" },
  { key: "missions", label: "Missions", icon: "🎯" },
  { key: "weapons", label: "Weapons", icon: "🔫" },
  { key: "businesses", label: "Businesses", icon: "🏢" },
  { key: "collectibles", label: "Collectibles", icon: "📦" },
];

export default function ExplorerFilters({
  filters,
  onToggle,
}: ExplorerFiltersProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
        Filters
      </p>

      <div className="grid gap-2">
        {filterItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onToggle(item.key)}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
              filters[item.key]
                ? "border-emerald-400 bg-emerald-400 text-zinc-950"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-emerald-400"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}