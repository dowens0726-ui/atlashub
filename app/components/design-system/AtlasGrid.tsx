import type { ReactNode } from "react";

type AtlasGridProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
};

const columnClasses: Record<
  NonNullable<AtlasGridProps["columns"]>,
  string
> = {
  1: "grid-cols-1",
  2: "grid-cols-1 lg:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

export default function AtlasGrid({
  children,
  columns = 2,
  className = "",
}: AtlasGridProps) {
  return (
    <div
      className={[
        "grid gap-6",
        columnClasses[columns],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}