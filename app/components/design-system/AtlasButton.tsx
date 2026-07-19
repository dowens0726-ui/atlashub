import Link from "next/link";
import type { ReactNode } from "react";

type AtlasButtonVariant =
  | "primary"
  | "secondary"
  | "ghost";

type AtlasButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: AtlasButtonVariant;
  className?: string;
};

const variantClasses: Record<
  AtlasButtonVariant,
  string
> = {
  primary:
    "border-cyan-400/30 bg-cyan-500/15 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/20",

  secondary:
    "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",

  ghost:
    "border-transparent bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
};

export default function AtlasButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: AtlasButtonProps) {
  const classes = [
    "inline-flex items-center justify-center",
    "rounded-2xl border",
    "px-5 py-3",
    "font-semibold",
    "transition-all duration-300",
    "hover:-translate-y-0.5",
    "active:translate-y-0",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}