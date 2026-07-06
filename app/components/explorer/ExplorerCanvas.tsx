import type { ExplorerMarker as ExplorerMarkerType } from "@/app/services/explorer.service";
import ExplorerMarker from "./ExplorerMarker";

type ExplorerCanvasProps = {
  searchQuery: string;
  markers: ExplorerMarkerType[];
  selectedMarker: ExplorerMarkerType | null;
  onSelectMarker: (marker: ExplorerMarkerType) => void;
};

export default function ExplorerCanvas({
  searchQuery,
  markers,
  selectedMarker,
  onSelectMarker,
}: ExplorerCanvasProps) {
  return (
    <div className="relative flex h-full min-h-[680px] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(63 63 70 / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {markers.map((marker) => (
        <ExplorerMarker
          key={marker.id}
          marker={marker}
          selected={selectedMarker?.id === marker.id}
          onSelect={onSelectMarker}
        />
      ))}

      <div className="pointer-events-none absolute bottom-6 left-6 rounded-2xl border border-zinc-800 bg-zinc-950/90 px-5 py-4">
        <p className="text-sm text-zinc-400">Visible markers</p>
        <p className="mt-1 text-2xl font-black text-emerald-400">
          {markers.length}
        </p>
      </div>

      {searchQuery && (
        <div className="pointer-events-none absolute right-6 top-6 rounded-2xl border border-emerald-400/30 bg-zinc-950/90 px-5 py-4">
          <p className="text-sm text-zinc-400">Searching for</p>
          <p className="mt-1 text-xl font-black text-emerald-400">
            {searchQuery}
          </p>
        </div>
      )}
    </div>
  );
}