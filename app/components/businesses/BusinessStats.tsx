import type { Business } from "@/app/types";

type BusinessStatsProps = {
  business: Business;
};

export default function BusinessStats({ business }: BusinessStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Category</p>
        <p className="mt-2 text-xl font-black text-white">
          {business.category}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Price</p>
        <p className="mt-2 text-xl font-black text-white">
          ${business.price.toLocaleString()}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Income Potential</p>
        <p className="mt-2 text-2xl font-black text-emerald-400">
          {business.incomePotential}/100
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Solo Friendly</p>
        <p className="mt-2 text-xl font-black text-white">
          {business.soloFriendly ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}