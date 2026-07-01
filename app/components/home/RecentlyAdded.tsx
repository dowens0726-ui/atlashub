import Link from "next/link";

const items = [
  {
    title: "Atlas Command Center",
    description: "Search the entire Atlas platform with Ctrl + K.",
    href: "/",
    icon: "⌨️",
  },
  {
    title: "Vehicle Compare",
    description: "Compare two vehicles side by side.",
    href: "/compare",
    icon: "⚖️",
  },
  {
    title: "Comet S2",
    description: "Premium sports car added to the database.",
    href: "/vehicles/comet-s2",
    icon: "🚗",
  },
];

export default function RecentlyAdded() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-black">Recently Added</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-emerald-400"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>

              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            </div>

            <span className="text-emerald-400">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}