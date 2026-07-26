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
    <nav aria-label="Atlas quick actions" className="grid gap-2">
      {actions.map((action) => (
        <Link
          key={`${action.href}-${action.label}`}
          href={action.href}
          className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2.5 transition duration-300 hover:border-cyan-300/20 hover:bg-cyan-300/[0.045]"
        >
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium text-white/74 transition group-hover:text-cyan-50">
              {action.label}
            </span>

            {action.description ? (
              <span className="mt-0.5 block truncate text-[0.62rem] text-white/30">
                {action.description}
              </span>
            ) : null}
          </span>

          <span className="flex shrink-0 items-center gap-2">
            {action.badge ? (
              <span className="rounded-full border border-cyan-200/15 bg-cyan-300/[0.06] px-2 py-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-cyan-100/60">
                {action.badge}
              </span>
            ) : null}

            <span
              aria-hidden="true"
              className="text-sm text-white/22 transition duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-200/70"
            >
              →
            </span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
