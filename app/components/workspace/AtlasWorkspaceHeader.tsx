import type { ReactNode } from "react";

export type AtlasWorkspaceHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  metadata?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default function AtlasWorkspaceHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  metadata,
  icon,
  className,
}: AtlasWorkspaceHeaderProps) {
  return (
    <header
      className={joinClasses(
        "relative overflow-hidden rounded-[28px] border border-white/10",
        "bg-[linear-gradient(145deg,rgba(15,23,42,0.90),rgba(9,15,28,0.76))]",
        "px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
        "sm:px-7 sm:py-7",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.10),transparent_32%)]"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          {breadcrumbs ? (
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {breadcrumbs}
            </div>
          ) : null}

          <div className="flex items-start gap-4">
            {icon ? (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-200 shadow-inner shadow-white/[0.04]">
                {icon}
              </div>
            ) : null}

            <div className="min-w-0">
              {eyebrow ? (
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                  {eyebrow}
                </div>
              ) : null}

              <h1 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                {title}
              </h1>

              {description ? (
                <div className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                  {description}
                </div>
              ) : null}

              {metadata ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {metadata}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
