import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-black text-emerald-400"
        >
          AtlasHub
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-emerald-400">
            Home
          </Link>

          <Link href="/missions" className="hover:text-emerald-400">
            Missions
          </Link>

          <Link href="/vehicles" className="hover:text-emerald-400">
            Vehicles
          </Link>

          <Link href="/weapons" className="hover:text-emerald-400">
            Weapons
          </Link>

          <Link href="/map" className="hover:text-emerald-400">
            Map
          </Link>
        </nav>
      </div>
    </header>
  );
}