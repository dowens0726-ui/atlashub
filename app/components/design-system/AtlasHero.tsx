import type { ReactNode } from "react";
import AtlasSurface from "./AtlasSurface";

type AtlasHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export default function AtlasHero({
  eyebrow,
  title,
  description,
  actions,
  children,
}: AtlasHeroProps) {
  return (
    <AtlasSurface
      tone="elevated"
      glow
      className="relative overflow-hidden p-8 md:p-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/10" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              {description}
            </p>
          )}

          {actions && (
            <div className="mt-8 flex flex-wrap gap-4">
              {actions}
            </div>
          )}
        </div>

        {children && (
          <div className="w-full max-w-md">
            {children}
          </div>
        )}
      </div>
    </AtlasSurface>
  );
}