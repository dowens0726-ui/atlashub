import type { ExplorerMarker as ExplorerMarkerType } from "@/app/services/explorer.service";

type ExplorerMarkerProps = {
  marker: ExplorerMarkerType;
};

const markerStyles = {
  vehicle: "bg-emerald-400 shadow-emerald-500/50",
  mission: "bg-amber-400 shadow-amber-500/50",
  weapon: "bg-red-400 shadow-red-500/50",
  business: "bg-blue-400 shadow-blue-500/50",
  collectible: "bg-purple-400 shadow-purple-500/50",
};

const markerIcons = {
  vehicle: "🚗",
  mission: "🎯",
  weapon: "🔫",
  business: "🏢",
  collectible: "📦",
};

export default function ExplorerMarker({ marker }: ExplorerMarkerProps) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm shadow-lg ${markerStyles[marker.category]}`}
      >
        {markerIcons[marker.category]}
      </div>

      <span className="mt-2 rounded-full bg-zinc-950/90 px-3 py-1 text-xs font-bold text-white">
        {marker.name}
      </span>
    </div>
  );
}