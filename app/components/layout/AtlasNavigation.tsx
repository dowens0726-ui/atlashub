"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AtlasNavigationItem = {
  label: string;
  href: string;
  icon: string;
  description: string;
};

type AtlasNavigationSection = {
  label: string;
  items: AtlasNavigationItem[];
};

type AtlasNavigationProps = {
  onNavigate?: () => void;
};

const navigationSections: AtlasNavigationSection[] = [
  {
    label: "Command",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: "⌂",
        description: "Empire command center",
      },
      {
        label: "Copilot",
        href: "/copilot",
        icon: "✦",
        description: "Atlas AI guidance",
      },
      {
        label: "Profile",
        href: "/profile",
        icon: "◉",
        description: "Player identity",
      },
      {
        label: "Planner",
        href: "/planner",
        icon: "✓",
        description: "Objectives and strategy",
      },
    ],
  },
  {
    label: "Empire",
    items: [
      {
        label: "Businesses",
        href: "/businesses",
        icon: "▦",
        description: "Business operations",
      },
      {
        label: "Vehicles",
        href: "/vehicles",
        icon: "◆",
        description: "Vehicle intelligence",
      },
      {
        label: "Properties",
        href: "/properties",
        icon: "◇",
        description: "Property portfolio",
      },
      {
        label: "Weapons",
        href: "/weapons",
        icon: "⌁",
        description: "Loadout intelligence",
      },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        label: "Explorer",
        href: "/explorer",
        icon: "◎",
        description: "World discovery",
      },
      {
        label: "Rankings",
        href: "/rankings",
        icon: "▲",
        description: "Performance rankings",
      },
    ],
  },
];

function isNavigationItemActive(
  pathname: string,
  href: string
): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AtlasNavigation({
  onNavigate,
}: AtlasNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="space-y-7"
    >
      {navigationSections.map((section) => (
        <section key={section.label}>
          <p className="mb-3 px-4 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-600">
            {section.label}
          </p>

          <div className="space-y-1.5">
            {section.items.map((item) => {
              const active = isNavigationItemActive(
                pathname,
                item.href
              );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  title={item.description}
                  onClick={onNavigate}
                  className={[
                    "group relative flex items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3",
                    "transition-all duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
                    active
                      ? "border-cyan-400/20 bg-cyan-400/10 text-white shadow-[0_12px_30px_-18px_rgba(34,211,238,0.8)]"
                      : "border-transparent text-zinc-400 hover:border-white/5 hover:bg-white/[0.04] hover:text-white",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-base",
                      "transition-all duration-200",
                      active
                        ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
                        : "border-white/5 bg-white/[0.03] text-zinc-500 group-hover:border-white/10 group-hover:text-zinc-200",
                    ].join(" ")}
                  >
                    {item.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {item.label}
                    </span>

                    <span
                      className={[
                        "mt-0.5 block truncate text-xs",
                        active
                          ? "text-cyan-100/60"
                          : "text-zinc-600 group-hover:text-zinc-500",
                      ].join(" ")}
                    >
                      {item.description}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={[
                      "text-sm transition-all duration-200",
                      active
                        ? "translate-x-0 text-cyan-300 opacity-100"
                        : "-translate-x-1 text-zinc-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    ].join(" ")}
                  >
                    ›
                  </span>

                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </nav>
  );
}