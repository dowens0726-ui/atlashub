"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandPalette from "./CommandPalette";

const links = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/missions", label: "Missions" },
  { href: "/weapons", label: "Weapons" },
  { href: "/compare", label: "Compare" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-black tracking-wide text-white transition hover:text-emerald-400"
        >
          ATLAS
        </Link>

        <div className="flex items-center gap-6">
          <CommandPalette />

          <div className="flex items-center gap-2">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    active
                      ? "bg-emerald-500 text-zinc-950"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}