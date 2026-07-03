import Link from "next/link";
import { Card, Badge } from "@/app/components/ui";

type RecommendationCardProps = {
  href: string;
  icon: string;
  title: string;
  label: string;
  description: string;
};

export default function RecommendationCard({
  href,
  icon,
  title,
  label,
  description,
}: RecommendationCardProps) {
  return (
    <Link href={href}>
      <Card className="transition hover:border-emerald-400">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{icon}</span>

          <div>
            <Badge>{label}</Badge>

            <h3 className="mt-2 font-bold text-white">{title}</h3>

            <p className="mt-1 text-sm text-zinc-400">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}