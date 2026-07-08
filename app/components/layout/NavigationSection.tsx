import type { ReactNode } from "react";

type NavigationSectionProps = {
  title: string;
  children: ReactNode;
};

export default function NavigationSection({
  title,
  children,
}: NavigationSectionProps) {
  return (
    <div>
      <p className="mb-3 px-3 text-xs font-black uppercase tracking-[0.3em] text-zinc-600">
        {title}
      </p>

      <div className="space-y-1">{children}</div>
    </div>
  );
}