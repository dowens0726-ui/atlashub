import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";

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
      <SectionHeader
        eyebrow="Quick Launch"
        title="Jump back into Atlas"
        description="Open Explorer, vehicles, missions, and weapons in one click."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickLaunchItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="text-4xl transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </div>

            <h3 className="mt-4 text-xl font-bold">
              {item.title}
            </h3>

            <p className="mt-2 flex-1 text-sm leading-6 text-zinc-400">
              {item.description}
            </p>

            <p className="mt-5 font-semibold text-emerald-400 transition-transform duration-200 group-hover:translate-x-1">
              Open →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}