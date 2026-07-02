"use client";

import { useState } from "react";
import type { AtlasMapMarker } from "@/app/types";
import MapMarker from "./MapMarker";

type MapCanvasProps = {
  markers: AtlasMapMarker[];
};

export default function MapCanvas({ markers }: MapCanvasProps) {
  const [selectedMarker, setSelectedMarker] = useState<AtlasMapMarker | null>(
    null
  );

  return (
    <div className="relative min-h-[600px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1f2937,_#09090b)]" />

      {markers.map((marker) => (
        <MapMarker
          key={marker.id}
          marker={marker}
          onClick={setSelectedMarker}
        />
      ))}

      {selectedMarker && (
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:left-auto md:w-96">
          <p className="text-sm uppercase tracking-wide text-emerald-400">
            {selectedMarker.type}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {selectedMarker.title}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            {selectedMarker.description}
          </p>
        </div>
      )}
    </div>
  );
}