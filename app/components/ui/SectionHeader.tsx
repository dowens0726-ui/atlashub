type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-black tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}