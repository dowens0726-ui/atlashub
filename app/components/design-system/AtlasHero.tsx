import type {
  ReactNode,
} from "react";

import AtlasSurface from "./AtlasSurface";


type AtlasHeroLayout =
  | "split"
  | "stacked";


type AtlasHeroProps = {
  eyebrow?:
    string;

  title:
    string;

  description?:
    string;

  actions?:
    ReactNode;

  children?:
    ReactNode;

  layout?:
    AtlasHeroLayout;
};


export default function AtlasHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  layout = "split",
}: AtlasHeroProps) {
  const isStacked =
    layout ===
    "stacked";


  return (
    <AtlasSurface
      tone="elevated"
      glow
      className="relative overflow-hidden p-8 md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/10"
      />

      <div
        className={[
          "relative z-10",
          isStacked
            ? "space-y-8"
            : "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
        ].join(" ")}
      >
        <div
          className={
            isStacked
              ? "max-w-4xl"
              : "max-w-3xl"
          }
        >
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              {description}
            </p>
          ) : null}

          {actions ? (
            <div className="mt-8 flex flex-wrap gap-4">
              {actions}
            </div>
          ) : null}
        </div>

        {children ? (
          <div
            className={[
              "min-w-0",
              isStacked
                ? "w-full"
                : "w-full lg:max-w-md lg:flex-1",
            ].join(" ")}
          >
            {children}
          </div>
        ) : null}
      </div>
    </AtlasSurface>
  );
}