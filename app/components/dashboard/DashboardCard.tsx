import Link from "next/link";
import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export default function DashboardCard({
  title,
  description,
  href,
  icon,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-white transition hover:-translate-y-1 hover:border-emerald-400"
    >
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-5 text-2xl font-black">{title}</h3>

      <p className="mt-3 leading-7 text-zinc-400">{description}</p>

      <p className="mt-6 font-semibold text-emerald-400 transition group-hover:translate-x-1">
        Open →
      </p>
    </Link>
  );
}