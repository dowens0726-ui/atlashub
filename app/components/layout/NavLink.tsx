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
        "group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300",
        active
          ? "bg-amber-400/10 text-white shadow-[0_0_20px_rgba(251,191,36,0.12)]"
          : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
      ].join(" ")}
    >
      {active && (
        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-amber-400" />
      )}

      {icon && (
        <span
          className={[
            "relative flex h-6 w-6 items-center justify-center text-base transition-all duration-300",
            active
              ? "text-amber-400"
              : "text-zinc-500 group-hover:text-white",
          ].join(" ")}
        >
          {icon}
        </span>
      )}

      <span className="relative tracking-wide">
        {label}
      </span>

      {!active && (
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </Link>
  );
}