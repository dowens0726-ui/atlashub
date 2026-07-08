import type { PlayerProfile as PlayerProfileType } from "@/app/types";
import BudgetCard from "./BudgetCard";
import OwnedBusinesses from "./OwnedBusinesses";
import PlaystyleCard from "./PlaystyleCard";

type PlayerProfileProps = {
  profile: PlayerProfileType;
  onProfileChange?: (partialProfile: Partial<PlayerProfileType>) => void;
};

export default function PlayerProfile({
  profile,
  onProfileChange,
}: PlayerProfileProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <BudgetCard
        profile={profile}
        onCashChange={
          onProfileChange
            ? (cash) => onProfileChange({ cash })
            : undefined
        }
      />
      <PlaystyleCard profile={profile} />
      <OwnedBusinesses profile={profile} />
    </div>
  );
}