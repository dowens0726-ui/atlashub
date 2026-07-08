"use client";

import { getBusinesses } from "@/app/services";
import type { Business } from "@/app/types";

type BusinessSelectorProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function BusinessSelector({
  selected,
  onChange,
}: BusinessSelectorProps) {
  const businesses = getBusinesses();

  function toggleBusiness(slug: string) {
    if (selected.includes(slug)) {
      onChange(selected.filter((item) => item !== slug));
      return;
    }

    onChange([...selected, slug]);
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
        Business Ownership
      </p>

      <div className="mt-6 space-y-3">
        {businesses.map((business: Business) => (
          <label
            key={business.slug}
            className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-amber-400"
          >
            <div>
              <p className="font-bold text-white">{business.name}</p>
              <p className="text-sm text-zinc-400">
                ${business.price.toLocaleString()}
              </p>
            </div>

            <input
              type="checkbox"
              checked={selected.includes(business.slug)}
              onChange={() => toggleBusiness(business.slug)}
              className="h-5 w-5 accent-amber-400"
            />
          </label>
        ))}
      </div>
    </div>
  );
}