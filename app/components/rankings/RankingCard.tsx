import Link from "next/link";
import type { Vehicle } from "@/app/types";

type RankingCardProps = {
  rank: number;
  vehicle: Vehicle;
  metric: string;
};

export default function RankingCard({
  rank,
  vehicle,
  metric,
}: RankingCardProps) {
  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white transition hover:-translate-y-1 hover:border-emerald-400"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-black text-zinc-950">
          {rank}
        </div>

        <div>
          <h3 className="font-bold text-white">{vehicle.name}</h3>

          <p className="text-sm text-zinc-400">
            {vehicle.manufacturer} · {vehicle.class}
          </p>
        </div>
      </div>

      <p className="font-bold text-emerald-400">{metric}</p>
    </Link>
  );
}