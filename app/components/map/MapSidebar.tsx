import Link from "next/link";
import type { AtlasMapMarker } from "@/app/types";
import { Card, Badge } from "@/app/components/ui";

type MapSidebarProps = {
  marker: AtlasMapMarker | null;
  onClose: () => void;
};

export default function MapSidebar({ marker, onClose }: MapSidebarProps) {
  if (!marker) return null;

  return (
    <aside className="absolute bottom-4 left-4 right-4 z-30 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl md:bottom-6 md:left-auto md:right-6 md:top-6 md:w-96">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge>{marker.type}</Badge>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {marker.icon} {marker.title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {marker.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-zinc-700 px-3 py-1 text-sm text-zinc-400 transition hover:border-emerald-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <Card className="mt-5">
        <p className="text-sm text-zinc-500">Atlas Intelligence</p>
        <p className="mt-2 text-sm text-zinc-300">
          More connected recommendations are coming soon.
        </p>
      </Card>

      <Link
        href={marker.href}
        className="mt-5 block rounded-xl bg-emerald-500 px-4 py-3 text-center font-bold text-zinc-950 transition hover:bg-emerald-400"
      >
        Open Page
      </Link>
    </aside>
  );
}