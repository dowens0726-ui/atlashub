import type { PlayerProfile as PlayerProfileType } from "@/app/types";
import BudgetCard from "./BudgetCard";
import OwnedBusinesses from "./OwnedBusinesses";
import PlaystyleCard from "./PlaystyleCard";

type PlayerProfileProps = {
  profile: PlayerProfileType;
};

export default function PlayerProfile({ profile }: PlayerProfileProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <BudgetCard profile={profile} />
      <PlaystyleCard profile={profile} />
      <OwnedBusinesses profile={profile} />
    </div>
  );
}