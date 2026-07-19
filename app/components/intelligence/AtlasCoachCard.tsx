import type { ReactNode } from "react";
import AtlasStatusBadge from "./AtlasStatusBadge";
import AtlasIntelligencePanel from "./AtlasIntelligencePanel";

import type { AtlasCoachBriefing } from "@/app/intelligence";

type AtlasCoachCardProps = {
  briefing: AtlasCoachBriefing;
};

type CoachTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "red"
  | "zinc";

const priorityStyles = {
  Low: "border-zinc-700 bg-zinc-800/60 text-zinc-300",
  Medium: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  High: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Critical: "border-red-400/30 bg-red-400/10 text-red-300",
};

const toneStyles = {
  Exploratory: "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300",
  Supportive:
    "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300",
  Confident:
    "border-violet-400/20 bg-violet-400/[0.06] text-violet-300",
  Corrective:
    "border-amber-400/20 bg-amber-400/[0.06] text-amber-300",
};

function getPriorityTone(
  priority: AtlasCoachBriefing["priority"]
): CoachTone {
  switch (priority) {
    case "Critical":
      return "red";
    case "High":
      return "amber";
    case "Medium":
      return "cyan";
    default:
      return "zinc";
  }
}

function getCoachingTone(
  tone: AtlasCoachBriefing["tone"]
): CoachTone {
  switch (tone) {
    case "Supportive":
      return "emerald";
    case "Confident":
      return "violet";
    case "Corrective":
      return "amber";
    default:
      return "cyan";
  }
}

function getConfidenceTone(confidence: number): CoachTone {
  if (confidence >= 85) {
    return "emerald";
  }

  if (confidence >= 70) {
    return "cyan";
  }

  if (confidence >= 50) {
    return "amber";
  }

  return "red";
}

export default function AtlasCoachCard({
  briefing,
}: AtlasCoachCardProps) {
  const confidence = Math.max(
    0,
    Math.min(100, briefing.confidence)
  );

  const priorityTone = getPriorityTone(
    briefing.priority
  );

  const coachingTone = getCoachingTone(
    briefing.tone
  );

  const confidenceTone =
    getConfidenceTone(confidence);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-violet-400/25 bg-zinc-950 shadow-2xl shadow-violet-950/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.09),transparent_32%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/80 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-5 border-b border-zinc-800/80 pb-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-violet-300">
                {briefing.title}
              </p>

              <AtlasStatusBadge tone="emerald">
  Coach Online
</AtlasStatusBadge>
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {briefing.greeting}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              {briefing.subtitle}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 lg:max-w-xs lg:justify-end">
            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${
                priorityStyles[briefing.priority]
              }`}
            >
              {briefing.priority} Priority
            </span>

            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${
                toneStyles[briefing.tone]
              }`}
            >
              {briefing.tone} Mode
            </span>
          </div>
        </header>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <CoachMetric
            label="Coach Confidence"
            value={`${confidence}%`}
            detail="Briefing certainty"
            tone={confidenceTone}
          />

          <CoachMetric
            label="Priority"
            value={briefing.priority}
            detail="Current urgency"
            tone={priorityTone}
          />

          <CoachMetric
            label="Coaching Mode"
            value={briefing.tone}
            detail="Guidance style"
            tone={coachingTone}
          />
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <CoachPanel
              eyebrow="Coach Summary"
              title="Your strategic briefing"
              tone="violet"
            >
              <p className="text-sm leading-7 text-zinc-300 sm:text-base">
                {briefing.summary}
              </p>
            </CoachPanel>

            <CoachPanel
              eyebrow="What Atlas Sees"
              title="Current intelligence signals"
              tone="cyan"
            >
              {briefing.highlights.length > 0 ? (
                <ul className="space-y-3">
                  {briefing.highlights.map(
                    (highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-6 text-zinc-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />

                        <span>{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-sm leading-7 text-zinc-500">
                  Atlas is still gathering enough
                  information to identify meaningful
                  coaching signals.
                </p>
              )}
            </CoachPanel>
          </div>

          <div className="space-y-5">
            <CoachPanel
              eyebrow="Recommended Focus"
              title={briefing.recommendationTitle}
              tone="emerald"
            >
              <p className="text-sm leading-7 text-zinc-300">
                {briefing.recommendationSummary}
              </p>

              <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400">
                  Next Coaching Action
                </p>

                <p className="mt-2 text-sm font-bold leading-6 text-emerald-200">
                  {briefing.callToAction}
                </p>
              </div>
            </CoachPanel>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
                    Coaching Confidence
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    {confidence}%
                  </p>
                </div>

                <p className="max-w-44 text-right text-xs font-bold leading-5 text-zinc-500">
                  Based on current player behavior and
                  strategic signals
                </p>
              </div>

              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800"
                role="progressbar"
                aria-label="Coach confidence"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={confidence}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-300 transition-[width] duration-500"
                  style={{
                    width: `${confidence}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoachPanel({
  eyebrow,
  title,
  tone,
  children,
}: {
  eyebrow: string;
  title: string;
  tone: CoachTone;
  children: ReactNode;
}) {
  const toneClasses: Record<
    CoachTone,
    string
  > = {
    violet:
      "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
    cyan:
      "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
    amber:
      "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
    red:
      "border-red-400/20 bg-red-400/[0.04] text-red-300",
    zinc:
      "border-zinc-700 bg-zinc-900/50 text-zinc-300",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${toneClasses[tone]}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.25em]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-black text-white">
        {title}
      </h3>

      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

function CoachMetric({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: CoachTone;
}) {
  const toneClasses: Record<
    CoachTone,
    string
  > = {
    violet:
      "border-violet-400/20 bg-violet-400/[0.04] text-violet-300",
    cyan:
      "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
    emerald:
      "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
    amber:
      "border-amber-400/20 bg-amber-400/[0.04] text-amber-300",
    red:
      "border-red-400/20 bg-red-400/[0.04] text-red-300",
    zinc:
      "border-zinc-700 bg-zinc-900/60 text-zinc-300",
  };

  return (
    <div
      className={`rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 ${toneClasses[tone]}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words text-xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold">
        {detail}
      </p>
    </div>
  );
}