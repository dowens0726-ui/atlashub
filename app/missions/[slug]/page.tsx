import { notFound } from "next/navigation";
import { missions } from "@/app/data/missions";

type MissionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MissionPage({ params }: MissionPageProps) {
  const { slug } = await params;
  const mission = missions.find((mission) => mission.slug === slug);

  if (!mission) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm uppercase tracking-wide text-emerald-400">
        {mission.category}
      </p>

      <h1 className="mt-2 text-4xl font-bold">{mission.title}</h1>

      <p className="mt-4 text-zinc-400">{mission.description}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-500">Reward</p>
          <p className="mt-1 font-semibold">{mission.reward}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-500">Difficulty</p>
          <p className="mt-1 font-semibold">{mission.difficulty}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-500">Estimated Time</p>
          <p className="mt-1 font-semibold">{mission.estimatedTime}</p>
        </div>
      </div>

      {mission.atlasTips && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Atlas Tips</h2>

          <ul className="mt-4 space-y-3">
            {mission.atlasTips.map((tip) => (
              <li
                key={tip}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-300"
              >
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}