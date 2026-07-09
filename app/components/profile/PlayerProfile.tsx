import type { PlayerProfile as PlayerProfileType } from "@/app/types";

import { getProgressionPlan } from "@/app/services";

import BudgetCard from "./BudgetCard";
import OwnedBusinesses from "./OwnedBusinesses";
import PlaystyleCard from "./PlaystyleCard";

type PlayerProfileProps = {
  profile: PlayerProfileType;
  onProfileChange?: (
    partialProfile: Partial<PlayerProfileType>
  ) => void;
};

export default function PlayerProfile({
  profile,
  onProfileChange,
}: PlayerProfileProps) {
  const progression = getProgressionPlan(profile);

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <BudgetCard
        profile={profile}
        onCashChange={
          onProfileChange
            ? (cash) =>
                onProfileChange({ cash })
            : undefined
        }
      />

      <PlaystyleCard profile={profile} />

      <OwnedBusinesses profile={profile} />

      <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
          Empire Status
        </p>

        <h3 className="mt-4 text-2xl font-black text-white">
          {progression.stage}
        </h3>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Completion
            </span>

            <span className="font-bold text-white">
              {progression.completion}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Next Move
            </span>

            <span className="max-w-[140px] truncate font-bold text-cyan-400">
              {progression.nextStep?.title ??
                "None"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}