"use client";

import { AtlasAdvisor } from "@/app/components/advisor";
import { useActivity } from "@/app/hooks/useActivity";
import { usePlayerProfile } from "@/app/hooks/usePlayerProfile";
import { getBusiness } from "@/app/services";
import BusinessSelector from "./BusinessSelector";
import PlayerProfile from "./PlayerProfile";

export default function ProfileClient() {
  const { profile, updateProfile, resetProfile } = usePlayerProfile();
  const { addActivity } = useActivity();

  function handleBusinessChange(ownedBusinesses: string[]) {
    const previousBusinesses = profile.ownedBusinesses;

    const addedBusiness = ownedBusinesses.find(
      (slug) => !previousBusinesses.includes(slug)
    );

    const removedBusiness = previousBusinesses.find(
      (slug) => !ownedBusinesses.includes(slug)
    );

    updateProfile({ ownedBusinesses });

    if (addedBusiness) {
      const business = getBusiness(addedBusiness);

      addActivity({
        type: "business.owned",
        title: `Bought ${business?.name ?? addedBusiness}`,
        description: "Your empire profile and recommendations were updated.",
      });
    }

    if (removedBusiness) {
      const business = getBusiness(removedBusiness);

      addActivity({
        type: "business.removed",
        title: `Removed ${business?.name ?? removedBusiness}`,
        description: "Your owned business list was updated.",
      });
    }
  }

  return (
    <>
      <div className="mt-10">
        <PlayerProfile profile={profile} onProfileChange={updateProfile} />
      </div>

      <div className="mt-10">
        <BusinessSelector
          selected={profile.ownedBusinesses}
          onChange={handleBusinessChange}
        />
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={resetProfile}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-amber-400 hover:text-amber-400"
        >
          Reset Profile
        </button>
      </div>

      <AtlasAdvisor profile={profile} />
    </>
  );
}