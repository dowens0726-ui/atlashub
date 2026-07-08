"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  icon?: string;
};

export default function NavLink({
  href,
  label,
  icon,
}: NavLinkProps) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={[
        "group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition-all duration-200",
        active
          ? "bg-amber-400/10 text-amber-400 border-l-4 border-amber-400"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
      ].join(" ")}
    >
      {icon && (
        <span
          className={
            active
              ? "text-amber-400"
              : "text-zinc-500 group-hover:text-white"
          }
        >
          {icon}
        </span>
      )}

      <span>{label}</span>
    </Link>
  );
}