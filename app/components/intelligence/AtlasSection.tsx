import type { ReactNode } from "react";

type AtlasSectionAccent =
  | "cyan"
  | "violet"
  | "emerald"
  | "amber"
  | "sky"
  | "zinc";

type AtlasSectionProps = {
  title: string;
  children: ReactNode;
  accent?: AtlasSectionAccent;
  description?: string;
  className?: string;
  contentClassName?: string;
};

const accentClasses: Record<AtlasSectionAccent, string> = {
  cyan: "text-cyan-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  sky: "text-sky-400",
  zinc: "text-zinc-400",
};

export default function AtlasSection({
  title,
  children,
  accent = "cyan",
  description,
  className = "",
  contentClassName = "space-y-6",
}: AtlasSectionProps) {
  return (
    <section className={className}>
      <header className="mb-4">
        <p
          className={`text-xs font-black uppercase tracking-[0.3em] ${accentClasses[accent]}`}
        >
          {title}
        </p>

        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
            {description}
          </p>
        ) : null}
      </header>

      <div className={contentClassName}>
        {children}
      </div>
    </section>
  );
}