import Link from "next/link";
import type { SearchResult } from "@/app/services/search.service";

type Props = {
  results: SearchResult[];
  onSelect: () => void;
};

export default function CommandResults({
  results,
  onSelect,
}: Props) {
  if (results.length === 0) return null;

  return (
    <div className="max-h-96 overflow-y-auto p-2">
      {results.map((result) => (
        <Link
          key={result.id}
          href={result.href}
          onClick={onSelect}
          className="block rounded-xl p-4 transition hover:bg-zinc-800"
        >
          <p className="text-xs uppercase tracking-wide text-emerald-400">
            {result.type}
          </p>

          <p className="mt-1 font-semibold text-white">
            {result.label}
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            {result.description}
          </p>
        </Link>
      ))}
    </div>
  );
}