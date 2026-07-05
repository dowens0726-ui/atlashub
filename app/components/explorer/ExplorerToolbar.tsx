import ExplorerSearch from "./ExplorerSearch";

type ExplorerToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export default function ExplorerToolbar({
  searchQuery,
  onSearchChange,
}: ExplorerToolbarProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
      <ExplorerSearch value={searchQuery} onChange={onSearchChange} />

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-bold text-emerald-400">
        Atlas Explorer
      </div>
    </div>
  );
}