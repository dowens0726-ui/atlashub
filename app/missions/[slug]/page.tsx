import { notFound } from "next/navigation";
import { missions } from "../data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;

  const mission = missions.find((m) => m.slug === slug);

  if (!mission) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <a href="/missions" className="text-sm text-zinc-400 hover:text-white">
          ← Back to Missions
        </a>

        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          {mission.category}
        </p>

        <h1 className="mt-3 text-6xl font-black">{mission.title}</h1>

        <p className="mt-8 text-xl text-zinc-300">{mission.description}</p>

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-lg">
            <span className="font-bold text-emerald-400">Reward:</span>{" "}
            {mission.reward}
          </p>

          <p className="mt-4 text-lg">
            <span className="font-bold text-emerald-400">Difficulty:</span>{" "}
            {mission.difficulty}
          </p>
        </div>
      </section>
    </main>
  );
}