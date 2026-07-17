import Link from "next/link";
import GarageBuilderForm from "./GarageBuilderForm";

export default function GarageBuilder() {
  return (
    <section aria-labelledby="garage-builder-heading">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Atlas Garage
          </p>

          <h2
            id="garage-builder-heading"
            className="mt-2 text-3xl font-black text-white"
          >
            Build My Garage
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
            Tell Atlas your budget and play style to receive an optimized
            vehicle lineup built around performance, value, and utility.
          </p>
        </div>

        <Link
          href="/garage-builder"
          className="inline-flex w-fit items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-bold text-zinc-200 transition hover:border-emerald-400/50 hover:text-emerald-400"
        >
          ← Garage Center
        </Link>
      </div>

      <GarageBuilderForm />
    </section>
  );
}