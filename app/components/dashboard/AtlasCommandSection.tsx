import type { ReactNode } from "react";

type AtlasCommandSectionVariant =
  | "default"
  | "primary"
  | "subtle"
  | "transparent";

type AtlasCommandSectionProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  eyebrow?: string;
  badge?: ReactNode;
  action?: ReactNode;
  variant?: AtlasCommandSectionVariant;
  className?: string;
  contentClassName?: string;
};

const variantClasses: Record<
  AtlasCommandSectionVariant,
  string
> = {
  default:
    "border-white/[0.07] bg-white/[0.025] shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)]",
  primary:
    "border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.055] via-white/[0.025] to-transparent shadow-[0_30px_100px_-55px_rgba(34,211,238,0.45)]",
  subtle:
    "border-white/[0.05] bg-white/[0.015]",
  transparent:
    "border-transparent bg-transparent",
};

export default function AtlasCommandSection({
  children,
  title,
  description,
  eyebrow,
  badge,
  action,
  variant = "default",
  className = "",
  contentClassName = "",
}: AtlasCommandSectionProps) {
  const hasHeader =
    Boolean(title) ||
    Boolean(description) ||
    Boolean(eyebrow) ||
    Boolean(badge) ||
    Boolean(action);

  return (
    <section
      className={[
        "relative overflow-hidden rounded-[2rem] border",
        variantClasses[variant],
        variant === "transparent"
          ? ""
          : "p-5 sm:p-6 lg:p-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {variant === "primary" ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent"
          />
        </>
      ) : null}

      <div className="relative">
        {hasHeader ? (
          <header className="mb-6 flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                {eyebrow ? (
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-300">
                    {eyebrow}
                  </p>
                ) : null}

                {badge}
              </div>

              {title ? (
                <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {title}
                </h2>
              ) : null}

              {description ? (
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
                  {description}
                </p>
              ) : null}
            </div>

            {action ? (
              <div className="shrink-0">
                {action}
              </div>
            ) : null}
          </header>
        ) : null}

        <div
          className={[
            "min-w-0",
            contentClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      </div>
    </section>
  );
}