import type { ReactNode } from "react";

type AtlasSectionProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function AtlasSection({
  title,
  subtitle,
  actions,
  children,
  className = "",
}: AtlasSectionProps) {
  return (
    <section className={className}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {subtitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
              {subtitle}
            </p>
          )}

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
        </div>

        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>

      {children}
    </section>
  );
}