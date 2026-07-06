import {
  ExplorerActionBar,
  ExplorerIntelligence,
  ExplorerQuickStats,
} from ".";

import { businesses } from "@/app/data";
import type { ExplorerMarker } from "@/app/services/explorer.service";

type ExplorerDetailPanelProps = {
  marker: ExplorerMarker | null;
};

function getBusinessFromMarker(marker: ExplorerMarker | null) {
  if (!marker || marker.category !== "business") {
    return undefined;
  }

  return businesses.find((business) => business.slug === marker.slug);
}

export default function ExplorerDetailPanel({
  marker,
}: ExplorerDetailPanelProps) {
  const business = getBusinessFromMarker(marker);

  if (!marker) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Explorer
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          Select a Marker
        </h2>

        <p className="mt-4 text-zinc-400">
          Click a marker on the map to see details.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
        Explorer
      </p>

      <h2 className="mt-3 text-3xl font-black text-white">
        {marker.name}
      </h2>

      <ExplorerQuickStats marker={marker} />

      <ExplorerIntelligence business={business} />

      <ExplorerActionBar marker={marker} />
    </div>
  );
}