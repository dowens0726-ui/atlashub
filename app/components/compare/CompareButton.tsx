import Link from "next/link";

type CompareButtonProps = {
  slug: string;
};

export default function CompareButton({
  slug,
}: CompareButtonProps) {
  return (
    <Link
      href={`/compare?vehicle=${slug}`}
      className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
    >
      Compare
    </Link>
  );
}