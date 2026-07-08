export default function PlannerHeader() {
  return (
    <section className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Atlas Planner
      </p>

      <h1 className="mt-3 text-5xl font-black text-white">
        Build Your Empire
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
        Atlas turns your profile, budget, owned content, and play style into a
        personalized progression roadmap.
      </p>
    </section>
  );
}