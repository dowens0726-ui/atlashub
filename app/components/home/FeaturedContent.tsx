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
    <section className="py-16">
      <h2 className="text-3xl font-black">Featured</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {featuredItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-emerald-400"
          >
            <div className="text-4xl">{item.icon}</div>

            <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

            <p className="mt-2 text-zinc-400">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}