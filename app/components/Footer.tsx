import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>AtlasHub © 2026</p>

        <nav className="flex gap-5">
          <Link href="https://github.com/dowens0726-ui/atlashub" className="hover:text-emerald-400">
            GitHub
          </Link>

          <Link href="/version" className="hover:text-emerald-400">
            Version
          </Link>

          <Link href="/roadmap" className="hover:text-emerald-400">
            Roadmap
          </Link>
        </nav>
      </div>
    </footer>
  );
}