export default function WelcomeBanner() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Atlas Command Center
      </p>

      <h1 className="mt-3 text-5xl font-black text-white">
        Welcome back to Atlas
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
        Jump into vehicles, rankings, collections, recommendations, and
        intelligent tools built to help you spend less time searching and more
        time playing.
      </p>
    </section>
  );
}