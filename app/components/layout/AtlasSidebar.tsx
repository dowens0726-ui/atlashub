"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  label: string;
  href: string;
  icon: string;
};

const navigation: NavigationItem[] = [
  { label: "Dashboard", href: "/", icon: "🏠" },
  { label: "Copilot", href: "/copilot", icon: "🤖" },
  { label: "Profile", href: "/profile", icon: "👤" },
  { label: "Planner", href: "/planner", icon: "📋" },
  { label: "Businesses", href: "/businesses", icon: "🏢" },
  { label: "Vehicles", href: "/vehicles", icon: "🚗" },
  { label: "Properties", href: "/properties", icon: "🏠" },
  { label: "Weapons", href: "/weapons", icon: "🔫" },
  { label: "Explorer", href: "/explorer", icon: "🗺️" },
  { label: "Rankings", href: "/rankings", icon: "⭐" },
];

export default function AtlasSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-zinc-950/95 backdrop-blur-xl">
      <div className="border-b border-white/10 px-8 py-8">
        <h1 className="text-3xl font-black tracking-tight text-white">
          ATLAS
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          AI Gaming Command Center
        </p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {navigation.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-4 rounded-2xl px-4 py-3",
                "transition-all duration-300",
                active
                  ? "border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-6">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Atlas AI
          </p>

          <p className="mt-2 text-sm text-zinc-300">
            Your empire is ready.
          </p>
        </div>
      </div>
    </aside>
  );
}