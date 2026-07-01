import AtlasSearch from "../AtlasSearch";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Atlas Companion for GTA VI
      </p>

      <h1 className="text-6xl font-black leading-tight md:text-7xl">
        MASTER GTA VI.
      </h1>

      <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300">
        <span className="font-semibold text-white">
          Spend Less Time Searching. More Time Playing.
        </span>
        <br />
        Atlas is your premium companion for missions, vehicles,
        weapons, collectibles, businesses, and everything else.
      </p>

      <div className="mt-10">
        <AtlasSearch />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/missions">
          Explore Missions
        </Button>

        <Button href="/vehicles" variant="secondary">
          Browse Vehicles
        </Button>
      </div>
    </section>
  );
}