import Link from "next/link";

type Action = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: string;
};

type QuickActionsProps = {
  title?: string;
  actions: Action[];
};

export default function QuickActions({
  title = "Quick Actions",
  actions,
}: QuickActionsProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">
        {title}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) =>
          action.href ? (
            <Link
              key={action.label}
              href={action.href}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-amber-400 hover:-translate-y-1"
            >
              <div className="text-3xl">{action.icon}</div>

              <p className="mt-3 font-bold text-white">
                {action.label}
              </p>
            </Link>
          ) : (
            <button
              key={action.label}
              onClick={action.onClick}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-left transition hover:border-amber-400 hover:-translate-y-1"
            >
              <div className="text-3xl">{action.icon}</div>

              <p className="mt-3 font-bold text-white">
                {action.label}
              </p>
            </button>
          )
        )}
      </div>
    </section>
  );
}