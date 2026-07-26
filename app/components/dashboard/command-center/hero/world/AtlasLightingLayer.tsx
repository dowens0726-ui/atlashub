export default function AtlasLightingLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-[8%] top-[12%] h-[34rem] w-px rotate-[22deg] bg-gradient-to-b from-transparent via-cyan-200/[0.12] to-transparent blur-[0.5px]" />

      <div className="absolute right-[12%] top-[6%] h-[30rem] w-px -rotate-[18deg] bg-gradient-to-b from-transparent via-violet-200/[0.1] to-transparent blur-[0.5px]" />

      <div className="absolute inset-x-[12%] top-[3%] h-28 bg-gradient-to-b from-cyan-100/[0.04] to-transparent blur-3xl" />

      <div className="absolute -left-[8%] bottom-[13%] h-40 w-[45%] rotate-[-5deg] bg-cyan-400/[0.035] blur-[70px]" />

      <div className="absolute -right-[10%] bottom-[12%] h-44 w-[42%] rotate-[7deg] bg-violet-500/[0.04] blur-[80px]" />

      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
    </div>
  );
}
