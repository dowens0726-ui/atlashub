type ExecutiveStatusBarProps = {
  greeting: string;
  pipelineStatusLabel: string;
  pipelineIndicatorClasses: string;
  pipelineStatusClasses: string;
  urgencyLabel: string;
  urgencyClasses: string;
};

export default function ExecutiveStatusBar({
  greeting,
  pipelineStatusLabel,
  pipelineIndicatorClasses,
  pipelineStatusClasses,
  urgencyLabel,
  urgencyClasses,
}: ExecutiveStatusBarProps) {
  return (
    <header className="flex flex-col gap-5 px-5 pb-3 pt-5 sm:px-7 lg:px-8 xl:flex-row xl:items-start xl:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span
            aria-hidden="true"
            className={[
              "h-2.5 w-2.5 rounded-full",
              pipelineIndicatorClasses,
            ].join(" ")}
          />

          <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-cyan-300">
            Atlas
          </p>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-zinc-400">
            AI Operating System
          </p>
        </div>

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {greeting}, Commander
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em]",
            pipelineStatusClasses,
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className={[
              "h-1.5 w-1.5 rounded-full",
              pipelineIndicatorClasses,
            ].join(" ")}
          />

          {pipelineStatusLabel}
        </span>

        <span
          className={[
            "inline-flex items-center rounded-full border px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em]",
            urgencyClasses,
          ].join(" ")}
        >
          {urgencyLabel}
        </span>
      </div>
    </header>
  );
}