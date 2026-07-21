export type NeuralCoreNodeTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "neutral";


type NeuralCoreNodeProps = {
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

  active?:
    boolean;

  priority?:
    boolean;
};


const toneClasses:
  Record<
    NeuralCoreNodeTone,
    {
      border:
        string;

      background:
        string;

      text:
        string;

      dot:
        string;

      glow:
        string;
    }
  > = {
    cyan: {
      border:
        "border-cyan-300/25",

      background:
        "bg-cyan-400/[0.08]",

      text:
        "text-cyan-200",

      dot:
        "bg-cyan-300",

      glow:
        "shadow-[0_0_28px_rgba(34,211,238,0.18)]",
    },

    emerald: {
      border:
        "border-emerald-300/25",

      background:
        "bg-emerald-400/[0.08]",

      text:
        "text-emerald-200",

      dot:
        "bg-emerald-300",

      glow:
        "shadow-[0_0_28px_rgba(52,211,153,0.18)]",
    },

    violet: {
      border:
        "border-violet-300/25",

      background:
        "bg-violet-400/[0.08]",

      text:
        "text-violet-200",

      dot:
        "bg-violet-300",

      glow:
        "shadow-[0_0_28px_rgba(139,92,246,0.18)]",
    },

    amber: {
      border:
        "border-amber-300/25",

      background:
        "bg-amber-400/[0.08]",

      text:
        "text-amber-200",

      dot:
        "bg-amber-300",

      glow:
        "shadow-[0_0_28px_rgba(251,191,36,0.18)]",
    },

    rose: {
      border:
        "border-rose-300/25",

      background:
        "bg-rose-400/[0.08]",

      text:
        "text-rose-200",

      dot:
        "bg-rose-300",

      glow:
        "shadow-[0_0_28px_rgba(251,113,133,0.18)]",
    },

    neutral: {
      border:
        "border-white/[0.09]",

      background:
        "bg-white/[0.035]",

      text:
        "text-zinc-300",

      dot:
        "bg-zinc-400",

      glow:
        "",
    },
  };


export default function NeuralCoreNode({
  label,
  code,
  value,
  tone,
  position,
  active = false,
  priority = false,
}: NeuralCoreNodeProps) {
  const classes =
    toneClasses[
      tone
    ];

  return (
    <div
      className={[
        "atlas-neural-node absolute z-20 -translate-x-1/2 -translate-y-1/2",
        position,
        active
          ? "atlas-neural-node--active"
          : "",
        priority
          ? "atlas-neural-node--priority"
          : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative min-w-[88px] rounded-xl border px-3 py-2 backdrop-blur-xl transition duration-500",
          classes.border,
          classes.background,
          active
            ? classes.glow
            : "",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full",
            classes.dot,
            active
              ? "atlas-neural-node__signal"
              : "opacity-45",
          ].join(" ")}
        />

        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.48rem] font-black uppercase tracking-[0.2em] text-zinc-500">
            {code}
          </span>

          {priority ? (
            <span className="text-[0.45rem] font-black uppercase tracking-[0.16em] text-amber-200">
              Priority
            </span>
          ) : null}
        </div>

        <p
          className={[
            "mt-1 text-[0.65rem] font-black uppercase tracking-[0.12em]",
            classes.text,
          ].join(" ")}
        >
          {label}
        </p>

        <p className="mt-1 max-w-[104px] truncate text-[0.58rem] font-semibold text-zinc-500">
          {value}
        </p>
      </div>
    </div>
  );
}
