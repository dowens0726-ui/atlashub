export default function CommandEmpty() {
  return (
    <div className="p-8 text-center">
      <h3 className="text-lg font-semibold text-white">
        Welcome to Atlas Spotlight
      </h3>

      <p className="mt-2 text-sm text-zinc-400">
        Start typing to search the GTA VI universe.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {[
          "Fast Cars",
          "Money",
          "Weapons",
          "Story Missions",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}