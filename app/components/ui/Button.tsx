import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors";

  const variants = {
    primary: "bg-emerald-500 text-zinc-950 hover:bg-emerald-400",
    secondary:
      "border border-zinc-700 bg-transparent text-white hover:border-emerald-400",
  };

  const className = `${baseClasses} ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}