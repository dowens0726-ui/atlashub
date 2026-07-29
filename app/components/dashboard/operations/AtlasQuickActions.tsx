import Link from "next/link";

export type AtlasQuickAction = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

type AtlasQuickActionsProps = {
  actions: AtlasQuickAction[];
};

export default function AtlasQuickActions({
  actions,
}: AtlasQuickActionsProps) {
  return (
    <nav
      aria-label="Atlas quick actions"
      className="grid grid-cols-2 gap-2"
    >
      {actions.map(
        (
          action,
          index
        ) => (
          <Link
            key={`${action.href}-${action.label}`}
            href={action.href}
            className={[
              "group relative min-w-0 overflow-hidden rounded-xl",
              "border border-white/[0.06]",
              "bg-white/[0.025]",
              "px-3 py-3",
              "transition duration-300",
              "hover:-translate-y-0.5",
              "hover:border-cyan-300/22",
              "hover:bg-cyan-300/[0.05]",
              "hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
            />

            <span className="flex items-start justify-between gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-cyan-200/10 bg-cyan-300/[0.055] text-[0.58rem] font-black text-cyan-100/65">
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </span>

              {action.badge ? (
                <span className="rounded-full border border-cyan-200/15 bg-cyan-300/[0.07] px-1.5 py-0.5 text-[0.46rem] font-black uppercase tracking-[0.12em] text-cyan-100/65">
                  {action.badge}
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="text-xs text-white/18 transition duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-200/70"
                >
                  →
                </span>
              )}
            </span>

            <span className="mt-3 block truncate text-[0.67rem] font-semibold text-white/76 transition group-hover:text-cyan-50">
              {action.label}
            </span>

            {action.description ? (
              <span className="mt-1 block line-clamp-2 text-[0.56rem] leading-4 text-white/28">
                {action.description}
              </span>
            ) : null}
          </Link>
        )
      )}
    </nav>
  );
}