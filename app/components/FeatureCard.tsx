type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400">
      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="text-zinc-400">{description}</p>
    </div>
  );
}