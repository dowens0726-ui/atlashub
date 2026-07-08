import type { IntelligenceInsight } from "@/app/intelligence";

type AtlasIntelligenceFeedProps = {
  insights: IntelligenceInsight[];
};

const severityMeta = {
  info: {
    icon: "🧠",
    label: "Intel",
    className: "text-cyan-400",
  },
  success: {
    icon: "▲",
    label: "Opportunity",
    className: "text-emerald-400",
  },
  warning: {
    icon: "⚠",
    label: "Watch",
    className: "text-amber-400",
  },
};

export default function AtlasIntelligenceFeed({
  insights,
}: AtlasIntelligenceFeedProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Atlas Intelligence
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Intelligence Feed
      </h2>

      <div className="mt-6 space-y-4">
        {insights.map((insight) => {
          const meta = severityMeta[insight.severity];

          return (
            <div
              key={insight.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
            >
              <div className="flex items-center gap-3">
                <span className={meta.className}>{meta.icon}</span>

                <p className={`text-xs font-black uppercase tracking-[0.2em] ${meta.className}`}>
                  {meta.label}
                </p>
              </div>

              <h3 className="mt-3 font-black text-white">
                {insight.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}