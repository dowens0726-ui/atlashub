import type {
  DatasetStatistic,
} from "@/app/engineering";


const ENTITY_LABELS:
  Record<
    DatasetStatistic["entity"],
    string
  > = {
    vehicle:
      "Vehicles",

    mission:
      "Missions",

    business:
      "Businesses",

    weapon:
      "Weapons",

    property:
      "Properties",

    character:
      "Characters",
  };


type DatasetCardProps = {
  statistic:
    DatasetStatistic;
};


export default function DatasetCard({
  statistic,
}: DatasetCardProps) {
  const verifiedPercentage =
    statistic.total >
    0
      ? Math.round(
          (
            statistic.verified /
            statistic.total
          ) *
            100
        )
      : 0;


  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Dataset
          </p>

          <h3 className="mt-2 text-xl font-black text-white">
            {
              ENTITY_LABELS[
                statistic.entity
              ]
            }
          </h3>
        </div>

        <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm font-black text-white">
          {statistic.total}
        </span>
      </div>


      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric
          label="Featured"
          value={
            statistic.featured
          }
        />

        <Metric
          label="Verified"
          value={
            statistic.verified
          }
        />
      </div>


      <div className="mt-5">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider">
          <span className="text-zinc-500">
            Verification
          </span>

          <span className="text-zinc-300">
            {verifiedPercentage}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{
              width:
                `${verifiedPercentage}%`,
            }}
          />
        </div>
      </div>
    </article>
  );
}


function Metric({
  label,
  value,
}: {
  label:
    string;

  value:
    number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}