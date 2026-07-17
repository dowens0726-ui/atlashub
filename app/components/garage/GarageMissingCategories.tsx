type GarageMissingCategoriesProps = {
  categories: string[];
};

export default function GarageMissingCategories({
  categories,
}: GarageMissingCategoriesProps) {
  return (
    <article className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
        Capability Gaps
      </p>

      <h3 className="mt-2 text-2xl font-black text-white">
        Missing Categories
      </h3>

      <p className="mt-3 leading-7 text-zinc-400">
        Categories below Atlas coverage standards are prioritized for future
        purchases.
      </p>

      {categories.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-200"
            >
              {category}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
          <p className="font-bold text-emerald-400">
            Balanced coverage
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Your garage currently meets Atlas coverage standards in every
            measured category.
          </p>
        </div>
      )}
    </article>
  );
}