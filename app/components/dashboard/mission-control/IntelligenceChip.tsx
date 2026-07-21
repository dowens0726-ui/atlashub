import type {
  ReactNode,
} from "react";


export type IntelligenceChipTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "neutral";


type IntelligenceChipProps = {
  label:
    string;

  value:
    ReactNode;

  tone?:
    IntelligenceChipTone;

  icon?:
    string;
};


function getToneClasses(
  tone:
    IntelligenceChipTone
): {
  border:
    string;

  glow:
    string;

  icon:
    string;

  value:
    string;
} {
  switch (
    tone
  ) {
    case "emerald":
      return {
        border:
          "border-emerald-400/15",

        glow:
          "bg-emerald-400",

        icon:
          "text-emerald-300",

        value:
          "text-emerald-100",
      };

    case "violet":
      return {
        border:
          "border-violet-400/15",

        glow:
          "bg-violet-400",

        icon:
          "text-violet-300",

        value:
          "text-violet-100",
      };

    case "amber":
      return {
        border:
          "border-amber-400/15",

        glow:
          "bg-amber-400",

        icon:
          "text-amber-300",

        value:
          "text-amber-100",
      };

    case "rose":
      return {
        border:
          "border-rose-400/15",

        glow:
          "bg-rose-400",

        icon:
          "text-rose-300",

        value:
          "text-rose-100",
      };

    case "neutral":
      return {
        border:
          "border-white/10",

        glow:
          "bg-zinc-400",

        icon:
          "text-zinc-400",

        value:
          "text-zinc-200",
      };

    case "cyan":
    default:
      return {
        border:
          "border-cyan-400/15",

        glow:
          "bg-cyan-400",

        icon:
          "text-cyan-300",

        value:
          "text-cyan-100",
      };
  }
}


export default function IntelligenceChip({
  label,
  value,
  tone = "cyan",
  icon = "●",
}: IntelligenceChipProps) {
  const toneClasses =
    getToneClasses(
      tone
    );


  return (
    <div
      className={[
        "atlas-intelligence-chip group relative flex min-w-max items-center gap-3 rounded-full border bg-black/25 px-4 py-2.5 backdrop-blur-md transition duration-300",
        "hover:-translate-y-0.5 hover:bg-white/[0.045]",
        toneClasses.border,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute inset-y-2 left-0 w-px rounded-full opacity-60 blur-[0.2px]",
          toneClasses.glow,
        ].join(" ")}
      />

      <span
        aria-hidden="true"
        className={[
          "text-[0.62rem] font-black",
          toneClasses.icon,
        ].join(" ")}
      >
        {icon}
      </span>

      <div className="flex items-center gap-2">
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-zinc-500">
          {label}
        </span>

        <span
          className={[
            "text-xs font-black tracking-[0.02em]",
            toneClasses.value,
          ].join(" ")}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
