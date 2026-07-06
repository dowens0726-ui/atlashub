import type { PlayerProfile } from "@/app/types";

type BudgetCardProps = {
  profile: PlayerProfile;
};

export default function BudgetCard({ profile }: BudgetCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Budget
      </p>

      <p className="mt-4 text-5xl font-black text-white">
        ${profile.cash.toLocaleString()}
      </p>
    </div>
  );
}