import { getBusiness } from "@/app/services";
import type { Business, PlayerProfile } from "@/app/types";

type OwnedBusinessesProps = {
  profile: PlayerProfile;
};

function isBusiness(business: Business | undefined): business is Business {
  return Boolean(business);
}

export default function OwnedBusinesses({ profile }: OwnedBusinessesProps) {
  const businesses = profile.ownedBusinesses
    .map((slug) => getBusiness(slug))
    .filter(isBusiness);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        Owned Businesses
      </p>

      <div className="mt-4 space-y-3">
        {businesses.length === 0 ? (
          <p className="text-zinc-400">No businesses added yet.</p>
        ) : (
          businesses.map((business) => (
            <div
              key={business.slug}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <p className="font-bold text-white">{business.name}</p>
              <p className="text-sm text-zinc-400">{business.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}