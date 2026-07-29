import type { ReactNode } from "react";

export type AtlasWorkspaceWidth = "standard" | "wide" | "full";

export type AtlasWorkspaceProps = {
  children: ReactNode;
  header?: ReactNode;
  toolbar?: ReactNode;
  metrics?: ReactNode;
  inspector?: ReactNode;
  status?: ReactNode;
  width?: AtlasWorkspaceWidth;
  inspectorWidth?: "compact" | "standard" | "wide";
  className?: string;
  contentClassName?: string;
  mainClassName?: string;
  inspectorClassName?: string;
};

const widthClasses: Record<AtlasWorkspaceWidth, string> = {
  standard: "max-w-[1480px]",
  wide: "max-w-[1720px]",
  full: "max-w-none",
};

const inspectorWidthClasses = {
  compact: "xl:grid-cols-[minmax(0,1fr)_280px]",
  standard: "xl:grid-cols-[minmax(0,1fr)_340px]",
  wide: "xl:grid-cols-[minmax(0,1fr)_400px]",
};

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export default function AtlasWorkspace({
  children,
  header,
  toolbar,
  metrics,
  inspector,
  status,
  width = "wide",
  inspectorWidth = "standard",
  className,
  contentClassName,
  mainClassName,
  inspectorClassName,
}: AtlasWorkspaceProps) {
  return (
    <section
      className={joinClasses(
        "relative isolate min-h-full w-full overflow-hidden",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.10),transparent_32%)]"
      />

      <div
        className={joinClasses(
          "mx-auto flex w-full flex-col gap-5 px-4 pb-10 pt-4 sm:px-6 lg:px-8",
          widthClasses[width],
          contentClassName
        )}
      >
        {header}

        {metrics}

        {toolbar}

        <div
          className={joinClasses(
            "grid min-w-0 gap-5",
            inspector ? inspectorWidthClasses[inspectorWidth] : undefined
          )}
        >
          <main
            className={joinClasses(
              "min-w-0",
              inspector ? "xl:col-start-1" : undefined,
              mainClassName
            )}
          >
            {children}
          </main>

          {inspector ? (
            <aside
              aria-label="Atlas workspace inspector"
              className={joinClasses(
                "min-w-0 xl:col-start-2 xl:row-start-1",
                inspectorClassName
              )}
            >
              <div className="xl:sticky xl:top-24">{inspector}</div>
            </aside>
          ) : null}
        </div>

        {status}
      </div>
    </section>
  );
}

