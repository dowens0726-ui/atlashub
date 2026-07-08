import type { IntelligenceInsight } from "@/app/intelligence";
import { GlowCard } from "@/app/components/ui";

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

function getConfidence(severity: IntelligenceInsight["severity"]) {
  if (severity === "success") return 94;
  if (severity === "warning") return 78;
  return 88;
}

export default function AtlasIntelligenceFeed({
  insights,
}: AtlasIntelligenceFeedProps) {
  return (
    <GlowCard accent="cyan">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
        Atlas Intelligence
      </p>

      <h2 className="mt-4 text-3xl font-black text-white">
        Intelligence Feed
      </h2>

      <p className="mt-2 text-zinc-400">
        Atlas is analyzing your empire and identifying opportunities.
      </p>

      <div className="mt-6 space-y-4">
        {insights.map((insight) => {
          const meta = severityMeta[insight.severity];
          const confidence = getConfidence(insight.severity);

          return (
            <div
              key={insight.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-cyan-400/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={meta.className}>
                    {meta.icon}
                  </span>

                  <p
                    className={`text-xs font-black uppercase tracking-[0.2em] ${meta.className}`}
                  >
                    {meta.label}
                  </p>
                </div>

                <p className="text-xs font-bold text-zinc-500">
                  {confidence}% Confidence
                </p>
              </div>

              <h3 className="mt-4 text-lg font-black text-white">
                {insight.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {insight.description}
              </p>

              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <span>Atlas Confidence</span>
                  <span>{confidence}%</span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                    style={{
                      width: `${confidence}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
}