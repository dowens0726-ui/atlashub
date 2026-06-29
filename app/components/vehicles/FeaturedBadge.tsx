type FeaturedBadgeProps = {
  featured: boolean;
};

export default function FeaturedBadge({ featured }: FeaturedBadgeProps) {
  if (!featured) return null;

  return (
    <div className="inline-flex rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-950">
      ⭐ Featured
    </div>
  );
}