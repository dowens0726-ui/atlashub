"use client";

import type { PlayerProfile } from "@/app/types";
import CashEditor from "./CashEditor";

type BudgetCardProps = {
  profile: PlayerProfile;
  onCashChange?: (cash: number) => void;
};

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function BudgetCard({
  profile,
  onCashChange,
}: BudgetCardProps) {
  return (
    <div className="min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Budget
      </p>

      <p className="mt-4 truncate text-4xl font-black text-white xl:text-5xl">
        {formatCompactCurrency(profile.cash)}
      </p>

      <p className="mt-2 text-sm font-semibold text-zinc-500">
        Exact: ${profile.cash.toLocaleString()}
      </p>

      {onCashChange ? (
        <CashEditor value={profile.cash} onSave={onCashChange} />
      ) : null}
    </div>
  );
}