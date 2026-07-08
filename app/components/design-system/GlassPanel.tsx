import type { ReactNode } from "react";

type GlassPanelProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export default function GlassPanel({
  title,
  subtitle,
  children,
  className = "",
}: GlassPanelProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-[2rem]
      border border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      shadow-[0_20px_80px_rgba(0,0,0,0.35)]
      ${className}`}
    >
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-fuchsia-500/5" />

      <div className="relative p-6">
        {(title || subtitle) && (
          <header className="mb-6">
            {title && (
              <h3 className="text-xl font-black tracking-tight text-white">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {children}
      </div>
    </section>
  );
}