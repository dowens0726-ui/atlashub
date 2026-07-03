import Link from "next/link";

const items = [
  {
    title: "Atlas Command Center",
    description: "Search the entire Atlas platform with Ctrl + K.",
    href: "/",
    icon: "⌨️",
    badge: "NEW",
  },
  {
    title: "Vehicle Compare",
    description: "Compare two vehicles side by side.",
    href: "/compare",
    icon: "⚖️",
    badge: "UPDATED",
  },
  {
    title: "Comet S2",
    description: "Premium sports car added to the database.",
    href: "/vehicles/comet-s2",
    icon: "🚗",
    badge: "VEHICLE",
  },
];

export default function RecentlyAdded() {
  return (
    <section className="py-10 md:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 md:text-sm">
            Latest Updates
          </p>

          <h2 className="mt-2 text-2xl font-black md:text-4xl">
            Recently Added
          </h2>
        </div>

        <span className="hidden rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-400 sm:inline-flex">
          Live Updates
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:bg-zinc-800 md:p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-2xl md:h-14 md:w-14 md:text-3xl">
              {item.icon}
            </div>

            <span className="mt-4 inline-flex rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-400 md:px-3 md:text-xs">
              {item.badge}
            </span>

            <h3 className="mt-3 text-base font-bold text-white md:text-xl">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}