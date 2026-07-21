import type {
  AtlasHeroHudSignal,
  AtlasHeroHudTone,
} from "./atlas-hero.types";


type AtlasFloatingHudProps = {
  signals:
    AtlasHeroHudSignal[];
};


const toneClasses:
  Record<
    AtlasHeroHudTone,
    {
      border:
        string;

      background:
        string;

      code:
        string;

      value:
        string;

      indicator:
        string;
    }
  > = {
    cyan: {
      border:
        "border-cyan-300/20",

      background:
        "bg-cyan-400/[0.065]",

      code:
        "text-cyan-300",

      value:
        "text-cyan-100",

      indicator:
        "bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.85)]",
    },

    emerald: {
      border:
        "border-emerald-300/20",

      background:
        "bg-emerald-400/[0.065]",

      code:
        "text-emerald-300",

      value:
        "text-emerald-100",

      indicator:
        "bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.85)]",
    },

    violet: {
      border:
        "border-violet-300/20",

      background:
        "bg-violet-400/[0.065]",

      code:
        "text-violet-300",

      value:
        "text-violet-100",

      indicator:
        "bg-violet-300 shadow-[0_0_16px_rgba(196,181,253,0.85)]",
    },

    amber: {
      border:
        "border-amber-300/20",

      background:
        "bg-amber-400/[0.065]",

      code:
        "text-amber-300",

      value:
        "text-amber-100",

      indicator:
        "bg-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.85)]",
    },

    rose: {
      border:
        "border-rose-300/20",

      background:
        "bg-rose-400/[0.065]",

      code:
        "text-rose-300",

      value:
        "text-rose-100",

      indicator:
        "bg-rose-300 shadow-[0_0_16px_rgba(253,164,175,0.85)]",
    },
  };


export default function AtlasFloatingHud({
  signals,
}: AtlasFloatingHudProps) {
  return (
    <div
      aria-hidden="true"
      className="atlas-floating-hud pointer-events-none absolute inset-0 z-20 hidden 2xl:block"
    >
      {signals.map(
        (
          signal
        ) => {
          const classes =
            toneClasses[
              signal.tone
            ];

          return (
            <div
              key={
                `${signal.position}-${signal.code}`
              }
              className={[
                "atlas-floating-hud__signal absolute w-[176px] rounded-2xl border p-3.5 backdrop-blur-xl",
                `atlas-floating-hud__signal--${signal.position}`,
                signal.active
                  ? "atlas-floating-hud__signal--active"
                  : "",
                classes.border,
                classes.background,
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={[
                    "text-[0.48rem] font-black uppercase tracking-[0.24em]",
                    classes.code,
                  ].join(" ")}
                >
                  {signal.code}
                </span>

                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    classes.indicator,
                    signal.active
                      ? "atlas-floating-hud__indicator--active"
                      : "opacity-45",
                  ].join(" ")}
                />
              </div>

              <p className="mt-2 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
                {signal.label}
              </p>

              <p
                className={[
                  "mt-1 truncate text-xs font-black",
                  classes.value,
                ].join(" ")}
              >
                {signal.value}
              </p>

              <p className="mt-1 truncate text-[0.54rem] font-medium text-zinc-600">
                {signal.detail}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
}