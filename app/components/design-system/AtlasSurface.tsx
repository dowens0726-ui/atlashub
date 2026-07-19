import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type AtlasSurfaceTone =
  | "default"
  | "elevated"
  | "interactive"
  | "subtle";

type AtlasSurfaceProps =
  HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    tone?: AtlasSurfaceTone;
    glow?: boolean;
  };

const toneClassNames: Record<
  AtlasSurfaceTone,
  string
> = {
  default:
    "border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20",

  elevated:
    "border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-zinc-950/90 to-violet-500/10 shadow-2xl shadow-cyan-950/20",

  interactive:
    "border-white/10 bg-zinc-950/70 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-950/30",

  subtle:
    "border-white/5 bg-white/[0.025] shadow-lg shadow-black/10",
};

export default function AtlasSurface({
  children,
  tone = "default",
  glow = false,
  className = "",
  ...props
}: AtlasSurfaceProps) {
  return (
    <div
      className={[
        "relative isolate overflow-hidden rounded-[2rem] border backdrop-blur-xl",
        toneClassNames[tone],
        glow
          ? "before:pointer-events-none before:absolute before:-right-24 before:-top-24 before:-z-10 before:h-56 before:w-56 before:rounded-full before:bg-cyan-400/10 before:blur-3xl after:pointer-events-none after:absolute after:-bottom-24 after:-left-24 after:-z-10 after:h-56 after:w-56 after:rounded-full after:bg-violet-500/10 after:blur-3xl"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}