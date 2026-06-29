"use client";
import AtlasSearch from "./AtlasSearch";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/missions", label: "Missions" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/weapons", label: "Weapons" },
  { href: "/map", label: "Map" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4">
        <Link href="/" className="text-2xl font-black text-emerald-400">
          AtlasHub
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          
          <div className="hidden w-64 lg:block">
  <AtlasSearch />
</div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href
                  ? "text-emerald-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}