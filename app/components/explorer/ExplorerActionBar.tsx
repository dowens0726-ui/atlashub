import Link from "next/link";
import type { ExplorerMarker } from "@/app/services/explorer.service";

type ExplorerActionBarProps = {
  marker: ExplorerMarker;
};

function getHref(marker: ExplorerMarker) {
  if (marker.category === "vehicle") return `/vehicles/${marker.slug}`;
  if (marker.category === "mission") return `/missions/${marker.slug}`;
  if (marker.category === "weapon") return `/weapons/${marker.slug}`;
  if (marker.category === "business") return `/businesses/${marker.slug}`;

  return "/explorer";
}

export default function ExplorerActionBar({ marker }: ExplorerActionBarProps) {
  return (
    <div className="mt-6">
      <Link
        href={getHref(marker)}
        className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400"
      >
        Open Page →
      </Link>
    </div>
  );
}