import type { ReactNode } from "react";

export type AtlasWorkspaceToolbarProps = {
  search?: ReactNode;
  filters?: ReactNode;
  sort?: ReactNode;
  viewControls?: ReactNode;
  actions?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default function AtlasWorkspaceToolbar({
  search,
  filters,
  sort,
  viewControls,
  actions,
  leading,
  trailing,
  className,
}: AtlasWorkspaceToolbarProps) {
  const primary = leading ?? search;

  const secondary = trailing ?? (
    <>
      {filters}
      {sort}
      {viewControls}
      {actions}
    </>
  );

  return (
    <div
      role="toolbar"
      aria-label="Workspace controls"
      className={joinClasses(
        "flex flex-col gap-3 rounded-2xl border border-white/10",
        "bg-slate-950/55 p-3 shadow-[0_14px_40px_rgba(0,0,0,0.20)]",
        "backdrop-blur-xl",
        "2xl:flex-row 2xl:items-center 2xl:justify-between",
        className
      )}
    >
      {primary ? (
        <div className="w-full min-w-0 2xl:flex-1">
          {primary}
        </div>
      ) : null}

      {secondary ? (
        <div
          className={joinClasses(
            "flex w-full min-w-0 flex-wrap items-center gap-2",
            "2xl:w-auto 2xl:flex-none 2xl:justify-end"
          )}
        >
          {secondary}
        </div>
      ) : null}
    </div>
  );
}
