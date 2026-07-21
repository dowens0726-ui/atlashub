import IntelligenceChip from "./IntelligenceChip";

import type {
  IntelligenceChipTone,
} from "./IntelligenceChip";


export type AtlasIntelligenceSignal = {
  label:
    string;

  value:
    string;

  tone?:
    IntelligenceChipTone;

  icon?:
    string;
};


type AtlasIntelligenceStripProps = {
  signals:
    AtlasIntelligenceSignal[];
};


export default function AtlasIntelligenceStrip({
  signals,
}: AtlasIntelligenceStripProps) {
  const repeatedSignals = [
    ...signals,
    ...signals,
  ];


  return (
    <section
      aria-label="Live Atlas intelligence"
      className="atlas-intelligence-strip relative overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-zinc-950/72 shadow-[0_20px_70px_-50px_rgba(34,211,238,0.7)] backdrop-blur-xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.035),transparent_22%,transparent_78%,rgba(217,70,239,0.035))]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="relative flex items-center border-b border-white/[0.055] px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-55" />

            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
          </span>

          <p className="text-[0.6rem] font-black uppercase tracking-[0.28em] text-cyan-300">
            Live Intelligence Stream
          </p>
        </div>

        <span className="ml-auto text-[0.56rem] font-bold uppercase tracking-[0.2em] text-zinc-600">
          Atlas monitoring active
        </span>
      </div>

      <div className="relative overflow-hidden py-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent"
        />

        <div className="atlas-intelligence-strip__track flex w-max items-center gap-3 px-4">
          {repeatedSignals.map(
            (
              signal,
              index
            ) => (
              <IntelligenceChip
                key={`${signal.label}-${signal.value}-${index}`}
                label={signal.label}
                value={signal.value}
                tone={signal.tone}
                icon={signal.icon}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
