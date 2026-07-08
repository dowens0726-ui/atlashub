type AtlasSearchInputProps = {
  query: string;
  onChange: (query: string) => void;
};

export default function AtlasSearchInput({
  query,
  onChange,
}: AtlasSearchInputProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4">
      <input
        autoFocus
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search Atlas..."
        className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-zinc-600"
      />
    </div>
  );
}