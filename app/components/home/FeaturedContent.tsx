import Link from "next/link";

const featuredItems = [
  {
    title: "Vehicle Database",
    description: "Browse vehicles, stats, prices, and locations.",
    href: "/vehicles",
    icon: "🚗",
  },
  {
    title: "Atlas Compare",
    description: "Compare vehicles side by side.",
    href: "/compare?vehicle=comet-s2&compareWith=buffalo-stx",
    icon: "⚖️",
  },
  {
    title: "Mission Guide",
    description: "Review mission rewards, difficulty, and categories.",
    href: "/missions",
    icon: "🎯",
  },
];

export default function FeaturedContent() {
  return (
    <section className="py-10 md:py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black md:text-3xl">
          Featured
        </h2>

        <Link
          href="/explorer"
          className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
        >
          View All →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-3">
        {featuredItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-400"
          >
            <div className="text-3xl transition group-hover:scale-110">
              {item.icon}
            </div>

            <h3 className="mt-4 text-base font-bold md:text-xl">
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