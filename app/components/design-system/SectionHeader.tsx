import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  badge,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            {eyebrow}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="text-3xl font-black tracking-tight text-white">
            {title}
          </h2>

          {badge ? (
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
              {badge}
            </span>
          ) : null}
        </div>

        {subtitle ? (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}