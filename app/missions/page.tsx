import MissionCard from "../components/MissionCard";
import { missions } from "./data";

export default function MissionsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Atlas Companion
        </p>

        <h1 className="mt-3 text-5xl font-black">Missions</h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Browse every GTA VI mission, walkthrough, rewards, and objectives.
        </p>

        <div className="mt-12 grid gap-6">
          {missions.map((mission) => (
            <MissionCard key={mission.slug} mission={mission} />
          ))}
        </div>
      </section>
    </main>
  );
}