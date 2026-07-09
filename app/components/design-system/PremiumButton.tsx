import Link from "next/link";
import type { ReactNode } from "react";

type PremiumButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "success"
  | "danger";

type PremiumButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: PremiumButtonVariant;
  className?: string;
};

const variants: Record<PremiumButtonVariant, string> = {
  primary:
    "bg-cyan-400 text-zinc-950 hover:bg-cyan-300",

  secondary:
    "border border-zinc-700 bg-zinc-900 text-white hover:border-cyan-400 hover:bg-zinc-800",

  ghost:
    "bg-transparent text-zinc-300 hover:bg-white/5",

  success:
    "bg-emerald-500 text-white hover:bg-emerald-400",

  danger:
    "bg-red-500 text-white hover:bg-red-400",
};

export default function PremiumButton({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: PremiumButtonProps) {
  const classes = `
    inline-flex
    items-center
    justify-center
    rounded-xl
    px-5
    py-3
    text-sm
    font-black
    transition-all
    duration-200
    hover:-translate-y-0.5
    ${variants[variant]}
    ${className}
  `;

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