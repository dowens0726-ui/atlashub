import NeuralCoreNode from "./NeuralCoreNode";

import type {
  NeuralCoreNodeTone,
} from "./NeuralCoreNode";


type AtlasPipelineState =
  | "waiting"
  | "loading"
  | "success"
  | "warning"
  | "failed"
  | "idle"
  | string;


type AtlasNeuralCommandCoreProps = {
  empireScore:
    number;

  confidence:
    number;

  cash:
    number;

  stage:
    string;

  pipelineStatus:
    AtlasPipelineState;

  pipelineStatusLabel:
    string;

  shouldActNow:
    boolean;

  urgencyLabel:
    string;
};


type NeuralNodeDefinition = {
  label:
    string;

  code:
    string;

  value:
    string;

  tone:
    NeuralCoreNodeTone;

  position:
    string;

  active:
    boolean;

  priority:
    boolean;
};


function clampPercentage(
  value:
    number
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        value
      )
    )
  );
}


function getStrategicVector({
  empireScore,
  cash,
  shouldActNow,
  pipelineStatus,
}: {
  empireScore:
    number;

  cash:
    number;

  shouldActNow:
    boolean;

  pipelineStatus:
    AtlasPipelineState;
}): {
  label:
    string;

  summary:
    string;

  tone:
    NeuralCoreNodeTone;
} {
  if (
    pipelineStatus ===
    "failed"
  ) {
    return {
      label:
        "Stabilize Intelligence",

      summary:
        "Restore complete Atlas signals before committing major resources.",

      tone:
        "rose",
    };
  }

  if (
    shouldActNow
  ) {
    return {
      label:
        "Execute Priority Move",

      summary:
        "Atlas has identified an immediate action with strategic importance.",

      tone:
        "amber",
    };
  }

  if (
    empireScore <
      50
  ) {
    return {
      label:
        "Consolidate Empire",

      summary:
        "Strengthen the current foundation before expanding into new systems.",

      tone:
        "amber",
    };
  }

  if (
    cash >=
      1000000
  ) {
    return {
      label:
        "Deploy Capital",

      summary:
        "Available resources support a calculated high-impact expansion.",

      tone:
        "emerald",
    };
  }

  if (
    empireScore >=
      75
  ) {
    return {
      label:
        "Expand Momentum",

      summary:
        "Current empire health supports continued strategic growth.",

      tone:
        "cyan",
    };
  }

  return {
    label:
      "Build Position",

    summary:
      "Advance efficiently while preserving capital and optionality.",

    tone:
      "violet",
  };
}


function getCoreStateClasses(
  pipelineStatus:
    AtlasPipelineState
): string {
  switch (
    pipelineStatus
  ) {
    case "loading":
      return "atlas-neural-core--processing";

    case "success":
      return "atlas-neural-core--online";

    case "warning":
      return "atlas-neural-core--warning";

    case "failed":
      return "atlas-neural-core--limited";

    case "waiting":
      return "atlas-neural-core--waiting";

    case "idle":
    default:
      return "atlas-neural-core--standby";
  }
}


function getCoreStatusLabel(
  pipelineStatus:
    AtlasPipelineState
): string {
  switch (
    pipelineStatus
  ) {
    case "loading":
      return "Processing";

    case "success":
      return "Synchronized";

    case "warning":
      return "Signal Warning";

    case "failed":
      return "Limited";

    case "waiting":
      return "Awaiting Data";

    case "idle":
    default:
      return "Standby";
  }
}


function getVectorToneClasses(
  tone:
    NeuralCoreNodeTone
): string {
  switch (
    tone
  ) {
    case "emerald":
      return "border-emerald-300/20 bg-emerald-400/[0.07] text-emerald-200";

    case "amber":
      return "border-amber-300/20 bg-amber-400/[0.07] text-amber-200";

    case "rose":
      return "border-rose-300/20 bg-rose-400/[0.07] text-rose-200";

    case "violet":
      return "border-violet-300/20 bg-violet-400/[0.07] text-violet-200";

    case "cyan":
    default:
      return "border-cyan-300/20 bg-cyan-400/[0.07] text-cyan-200";
  }
}


