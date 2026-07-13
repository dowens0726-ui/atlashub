import type {
  DatasetHealth,
  RelationshipStatistic,
} from "@/app/engineering";


type EngineeringHealthPanelProps = {
  health:
    DatasetHealth;

  relationships:
    RelationshipStatistic;
};


export default function EngineeringHealthPanel({
  health,
  relationships,
}: EngineeringHealthPanelProps) {
  const scoreClassName =
    getScoreClassName(
      health.score
    );


  return (
    <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
          Dataset Health
        </p>

        <div className="mt-5 flex items-end gap-3">
          <p
            className={`text-6xl font-black ${scoreClassName}`}
          >
            {health.score}
          </p>

          <p className="pb-2 text-sm font-bold uppercase tracking-wider text-zinc-500">
            / 100
          </p>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{
              width:
                `${health.score}%`,
            }}
          />
        </div>


        <div className="mt-6 grid grid-cols-3 gap-3">
          <IssueMetric
            label="Errors"
            value={
              health.errors
            }
            tone="error"
          />

          <IssueMetric
            label="Warnings"
            value={
              health.warnings
            }
            tone="warning"
          />

          <IssueMetric
            label="Info"
            value={
              health.information
            }
            tone="info"
          />
        </div>


        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <RelationshipMetric
            label="Broken Links"
            value={
              relationships.brokenRelationships
            }
          />

          <RelationshipMetric
            label="Orphaned Entities"
            value={
              relationships.orphanedEntities
            }
          />
        </div>
      </article>


      <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-violet-400">
              Health Issues
            </p>

            <h2 className="mt-3 text-2xl font-black text-white">
              Engineering Review Queue
            </h2>
          </div>

          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm font-black text-zinc-300">
            {health.issues.length} issues
          </span>
        </div>


        {health.issues.length >
        0 ? (
          <div className="mt-6 max-h-[520px] space-y-3 overflow-y-auto pr-2">
            {health.issues.map(
              (
                issue,
                index
              ) => (
                <div
                  key={`${issue.entityType}-${issue.slug}-${issue.message}-${index}`}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <SeverityBadge
                      severity={
                        issue.severity
                      }
                    />

                    <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
                      {issue.entityType}
                    </span>

                    <span className="font-mono text-xs text-zinc-600">
                      {issue.slug}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {issue.message}
                  </p>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
            <p className="font-bold text-emerald-300">
              No engineering issues detected.
            </p>
          </div>
        )}
      </article>
    </section>
  );
}


function IssueMetric({
  label,
  value,
  tone,
}: {
  label:
    string;

  value:
    number;

  tone:
    "error"
    | "warning"
    | "info";
}) {
  const valueClassName = {
    error:
      "text-red-400",

    warning:
      "text-amber-400",

    info:
      "text-cyan-400",
  }[tone];


  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-black ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}


function RelationshipMetric({
  label,
  value,
}: {
  label:
    string;

  value:
    number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  );
}


function SeverityBadge({
  severity,
}: {
  severity:
    DatasetHealth["issues"][number]["severity"];
}) {
  const className = {
    error:
      "border-red-400/30 bg-red-400/10 text-red-300",

    warning:
      "border-amber-400/30 bg-amber-400/10 text-amber-300",

    info:
      "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  }[severity];


  return (
    <span
      className={`rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}
    >
      {severity}
    </span>
  );
}


function getScoreClassName(
  score:
    number
): string {
  if (
    score >=
    80
  ) {
    return "text-emerald-400";
  }

  if (
    score >=
    60
  ) {
    return "text-amber-400";
  }

  return "text-red-400";
}