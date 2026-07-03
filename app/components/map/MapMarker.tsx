import type { AtlasMapMarker } from "@/app/types";

type MapMarkerProps = {
  marker: AtlasMapMarker;
  active?: boolean;
  onClick: (marker: AtlasMapMarker) => void;
};

export default function MapMarker({ marker, active = false, onClick }: MapMarkerProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(marker)}
      className={`absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-lg shadow-lg transition hover:scale-110 ${
        active
          ? "animate-pulse border-emerald-400 bg-emerald-500 text-zinc-950 shadow-emerald-500/40"
          : "border-zinc-700 bg-zinc-900 hover:border-emerald-400"
      }`}
      style={{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
      }}
      aria-label={marker.title}
    >
      {marker.icon}
    </button>
  );
}