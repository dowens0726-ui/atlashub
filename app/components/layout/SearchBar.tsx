export default function SearchBar() {
  return (
    <button
      type="button"
      className="hidden w-full max-w-xl items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-left text-sm text-zinc-500 transition hover:border-amber-400/50 hover:text-zinc-300 md:flex"
    >
      <span>Search Atlas...</span>

      <span className="rounded-lg border border-zinc-800 px-2 py-1 text-xs font-bold text-zinc-600">
        Ctrl K
      </span>
    </button>
  );
}