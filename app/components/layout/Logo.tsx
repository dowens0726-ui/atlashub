import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400 text-lg font-black text-zinc-950 shadow-[0_0_30px_rgba(251,191,36,0.15)] transition group-hover:bg-amber-300">
        A
      </div>

      <div>
        <p className="text-sm font-black uppercase tracking-[0.35em] text-white">
          Atlas
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Hub
        </p>
      </div>
    </Link>
  );
}