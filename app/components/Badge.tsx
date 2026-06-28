type BadgeVariant = "easy" | "medium" | "hard" | "default";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

export default function Badge({
  label,
  variant = "default",
}: BadgeProps) {
  const styles = {
    easy: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    medium: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
    hard: "border-red-500/40 bg-red-500/10 text-red-400",
    default: "border-zinc-700 bg-zinc-900 text-zinc-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${styles[variant]}`}
    >
      {label}
    </span>
  );
}