import type { Vehicle } from "@/app/types";
import RankingList from "./RankingList";

type RankingSectionProps = {
  title: string;
  description: string;
  vehicles: Vehicle[];
  metric: (vehicle: Vehicle) => string;
};

export default function RankingSection({
  title,
  description,
  vehicles,
  metric,
}: RankingSectionProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white">{title}</h2>
        <p className="mt-2 text-zinc-400">{description}</p>
      </div>

      <RankingList vehicles={vehicles} metric={metric} />
    </section>
  );
}