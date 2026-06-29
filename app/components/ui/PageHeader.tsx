type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <div>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          {eyebrow}
        </p>
      )}

      <h1 className="mt-3 text-5xl font-black">{title}</h1>

      {description && (
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}