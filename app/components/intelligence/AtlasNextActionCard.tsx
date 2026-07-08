import Link from "next/link";
import type { NextAction } from "@/app/intelligence";

type AtlasNextActionCardProps = {
  action: NextAction;
};

export default function AtlasNextActionCard({
  action,
}: AtlasNextActionCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-400">
          Atlas Recommends
        </p>

        <h2 className="mt-4 text-4xl font-black text-white">
          {action.title}
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Stat
            label="Confidence"
            value={`${action.confidence}%`}
          />

          <Stat
            label="Category"
            value={action.category}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Why Atlas Chose This
          </p>

          <p className="mt-3 leading-7 text-zinc-300">
            {action.reason}
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-400">
            Expected Impact
          </p>

          <p className="mt-3 leading-7 text-zinc-300">
            {action.expectedImpact}
          </p>
        </div>

        {action.href ? (
          <Link
            href={action.href}
            className="mt-6 inline-flex rounded-xl bg-violet-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-violet-300"
          >
            {action.actionLabel} →
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  );
}