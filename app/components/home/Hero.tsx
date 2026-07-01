import AtlasSearch from "../AtlasSearch";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 md:p-10 shadow-2xl">
      <h1 className="text-5xl font-black leading-tight sm:text-6xl md:text-7xl">
        ATLAS
      </h1>

      <p className="mt-4 text-2xl font-bold text-white">
        Spend Less Time Searching. More Time Playing.
      </p>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
        Your premium companion for missions, vehicles, weapons, collectibles,
        businesses, maps, comparisons, and everything else.
      </p>

      <div className="mt-10">
        <AtlasSearch />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/vehicles">Browse Vehicles</Button>

        <Button href="/compare" variant="secondary">
          Compare Vehicles
        </Button>
      </div>
    </section>
  );
}