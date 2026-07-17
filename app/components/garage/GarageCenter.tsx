import GarageCenterCard from "./GarageCenterCard";

const garageFeatures = [
  {
    title: "Build My Garage",
    description:
      "Create an optimized vehicle lineup based on your available budget and preferred play style.",
    eyebrow: "Garage Builder",
    href: "/garage-builder/builder",
    actionLabel: "Open Builder",
    icon: "🛠️",
  },
  {
    title: "Analyze My Garage",
    description:
      "Add the vehicles you already own and let Atlas evaluate coverage, strengths, weaknesses, and missing roles.",
    eyebrow: "Atlas Intelligence",
    href: "/garage-builder/advisor",
    actionLabel: "Open Advisor",
    icon: "🧠",
    status: "New",
  },
  {
    title: "Wishlist",
    description:
      "Track the vehicles you are considering and compare future purchases against your current garage.",
    eyebrow: "Planning",
    actionLabel: "Coming Soon",
    icon: "◆",
    status: "Planned",
  },
  {
    title: "Saved Garages",
    description:
      "Save, revisit, and eventually share optimized garage configurations for different budgets and activities.",
    eyebrow: "Collections",
    actionLabel: "Coming Soon",
    icon: "▣",
    status: "Planned",
  },
];

export default function GarageCenter() {
  return (
    <section aria-labelledby="garage-center-heading">
      <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-zinc-900/80 to-zinc-950 p-6 shadow-2xl sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
          Atlas Garage
        </p>

        <h2
          id="garage-center-heading"
          className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl"
        >
          Your vehicle command center.
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">
          Build an optimized garage today, then use Atlas Intelligence to
          analyze ownership, identify capability gaps, and plan smarter
          purchases.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-sm text-zinc-500">Vehicle Database</p>
            <p className="mt-1 text-2xl font-black text-white">250+</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-sm text-zinc-500">Active Tool</p>
            <p className="mt-1 text-lg font-bold text-white">Garage Builder</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-sm text-zinc-500">Next System</p>
            <p className="mt-1 text-lg font-bold text-white">Garage Advisor</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {garageFeatures.map((feature) => (
          <GarageCenterCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}