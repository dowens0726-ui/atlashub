type CommandHeaderProps = {
  query: string;
  onChange: (value: string) => void;
};

export default function CommandHeader({
  query,
  onChange,
}: CommandHeaderProps) {
  return (
    <div className="border-b border-zinc-800 p-4">
      <input
        autoFocus
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search Atlas..."
        className="w-full bg-transparent text-xl text-white outline-none placeholder:text-zinc-500"
      />

      <p className="mt-2 text-xs text-zinc-500">
        Search missions, vehicles, weapons and more.
      </p>
    </div>
  );
}