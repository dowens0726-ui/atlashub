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
    <section className="py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Latest Updates
          </p>

          <h2 className="mt-2 text-4xl font-black">
            Recently Added
          </h2>
        </div>

        <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
          Live Updates
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:bg-zinc-800"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-3xl">
                {item.icon}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
                    {item.badge}
                  </span>
                </div>

                <p className="mt-2 text-zinc-400">
                  {item.description}
                </p>
              </div>
            </div>

            <span className="text-2xl text-zinc-600 transition group-hover:translate-x-1 group-hover:text-emerald-400">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}