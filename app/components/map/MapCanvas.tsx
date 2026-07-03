"use client";

import { useMemo, useState } from "react";
import type { AtlasMapMarker } from "@/app/types";
import MapMarker from "./MapMarker";
import MapFilters from "./MapFilters";
import MapSidebar from "./MapSidebar";

type MapCanvasProps = {
  markers: AtlasMapMarker[];
};

type MarkerType = AtlasMapMarker["type"] | "all";

export default function MapCanvas({ markers }: MapCanvasProps) {
  const [selectedMarker, setSelectedMarker] = useState<AtlasMapMarker | null>(
    null
  );
  const [activeType, setActiveType] = useState<MarkerType>("all");

  const visibleMarkers = useMemo(() => {
    if (activeType === "all") {
      return markers;
    }

    return markers.filter((marker) => marker.type === activeType);
  }, [markers, activeType]);

  return (
    <div>
      <MapFilters activeType={activeType} onChange={setActiveType} />

      <div className="relative min-h-[600px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1f2937,_#09090b)]" />

        {visibleMarkers.map((marker) => (
          <MapMarker
            key={marker.id}
            marker={marker}
            onClick={setSelectedMarker}
          />
        ))}

        <MapSidebar
          marker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
        />
      </div>
    </div>
  );
}