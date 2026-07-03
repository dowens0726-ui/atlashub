import Link from "next/link";

const quickLaunchItems = [
  {
    title: "Explorer",
    description: "Open the interactive Atlas map.",
    href: "/map",
    icon: "🗺️",
  },
  {
    title: "Vehicles",
    description: "Browse cars, bikes, boats, and aircraft.",
    href: "/vehicles",
    icon: "🚗",
  },
  {
    title: "Missions",
    description: "Find rewards, tips, and mission paths.",
    href: "/missions",
    icon: "🎯",
  },
  {
    title: "Weapons",
    description: "Compare damage, range, and accuracy.",
    href: "/weapons",
    icon: "🔫",
  },
];

export default function QuickLaunch() {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Quick Launch
        </p>
        <h2 className="mt-2 text-3xl font-black">Jump back into Atlas</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickLaunchItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:-translate-y-1 hover:border-emerald-400"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}