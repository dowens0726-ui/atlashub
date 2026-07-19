import type { ReactNode } from "react";
import AtlasSurface from "./AtlasSurface";

type AtlasCardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  glow?: boolean;
};

export default function AtlasCard({
  title,
  subtitle,
  children,
  footer,
  className = "",
  glow = false,
}: AtlasCardProps) {
  return (
    <AtlasSurface
      tone="elevated"
      glow={glow}
      className={`p-6 ${className}`}
    >
      {(title || subtitle) && (
        <header className="mb-6">
          {subtitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              {subtitle}
            </p>
          )}

          {title && (
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>
          )}
        </header>
      )}

      <div>{children}</div>

      {footer && (
        <footer className="mt-6 border-t border-white/10 pt-4">
          {footer}
        </footer>
      )}
    </AtlasSurface>
  );
}