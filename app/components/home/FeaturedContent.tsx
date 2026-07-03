import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";

const featuredItems = [
  {
    title: "🚗 Vehicle Spotlight",
    subtitle: "Truffade Adder",
    description:
      "One of San Andreas' most legendary hypercars. Incredible speed, iconic styling, and still a fan favorite.",
    href: "/vehicles/adder",
    badge: "Featured Vehicle",
  },
  {
    title: "🎯 Mission Spotlight",
    subtitle: "Pacific Standard Job",
    description:
      "One of the highest-paying heists. Bring a fast getaway car and a coordinated crew.",
    href: "/missions",
    badge: "Top Payout",
  },
  {
    title: "⚖️ Atlas Compare",
    subtitle: "Adder vs Zentorno",
    description:
      "See how two of GTA's most iconic supercars stack up side by side.",
    href: "/compare?vehicle=adder&compareWith=zentorno",
    badge: "Popular",
  },
];

export default function FeaturedContent() {
  return (
    <section>
      <SectionHeader
        eyebrow="Atlas Spotlight"
        title="Featured Today"
        description="Fresh recommendations and featured content from across Atlas."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {featuredItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
              {item.badge}
            </span>

            <h3 className="mt-5 text-lg font-bold text-zinc-300">
              {item.title}
            </h3>

            <h2 className="mt-2 text-3xl font-black">
              {item.subtitle}
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              {item.description}
            </p>

            <div className="mt-6 font-semibold text-emerald-400 transition-transform duration-200 group-hover:translate-x-1">
              Explore →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}