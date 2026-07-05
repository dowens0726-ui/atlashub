import type { AtlasBadge as AtlasBadgeType } from "@/app/services/badge.service";

type AtlasBadgeProps = {
  badge: AtlasBadgeType;
};

const variantClasses = {
  gold: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  blue: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  purple: "border-purple-400/30 bg-purple-400/10 text-purple-300",
  zinc: "border-zinc-600 bg-zinc-800 text-zinc-300",
};

export default function AtlasBadge({ badge }: AtlasBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${variantClasses[badge.variant]}`}
    >
      <span>{badge.emoji}</span>
      <span>{badge.label}</span>
    </span>
  );
}