import type { ReactNode } from "react";

export type AtlasWorkspaceInspectorProps = {
  title?: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  status?: "idle" | "active" | "success" | "warning";
  className?: string;
};

const statusClasses = {
  idle: "bg-slate-400",
  active: "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.75)]",
  success: "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.70)]",
  warning: "bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.70)]",
};

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default function AtlasWorkspaceInspector({
  title = "Atlas Inspector",
  eyebrow = "Contextual Intelligence",
  description,
  actions,
  children,
  footer,
  status = "active",
  className,
}: AtlasWorkspaceInspectorProps) {
  return (
    <section
      className={joinClasses(
        "relative overflow-hidden rounded-[24px] border border-white/10",
        "bg-[linear-gradient(160deg,rgba(15,23,42,0.92),rgba(7,12,23,0.82))]",
        "shadow-[0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_58%)]"
      />

      <div className="relative border-b border-white/[0.08] px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/75">
              <span
                aria-hidden="true"
                className={joinClasses(
                  "h-1.5 w-1.5 rounded-full",
                  statusClasses[status]
                )}
              />
              {eyebrow}
            </div>

            <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
              {title}
            </h2>

            {description ? (
              <div className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </div>
            ) : null}
          </div>

          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </div>

      <div className="relative p-5">{children}</div>

      {footer ? (
        <footer className="relative border-t border-white/[0.08] px-5 py-4">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
