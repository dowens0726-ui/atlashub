import type { ReactNode } from "react";

type EntityStatsGridProps = {
  children: ReactNode;
};

export default function EntityStatsGrid({
  children,
}: EntityStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}