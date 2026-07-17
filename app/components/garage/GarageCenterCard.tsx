import Link from "next/link";
import type { ReactNode } from "react";

type GarageCenterCardProps = {
  title: string;
  description: string;
  eyebrow: string;
  href?: string;
  actionLabel: string;
  icon: ReactNode;
  status?: string;
};

export default function GarageCenterCard({
  title,
  description,
  eyebrow,
  href,
  actionLabel,
  icon,
  status,
}: GarageCenterCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-2xl">
          {icon}
        </div>

        {status ? (
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {status}
          </span>
        ) : null}
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">{title}</h2>

        <p className="mt-3 leading-7 text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-emerald-400">
        <span>{actionLabel}</span>
        {href ? <span aria-hidden="true">→</span> : null}
      </div>
    </>
  );

  const className =
    "group block h-full rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl transition duration-200 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-zinc-900";

  if (!href) {
    return (
      <article className={`${className} cursor-default hover:translate-y-0`}>
        {content}
      </article>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}