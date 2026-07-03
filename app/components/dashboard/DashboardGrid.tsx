type DashboardGridProps = {
  children: React.ReactNode;
};

export default function DashboardGrid({
  children,
}: DashboardGridProps) {
  return (
    <div
      className="
        mt-10
        grid
        gap-6
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {children}
    </div>
  );
}