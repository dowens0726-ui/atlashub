type DiscoveryToolbarProps = {
  title: string;
  count: number;
  eyebrow?: string;
};

export default function DiscoveryToolbar({
  title,
  count,
  eyebrow = "Atlas Database",
}: DiscoveryToolbarProps) {
  return (
    <section className="mb-8 flex flex-col gap-5 rounded-3xl border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          {eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          {title}
        </h2>

        <p className="mt-2 text-zinc-400">
          {count} items indexed by Atlas
        </p>
      </div>

      <div className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2 text-sm font-bold text-emerald-400">
        Live Database
      </div>
    </section>
  );
}