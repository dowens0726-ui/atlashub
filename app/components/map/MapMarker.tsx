import type { AtlasMapMarker } from "@/app/types";

type MapMarkerProps = {
  marker: AtlasMapMarker;
  onClick: (marker: AtlasMapMarker) => void;
};

export default function MapMarker({ marker, onClick }: MapMarkerProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(marker)}
      className="absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-lg shadow-lg transition hover:scale-110 hover:border-emerald-400"
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