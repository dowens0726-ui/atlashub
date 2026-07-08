import type { ReactNode } from "react";

type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export default function HeroBanner({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-8 shadow-2xl">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative">
        {eyebrow ? (
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-4 text-5xl font-black tracking-tight text-white md:text-6xl">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            {subtitle}
          </p>
        ) : null}

        {actions ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {actions}
          </div>
        ) : null}

        {children ? (
          <div className="mt-10">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}