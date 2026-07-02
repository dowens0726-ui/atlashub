import Link from "next/link";
import type { Mission } from "@/app/types";
import { Badge, Card } from "@/app/components/ui";

type RecommendedMissionsProps = {
  title?: string;
  missions: Mission[];
};

export default function RecommendedMissions({
  title = "Recommended Missions",
  missions,
}: RecommendedMissionsProps) {
  if (missions.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {missions.map((mission) => (
          <Link key={mission.slug} href={`/missions/${mission.slug}`}>
            <Card className="transition hover:border-emerald-400">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-white">
                  {mission.title}
                </h3>

                <Badge>{mission.difficulty}</Badge>
              </div>

              <p className="mt-3 text-sm text-zinc-400">
                {mission.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}