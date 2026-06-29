type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "🔍 Search...",
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-lg text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none"
    />
  );
}