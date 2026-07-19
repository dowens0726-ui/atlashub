import type { ReactNode } from "react";

type AtlasCommandRailProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  status?: string;
  action?: ReactNode;
  className?: string;
};

export default function AtlasCommandRail({
  children,
  title,
  description,
  status,
  action,
  className = "",
}: AtlasCommandRailProps) {
  const hasHeader =
    Boolean(title) ||
    Boolean(description) ||
    Boolean(status) ||
    Boolean(action);

  return (
    <aside
      className={[
        "relative min-w-0 overflow-hidden rounded-[2rem] border border-cyan-400/10",
        "bg-gradient-to-b from-cyan-400/[0.045] via-white/[0.02] to-transparent",
        "shadow-[0_30px_100px_-60px_rgba(34,211,238,0.5)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/[0.075] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
      />

      <div className="relative p-5 sm:p-6 lg:p-8">
        {hasHeader ? (
          <header className="mb-6 border-b border-white/[0.06] pb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {status ? (
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.8)]"
                    />

                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                      {status}
                    </p>
                  </div>
                ) : null}

                {title ? (
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    {title}
                  </h2>
                ) : null}

                {description ? (
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {description}
                  </p>
                ) : null}
              </div>

              {action ? (
                <div className="shrink-0">
                  {action}
                </div>
              ) : null}
            </div>
          </header>
        ) : null}

        <div className="min-w-0 space-y-6">
          {children}
        </div>
      </div>
    </aside>
  );
}