export default function AtlasNeuralCommandCore({
  empireScore,
  confidence,
  cash,
  stage,
  pipelineStatus,
  pipelineStatusLabel,
  shouldActNow,
  urgencyLabel,
}: AtlasNeuralCommandCoreProps) {
  const normalizedEmpireScore =
    clampPercentage(
      empireScore
    );

  const normalizedConfidence =
    clampPercentage(
      confidence
    );

  const strategicVector =
    getStrategicVector({
      empireScore:
        normalizedEmpireScore,

      cash,

      shouldActNow,

      pipelineStatus,
    });

  const coreStateClasses =
    getCoreStateClasses(
      pipelineStatus
    );

  const coreStatusLabel =
    getCoreStatusLabel(
      pipelineStatus
    );

  const vectorToneClasses =
    getVectorToneClasses(
      strategicVector.tone
    );

  const capitalLabel =
    cash >=
      1000000
      ? `$${(
          cash /
          1000000
        ).toFixed(1)}M`
      : `$${Math.round(
          cash /
          1000
        )}K`;

  const nodes:
    NeuralNodeDefinition[] = [
      {
        label:
          "Empire",

        code:
          "EMP",

        value:
          `${normalizedEmpireScore}/100`,

        tone:
          normalizedEmpireScore >=
            70
            ? "emerald"
            : normalizedEmpireScore >=
                50
              ? "amber"
              : "rose",

        position:
          "left-1/2 top-[5%]",

        active:
          true,

        priority:
          normalizedEmpireScore <
            50,
      },

      {
        label:
          "Economy",

        code:
          "ECO",

        value:
          capitalLabel,

        tone:
          cash >=
            1000000
            ? "emerald"
            : "cyan",

        position:
          "left-[16%] top-[23%]",

        active:
          cash >=
            500000,

        priority:
          strategicVector.label ===
            "Deploy Capital",
      },

      {
        label:
          "Missions",

        code:
          "MSN",

        value:
          urgencyLabel,

        tone:
          shouldActNow
            ? "amber"
            : "cyan",

        position:
          "left-[84%] top-[23%]",

        active:
          shouldActNow,

        priority:
          shouldActNow,
      },

      {
        label:
          "Businesses",

        code:
          "BUS",

        value:
          normalizedEmpireScore >=
            70
            ? "Expansion Ready"
            : "Portfolio Review",

        tone:
          "violet",

        position:
          "left-[7%] top-[58%]",

        active:
          strategicVector.label ===
            "Expand Momentum",

        priority:
          false,
      },

      {
        label:
          "Vehicles",

        code:
          "VEH",

        value:
          "Mobility Network",

        tone:
          "cyan",

        position:
          "left-[93%] top-[58%]",

        active:
          pipelineStatus ===
            "success",

        priority:
          false,
      },

      {
        label:
          "Properties",

        code:
          "PRP",

        value:
          stage,

        tone:
          "emerald",

        position:
          "left-[23%] top-[89%]",

        active:
          normalizedEmpireScore >=
            60,

        priority:
          strategicVector.label ===
            "Consolidate Empire",
      },

      {
        label:
          "Crew",

        code:
          "CRW",

        value:
          normalizedConfidence >=
            75
            ? "Aligned"
            : "Review",

        tone:
          normalizedConfidence >=
            75
            ? "violet"
            : "neutral",

        position:
          "left-[77%] top-[89%]",

        active:
          normalizedConfidence >=
            75,

        priority:
          false,
      },
    ];

  return (
    <div className="atlas-neural-command-core">
      <div className="relative mx-auto h-[430px] w-full max-w-[520px]">
        <svg
          aria-hidden="true"
          className="atlas-neural-connections pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 520 430"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="atlas-neural-line"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="rgb(34 211 238)"
                stopOpacity="0.08"
              />

              <stop
                offset="50%"
                stopColor="rgb(103 232 249)"
                stopOpacity="0.58"
              />

              <stop
                offset="100%"
                stopColor="rgb(139 92 246)"
                stopOpacity="0.08"
              />
            </linearGradient>
          </defs>

          <g className="atlas-neural-connections__static">
            <line x1="260" y1="215" x2="260" y2="28" />
            <line x1="260" y1="215" x2="83" y2="99" />
            <line x1="260" y1="215" x2="437" y2="99" />
            <line x1="260" y1="215" x2="36" y2="249" />
            <line x1="260" y1="215" x2="484" y2="249" />
            <line x1="260" y1="215" x2="120" y2="383" />
            <line x1="260" y1="215" x2="400" y2="383" />
          </g>

          <g className="atlas-neural-connections__pulse">
            <line x1="260" y1="215" x2="260" y2="28" />
            <line x1="260" y1="215" x2="83" y2="99" />
            <line x1="260" y1="215" x2="437" y2="99" />
            <line x1="260" y1="215" x2="36" y2="249" />
            <line x1="260" y1="215" x2="484" y2="249" />
            <line x1="260" y1="215" x2="120" y2="383" />
            <line x1="260" y1="215" x2="400" y2="383" />
          </g>
        </svg>

        <div
          aria-hidden="true"
          className="atlas-neural-ring atlas-neural-ring--outer absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10"
        />

        <div
          aria-hidden="true"
          className="atlas-neural-ring atlas-neural-ring--middle absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/10"
        />

        <div
          aria-hidden="true"
          className="atlas-neural-ring atlas-neural-ring--inner absolute left-1/2 top-1/2 h-[194px] w-[194px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10"
        />

        {nodes.map(
          (
            node
          ) => (
            <NeuralCoreNode
              key={
                node.code
              }
              label={
                node.label
              }
              code={
                node.code
              }
              value={
                node.value
              }
              tone={
                node.tone
              }
              position={
                node.position
              }
              active={
                node.active
              }
              priority={
                node.priority
              }
            />
          )
        )}

        <div
          className={[
            "atlas-neural-core absolute left-1/2 top-1/2 z-30 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-[7px]",
            coreStateClasses,
          ].join(" ")}
          style={{
            background:
              `conic-gradient(
                rgb(34 211 238) 0%,
                rgb(52 211 153) ${normalizedConfidence}%,
                rgba(255,255,255,0.06) ${normalizedConfidence}%,
                rgba(255,255,255,0.025) 100%
              )`,
          }}
        >
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-zinc-950/95 shadow-[inset_0_0_60px_rgba(34,211,238,0.1)]">
            <div
              aria-hidden="true"
              className="atlas-neural-core__scan pointer-events-none absolute inset-x-4 h-px"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-5 rounded-full border border-cyan-300/10"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-9 rounded-full border border-violet-300/10"
            />

            <span className="text-[0.5rem] font-black uppercase tracking-[0.3em] text-cyan-300">
              Atlas Core
            </span>

            <span className="mt-2 text-5xl font-black tracking-[-0.08em] text-white">
              {normalizedConfidence}
            </span>

            <span className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Confidence
            </span>

            <span className="mt-3 rounded-full border border-cyan-400/15 bg-cyan-400/[0.07] px-2.5 py-1 text-[0.46rem] font-black uppercase tracking-[0.16em] text-cyan-200">
              {coreStatusLabel}
            </span>
          </div>
        </div>
      </div>

      <div
        className={[
          "atlas-strategic-vector relative mt-2 overflow-hidden rounded-2xl border p-4",
          vectorToneClasses,
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className="atlas-strategic-vector__beam pointer-events-none absolute inset-y-0 left-0 w-24"
        />

        <div className="relative flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-current/15 bg-black/20">
            <span
              aria-hidden="true"
              className="atlas-strategic-vector__arrow text-lg"
            >
              →
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[0.52rem] font-black uppercase tracking-[0.22em] opacity-75">
                Strategic Vector
              </p>

              <span className="rounded-full border border-current/15 bg-black/15 px-2 py-0.5 text-[0.45rem] font-black uppercase tracking-[0.14em]">
                {pipelineStatusLabel}
              </span>
            </div>

            <p className="mt-2 text-sm font-black text-white">
              {strategicVector.label}
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-400">
              {strategicVector.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
