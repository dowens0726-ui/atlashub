export default function AtlasAtmosphereLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,28,0.34)_0%,rgba(11,19,41,0.2)_24%,rgba(4,10,24,0.62)_67%,rgba(2,6,18,0.94)_100%)]" />

      <div className="absolute -left-[18%] top-[4%] h-[28rem] w-[34rem] rounded-full bg-cyan-400/[0.08] blur-[120px]" />

      <div className="absolute -right-[15%] top-[8%] h-[26rem] w-[32rem] rounded-full bg-violet-500/[0.09] blur-[130px]" />

      <div className="absolute inset-x-0 top-[34%] h-52 bg-[linear-gradient(180deg,transparent,rgba(103,232,249,0.035),rgba(14,165,233,0.055),transparent)] blur-2xl" />

      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.5)_30%,rgba(2,6,23,0.92)_100%)]" />
    </div>
  );
}
