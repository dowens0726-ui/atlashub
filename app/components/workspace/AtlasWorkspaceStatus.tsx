import type { ReactNode } from "react";

export type AtlasWorkspaceStatusItem = {
  id: string;
  label: ReactNode;
  value: ReactNode;
  indicator?: "neutral" | "active" | "success" | "warning" | "error";
};

export type AtlasWorkspaceStatusProps = {
  items?: AtlasWorkspaceStatusItem[];
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

const indicatorClasses = {
  neutral: "bg-slate-500",
  active: "bg-cyan-400",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  error: "bg-rose-400",
};

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default function AtlasWorkspaceStatus({
  items,
  leading,
  trailing,
  className,
}: AtlasWorkspaceStatusProps) {
  if (!items?.length && !leading && !trailing) {
    return null;
  }

  return (
    <footer
      aria-label="Workspace status"
      className={joinClasses(
        "flex flex-col gap-3 rounded-2xl border border-white/[0.08]",
        "bg-slate-950/45 px-4 py-3 text-xs text-slate-400 backdrop-blur-xl",
        "lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
        {leading}

        {items?.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            {item.indicator ? (
              <span
                aria-hidden="true"
                className={joinClasses(
                  "h-1.5 w-1.5 rounded-full",
                  indicatorClasses[item.indicator]
                )}
              />
            ) : null}

            <span className="text-slate-500">{item.label}</span>
            <span className="font-medium text-slate-300">{item.value}</span>
          </div>
        ))}
      </div>

      {trailing ? (
        <div className="shrink-0 text-slate-400">{trailing}</div>
      ) : null}
    </footer>
  );
}
