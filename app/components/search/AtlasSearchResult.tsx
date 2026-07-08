import Link from "next/link";
import type { SearchResult } from "@/app/services";

type AtlasSearchResultProps = {
  result: SearchResult;
  active?: boolean;
  onSelect?: () => void;
};

const resultMeta: Record<
  SearchResult["type"],
  {
    icon: string;
    label: string;
  }
> = {
  business: {
    icon: "▣",
    label: "Business",
  },
  mission: {
    icon: "◎",
    label: "Mission",
  },
  vehicle: {
    icon: "◈",
    label: "Vehicle",
  },
  weapon: {
    icon: "⌖",
    label: "Weapon",
  },
  page: {
    icon: "⌘",
    label: "Page",
  },
};

export default function AtlasSearchResult({
  result,
  active = false,
  onSelect,
}: AtlasSearchResultProps) {
  const meta = resultMeta[result.type];

  return (
    <Link
      href={result.href}
      onClick={onSelect}
      className={[
        "group block rounded-2xl border p-4 transition",
        active
          ? "border-amber-400 bg-amber-400/10"
          : "border-zinc-800 bg-zinc-950/70 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-zinc-900",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-lg transition",
            active
              ? "border-amber-400 bg-amber-400 text-zinc-950"
              : "border-amber-400/20 bg-amber-400/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-zinc-950",
          ].join(" ")}
        >
          {meta.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-bold text-white">{result.label}</p>

              <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-400">
                {result.description}
              </p>
            </div>

            <span className="shrink-0 rounded-full border border-zinc-700 px-3 py-1 text-xs font-bold uppercase text-zinc-400">
              {meta.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}