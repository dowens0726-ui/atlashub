import type { ReactNode } from "react";

type AtlasOperationsSectionProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function AtlasOperationsSection({
  title,
  eyebrow,
  children,
  className = "",
}: AtlasOperationsSectionProps) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-[1.4rem]",
        "border border-white/[0.08]",
        "bg-black/20 backdrop-blur-xl",
        "px-4 py-4",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
      />

      <header className="mb-3">
        {eyebrow ? (
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/55">
            {eyebrow}
          </p>
        ) : null}

        <h3 className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/82">
          {title}
        </h3>
      </header>

      {children}
    </section>
  );
}
