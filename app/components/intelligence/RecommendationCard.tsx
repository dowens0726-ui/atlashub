import Link from "next/link";
import { Card, Badge } from "@/app/components/ui";
import FavoriteButton from "@/app/components/favorites/FavoriteButton";

type RecommendationCardProps = {
  id: string;
  type: "mission" | "vehicle" | "weapon";
  href: string;
  icon: string;
  title: string;
  label: string;
  description: string;
};

export default function RecommendationCard({
  id,
  type,
  href,
  icon,
  title,
  label,
  description,
}: RecommendationCardProps) {
  return (
    <Card className="transition hover:border-emerald-400">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{icon}</span>

          <div>
            <Badge>{label}</Badge>

            <h3 className="mt-2 font-bold text-white">
              {title}
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        <FavoriteButton
          item={{
            id,
            type,
            title,
            href,
          }}
        />
      </div>

      <Link
        href={href}
        className="mt-4 inline-flex rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-emerald-400"
      >
        Open →
      </Link>
    </Card>
  );
}