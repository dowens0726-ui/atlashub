import type { SearchResult } from "@/app/services";
import AtlasSearchResult from "./AtlasSearchResult";

type AtlasSearchResultsProps = {
  query: string;
  results: SearchResult[];
  selectedIndex?: number;
  onSelect?: () => void;
};

export default function AtlasSearchResults({
  query,
  results,
  selectedIndex = 0,
  onSelect,
}: AtlasSearchResultsProps) {
  if (!query.trim()) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-400">
          Atlas Search
        </p>

        <h3 className="mt-3 text-2xl font-black text-white">
          Search anything.
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Find vehicles, businesses, missions, weapons, pages, and Atlas tools
          in seconds.
        </p>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Try searching for...
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300">
              🚗 Vehicles
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300">
              🏢 Agency
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300">
              👤 Empire
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300">
              🗺 Mission Planner
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300">
              🔫 Weapons
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300">
              📈 Rankings
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-zinc-500">
          No Results
        </p>

        <h3 className="mt-3 text-2xl font-black text-white">
          Nothing found for "{query}"
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Try searching for a vehicle, business, mission, weapon, or Atlas page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {results.map((result, index) => (
        <AtlasSearchResult
          key={result.id}
          result={result}
          active={index === selectedIndex}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}