import AtlasSearch from "../AtlasSearch";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-2xl sm:p-8 md:p-10">
      <h1 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
        ATLAS
      </h1>

      <p className="mt-4 text-xl font-bold text-white sm:text-2xl">
        Spend Less Time Searching. More Time Playing.
      </p>

      <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
        Your premium companion for missions, vehicles, weapons, collectibles,
        businesses, maps, comparisons, and everything else.
      </p>

      <div className="mt-7 sm:mt-10">
        <AtlasSearch />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8">
        <Button href="/vehicles">Vehicles</Button>

        <Button href="/compare" variant="secondary">
          Compare
        </Button>
      </div>
    </section>
  );
}