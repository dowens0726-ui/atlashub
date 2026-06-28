type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="🔍 Search missions..."
      className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-lg text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none"
    />
  );
}