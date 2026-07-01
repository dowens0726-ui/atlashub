export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-bold text-white">ATLAS</span> — Spend Less Time Searching. More Time Playing.
        </p>

        <p>v0.5.0-alpha</p>
      </div>
    </footer>
  );
}