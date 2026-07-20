import type {
  ReactNode,
} from "react";

export type AtlasPulseTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "red"
  | "zinc";

export type AtlasPulseIntensity =
  | "subtle"
  | "standard"
  | "strong";

type AtlasPulseProps = {
  children?: ReactNode;
  tone?: AtlasPulseTone;
  intensity?: AtlasPulseIntensity;
  active?: boolean;
  className?: string;
  label?: string;
};

const toneClasses: Record<
  AtlasPulseTone,
  {
    dot: string;
    ring: string;
  }
> = {
  cyan: {
    dot:
      "bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.85)]",

    ring:
      "bg-cyan-300/45",
  },

  emerald: {
    dot:
      "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]",

    ring:
      "bg-emerald-300/45",
  },

  violet: {
    dot:
      "bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.85)]",

    ring:
      "bg-violet-300/45",
  },

  amber: {
    dot:
      "bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.85)]",

    ring:
      "bg-amber-300/45",
  },

  red: {
    dot:
      "bg-red-300 shadow-[0_0_10px_rgba(252,165,165,0.85)]",

    ring:
      "bg-red-300/45",
  },

  zinc: {
    dot:
      "bg-zinc-400 shadow-[0_0_8px_rgba(161,161,170,0.55)]",

    ring:
      "bg-zinc-400/35",
  },
};

const intensityClasses: Record<
  AtlasPulseIntensity,
  string
> = {
  subtle:
    "opacity-35",

  standard:
    "opacity-55",

  strong:
    "opacity-75",
};

export default function AtlasPulse({
  children,
  tone = "cyan",
  intensity = "standard",
  active = true,
  className = "",
  label,
}: AtlasPulseProps) {
  const styles =
    toneClasses[tone];

  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {active ? (
          <span
            aria-hidden="true"
            className={[
              "absolute inline-flex h-full w-full animate-ping rounded-full motion-reduce:animate-none",
              styles.ring,
              intensityClasses[
                intensity
              ],
            ].join(" ")}
          />
        ) : null}

        <span
          aria-hidden="true"
          className={[
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            active
              ? styles.dot
              : "bg-zinc-600",
          ].join(" ")}
        />
      </span>

      {children}
    </span>
  );
}
