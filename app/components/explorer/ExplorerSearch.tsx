type ExplorerSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ExplorerSearch({
  value,
  onChange,
}: ExplorerSearchProps) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search Explorer..."
      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400"
    />
  );
}