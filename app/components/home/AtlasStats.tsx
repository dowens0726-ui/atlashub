import { missions } from "../../data/missions";
import { vehicles } from "../../data/vehicles";

const stats = [
  { label: "Vehicles", value: vehicles.length, icon: "🚗" },
  { label: "Missions", value: missions.length, icon: "🎯" },
  { label: "Compare System", value: "Live", icon: "⚖️" },
  { label: "Search", value: "Active", icon: "🔍" },
];

export default function AtlasStats() {
  return (
    <section className="grid gap-4 border-y border-zinc-800 py-8 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center"
        >
          <div className="text-3xl">{stat.icon}</div>
          <div className="mt-3 text-3xl font-black text-white">
            {stat.value}
          </div>
          <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}