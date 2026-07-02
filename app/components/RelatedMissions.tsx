import Link from "next/link";
import { missions } from "@/app/data/missions";

type RelatedMissionsProps = {
  relatedMissions?: string[];
};

export default function RelatedMissions({
  relatedMissions,
}: RelatedMissionsProps) {
  if (!relatedMissions || relatedMissions.length === 0) {
    return null;
  }

  const related = missions.filter((mission) =>
    relatedMissions.includes(mission.slug)
  );

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">Related Missions</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {related.map((mission) => (
          <Link
            key={mission.slug}
            href={`/missions/${mission.slug}`}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-emerald-400"
          >
            <p className="text-sm uppercase tracking-wide text-emerald-400">
              {mission.category}
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              {mission.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {mission.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}