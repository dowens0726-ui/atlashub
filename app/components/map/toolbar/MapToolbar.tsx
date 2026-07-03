"use client";

type MapToolbarProps = {
  filters: {
    missions: boolean;
    vehicles: boolean;
    weapons: boolean;
  };
  onToggle: (filter: "missions" | "vehicles" | "weapons") => void;
};

export default function MapToolbar({
  filters,
  onToggle,
}: MapToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3 backdrop-blur">
      <button
        onClick={() => onToggle("missions")}
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          filters.missions
            ? "bg-emerald-500 text-zinc-950"
            : "bg-zinc-800 text-zinc-300"
        }`}
      >
        🎯 Missions
      </button>

      <button
        onClick={() => onToggle("vehicles")}
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          filters.vehicles
            ? "bg-emerald-500 text-zinc-950"
            : "bg-zinc-800 text-zinc-300"
        }`}
      >
        🚗 Vehicles
      </button>

      <button
        onClick={() => onToggle("weapons")}
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          filters.weapons
            ? "bg-emerald-500 text-zinc-950"
            : "bg-zinc-800 text-zinc-300"
        }`}
      >
        🔫 Weapons
      </button>
    </div>
  );
}