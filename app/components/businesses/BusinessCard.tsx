import Link from "next/link";
import type { Business } from "@/app/types";

type BusinessCardProps = {
  business: Business;
};

export default function BusinessCard({
  business,
}: BusinessCardProps) {
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className="group block rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-emerald-400"
    >
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-zinc-950 text-5xl">
        🏢
      </div>

      <h2 className="mt-5 text-2xl font-black text-white">
        {business.name}
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        {business.category}
      </p>

      <p className="mt-4 line-clamp-3 leading-7 text-zinc-300">
        {business.description}
      </p>

      <p className="mt-6 font-semibold text-emerald-400 transition group-hover:translate-x-1">
        View Business →
      </p>
    </Link>
  );
}
