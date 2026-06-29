type FeatureChipProps = {
  children: React.ReactNode;
};

export default function FeatureChip({
  children,
}: FeatureChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200">
      {children}
    </span>
  );
}