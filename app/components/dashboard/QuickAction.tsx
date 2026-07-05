import Link from "next/link";
import type { ReactNode } from "react";

type QuickActionProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

export default function QuickAction({ href, label, icon }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white transition hover:border-emerald-400"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-bold">{label}</span>
    </Link>
  );
}