"use client";

import { AtlasAdvisor } from "@/app/components/advisor";
import { useActivity } from "@/app/hooks/useActivity";
import { usePlayerProfile } from "@/app/hooks/usePlayerProfile";
import { getBusiness, getEmpireModel } from "@/app/services";

import BusinessSelector from "./BusinessSelector";
import PlayerProfile from "./PlayerProfile";

export default function ProfileClient() {
  const { profile, updateProfile, resetProfile } =
    usePlayerProfile();

  const { addActivity } = useActivity();

  const empire = getEmpireModel(profile);

  function handleBusinessChange(
    ownedBusinesses: string[]
  ) {
    const previousBusinesses = profile.ownedBusinesses;

    const addedBusiness = ownedBusinesses.find(
      (slug) =>
        !previousBusinesses.includes(slug)
    );

    const removedBusiness = previousBusinesses.find(
      (slug) =>
        !ownedBusinesses.includes(slug)
    );

    updateProfile({
      ownedBusinesses,
    });

    if (addedBusiness) {
      const business = getBusiness(addedBusiness);

      addActivity({
        type: "business.owned",
        title: `Bought ${
          business?.name ?? addedBusiness
        }`,
        description:
          "Your empire profile and recommendations were updated.",
      });
    }

    if (removedBusiness) {
      const business = getBusiness(removedBusiness);

      addActivity({
        type: "business.removed",
        title: `Removed ${
          business?.name ?? removedBusiness
        }`,
        description:
          "Your owned business list was updated.",
      });
    }
  }

  return (
    <div className="mt-10 space-y-10">
      <section>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Player Command
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          Empire Identity
        </h2>

        <p className="mt-2 text-zinc-400">
          Manage your player profile, resources, and strategy settings.
        </p>

        <div className="mt-6">
          <PlayerProfile
            profile={profile}
            onProfileChange={updateProfile}
          />
        </div>
      </section>

      <section>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
          Empire Intelligence
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          Atlas Empire Status
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-zinc-900 p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
              Empire Score
            </p>

            <p className="mt-3 text-5xl font-black text-white">
              {empire.overallScore}
            </p>

            <p className="mt-2 font-black text-amber-400">
              Grade {empire.overallGrade}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
              Current Focus
            </p>

            <p className="mt-3 text-xl font-black text-white">
              {empire.insights[0]?.title ??
                "Continue building"}
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              {empire.insights[0]?.description ??
                "Atlas is analyzing your empire."}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
              Atlas Insight
            </p>

            <p className="mt-3 text-xl font-black text-white">
              {empire.insights[1]?.title ??
                "No warnings"}
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              {empire.insights[1]?.description ??
                "Your empire is operating efficiently."}
            </p>
          </div>
        </div>
      </section>

      <section>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
          Empire Assets
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          Owned Businesses
        </h2>

        <p className="mt-2 text-zinc-400">
          Update your empire holdings so Atlas can optimize future recommendations.
        </p>

        <div className="mt-6">
          <BusinessSelector
            selected={profile.ownedBusinesses}
            onChange={handleBusinessChange}
          />
        </div>
      </section>

      <section>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          Strategic Recommendations
        </h2>

        <div className="mt-6">
          <AtlasAdvisor profile={profile} />
        </div>
      </section>

      <section>
        <button
          type="button"
          onClick={resetProfile}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-amber-400 hover:text-amber-400"
        >
          Reset Profile
        </button>
      </section>
    </div>
  );
}