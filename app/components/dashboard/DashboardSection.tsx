import type { ReactNode } from "react";

type DashboardSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function DashboardSection({
  title,
  description,
  children,
}: DashboardSectionProps) {
  return (
    <section className="mt-14">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-white">{title}</h2>

        {description && (
          <p className="mt-2 max-w-3xl text-zinc-400">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}