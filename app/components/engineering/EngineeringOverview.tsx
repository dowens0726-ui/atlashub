import type {
  EngineeringStatistics,
} from "@/app/engineering";


type EngineeringOverviewProps = {
  statistics:
    EngineeringStatistics;
};


export default function EngineeringOverview({
  statistics,
}: EngineeringOverviewProps) {
  const verificationRate =
    statistics.totalContent >
    0
      ? Math.round(
          (
            statistics.totalVerified /
            statistics.totalContent
          ) *
            100
        )
      : 0;


  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        eyebrow="Content"
        label="Total Records"
        value={
          statistics.totalContent.toString()
        }
        description="All tracked Atlas entities."
      />

      <OverviewCard
        eyebrow="Editorial"
        label="Featured"
        value={
          statistics.totalFeatured.toString()
        }
        description="Records highlighted across AtlasHub."
      />

      <OverviewCard
        eyebrow="Verification"
        label="Verified"
        value={
          statistics.totalVerified.toString()
        }
        description={`${verificationRate}% of current content.`}
      />

      <OverviewCard
        eyebrow="Relationships"
        label="Tracked Links"
        value={
          statistics.relationships.totalRelationships.toString()
        }
        description="Cross-dataset references currently monitored."
      />
    </section>
  );
}


function OverviewCard({
  eyebrow,
  label,
  value,
  description,
}: {
  eyebrow:
    string;

  label:
    string;

  value:
    string;

  description:
    string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
        {eyebrow}
      </p>

      <p className="mt-4 text-4xl font-black text-white">
        {value}
      </p>

      <h3 className="mt-2 font-bold text-zinc-200">
        {label}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </article>
  );
}