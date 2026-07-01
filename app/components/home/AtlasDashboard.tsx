import { missions } from "../../data/missions";
import { vehicles } from "../../data/vehicles";

const dashboardItems = [
  { label: "Vehicles", value: vehicles.length, icon: "🚗" },
  { label: "Missions", value: missions.length, icon: "🎯" },
  { label: "Compare", value: "Ready", icon: "⚖️" },
  { label: "Weapons", value: "Soon", icon: "🔫" },
];

export default function AtlasDashboard() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
        Atlas Dashboard
      </p>

      <h2 className="mt-2 text-4xl font-black">Platform Status</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {dashboardItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
          >
            <div className="text-3xl">{item.icon}</div>
            <div className="mt-4 text-2xl font-black">{item.value}</div>
            <div className="mt-1 text-sm uppercase tracking-wider text-zinc-500">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}