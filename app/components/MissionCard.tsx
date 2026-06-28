import Link from "next/link";

type Mission = {
  slug: string;
  title: string;
  description: string;
  reward: string;
  difficulty: string;
  category: string;
};

type MissionCardProps = {
  mission: Mission;
};

export default function MissionCard({ mission }: MissionCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-200 hover:border-emerald-400 hover:-translate-y-1">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
        {mission.category}
      </p>

      <h2 className="mt-2 text-2xl font-bold">{mission.title}</h2>

      <p className="mt-3 text-zinc-400">{mission.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-semibold text-emerald-400">
            Reward: {mission.reward}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Difficulty: {mission.difficulty}
          </p>
        </div>

        <Link
          href={`/missions/${mission.slug}`}
          className="rounded-xl bg-emerald-500 px-5 py-2 font-bold text-zinc-950 hover:bg-emerald-400"
        >
          View Guide →
        </Link>
      </div>
    </div>
  );
}