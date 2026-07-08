import type { ReactNode } from "react";

type AtlasHeroStat = {
  label: string;
  value: string | number;
  detail?: string;
};

type AtlasHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats?: AtlasHeroStat[];
  children?: ReactNode;
};

export default function AtlasHero({
  eyebrow,
  title,
  description,
  stats = [],
  children,
}: AtlasHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-8 xl:p-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-16 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-amber-400">
          {eyebrow}
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-tight text-white xl:text-7xl">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
          {description}
        </p>

        {stats.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {stat.value}
                </p>

                {stat.detail ? (
                  <p className="mt-1 text-sm font-semibold text-zinc-500">
                    {stat.detail}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}