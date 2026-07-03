import type { AtlasMapMarker } from "@/app/types";

type MarkerType = AtlasMapMarker["type"];

type MapFiltersProps = {
  activeType: MarkerType | "all";
  onChange: (type: MarkerType | "all") => void;
};

const filters: Array<{
  label: string;
  value: MarkerType | "all";
}> = [
  { label: "All", value: "all" },
  { label: "🎯 Missions", value: "mission" },
  { label: "🚗 Vehicles", value: "vehicle" },
  { label: "🔫 Weapons", value: "weapon" },
];

export default function MapFilters({ activeType, onChange }: MapFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = activeType === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active
                ? "border-emerald-400 bg-emerald-500 text-zinc-950"
                : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-emerald-400"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}