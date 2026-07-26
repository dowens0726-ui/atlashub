export default function AtlasGridLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_bottom,transparent_4%,black_28%,black_76%,transparent_98%)]" />

      <div className="absolute inset-x-[-20%] bottom-[-44%] h-[72%] origin-center rotate-x-60 bg-[linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] bg-[size:52px_42px] opacity-20 [mask-image:linear-gradient(to_top,black,transparent_78%)]" />

      <div className="absolute left-1/2 top-[46%] h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent shadow-[0_0_20px_rgba(103,232,249,0.18)]" />
    </div>
  );
}
