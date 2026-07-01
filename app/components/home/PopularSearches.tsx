const searches = [
  "🔥 Fastest Car",
  "💰 Best Money Method",
  "🚁 Helicopter Locations",
  "🔫 Weapon Locations",
  "⭐ Hidden Businesses",
];

export default function PopularSearches() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
        Popular Searches
      </p>

      <div className="mt-4 grid gap-3">
        {searches.map((search) => (
          <div
            key={search}
            className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300 transition-all duration-200 hover:scale-[1.02] hover:border-emerald-400 hover:bg-zinc-800"
          >
            {search}
          </div>
        ))}
      </div>
    </section>
  );
}