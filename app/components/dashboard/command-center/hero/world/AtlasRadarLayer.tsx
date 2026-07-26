export default function AtlasRadarLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      <div className="absolute right-[7%] top-[16%] h-56 w-56 rounded-full border border-cyan-200/[0.08]">
        <div className="absolute inset-[14%] rounded-full border border-cyan-200/[0.07]" />

        <div className="absolute inset-[31%] rounded-full border border-cyan-200/[0.07]" />

        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-200/[0.06]" />

        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-200/[0.06]" />

        <div className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_305deg,rgba(34,211,238,0.12)_342deg,rgba(103,232,249,0.32)_360deg)] [mask-image:radial-gradient(circle,black_0%,black_72%,transparent_73%)]" />

        <span className="absolute left-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />

        <span className="absolute left-[65%] top-[57%] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.85)]" />

        <span className="absolute left-[46%] top-[72%] h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
      </div>

      <div className="absolute left-[6%] top-[23%] h-24 w-24 rounded-full border border-violet-300/[0.06]">
        <div className="absolute inset-3 rounded-full border border-violet-300/[0.05]" />

        <div className="absolute inset-0 animate-[spin_20s_linear_infinite_reverse] rounded-full border-t border-violet-200/20" />
      </div>
    </div>
  );
}
