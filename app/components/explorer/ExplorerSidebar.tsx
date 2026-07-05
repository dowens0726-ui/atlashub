import ExplorerFilters, {
  type ExplorerFilterKey,
  type ExplorerFiltersState,
} from "./ExplorerFilters";

type ExplorerSidebarProps = {
  filters: ExplorerFiltersState;
  onToggleFilter: (filter: ExplorerFilterKey) => void;
};

export default function ExplorerSidebar({
  filters,
  onToggleFilter,
}: ExplorerSidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          World Layers
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          Explorer Tools
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Toggle map layers to focus on vehicles, missions, weapons,
          businesses, and collectibles.
        </p>
      </div>

      <ExplorerFilters filters={filters} onToggle={onToggleFilter} />
    </div>
  );
}