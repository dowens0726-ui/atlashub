type ToolbarButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  primary?: boolean;
};

export default function ToolbarButton({
  children,
  onClick,
  active = false,
  primary = false,
}: ToolbarButtonProps) {
  const className = primary
    ? "rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
    : active
      ? "rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-zinc-950 transition"
      : "rounded-lg bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700";

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}