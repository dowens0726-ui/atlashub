"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CommandPalette from "./CommandPalette";
import ReleaseCountdown from "./ReleaseCountdown";

const links = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/missions", label: "Missions" },
  { href: "/weapons", label: "Weapons" },
  { href: "/compare", label: "Compare" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-80"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/branding/atlas-logo.svg"
              alt="Atlas"
              width={160}
              height={40}
              priority
            />
          </Link>

          <div className="ml-4">
  <ReleaseCountdown />
</div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
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

        <button
          onClick={() => setMobileOpen((current) => !current)}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-300 md:hidden"
        >
          ☰
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-zinc-800 px-6 py-4 md:hidden">
          <div className="mb-4">
            <ReleaseCountdown />
          </div>

          <div className="mb-4">
            <CommandPalette />
          </div>

          <div className="grid gap-2">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 font-medium transition ${
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
      )}
    </header>
  );
}