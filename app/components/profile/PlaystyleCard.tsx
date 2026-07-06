import type { PlayerProfile } from "@/app/types";

type PlaystyleCardProps = {
  profile: PlayerProfile;
};

export default function PlaystyleCard({ profile }: PlaystyleCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Play Style
      </p>

      <p className="mt-4 text-4xl font-black capitalize text-white">
        {profile.playstyle}
      </p>
    </div>
  );
}