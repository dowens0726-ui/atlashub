"use client";

import {
  useEffect,
  useState,
} from "react";

export type AtlasProgressTone =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "red"
  | "zinc";

type AtlasProgressProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: AtlasProgressTone;
  height?: "sm" | "md" | "lg";
  animated?: boolean;
  pulse?: boolean;
  className?: string;
};

const toneClasses: Record<
  AtlasProgressTone,
  string
> = {
  cyan:
    "from-cyan-500 via-cyan-300 to-blue-400",

  emerald:
    "from-emerald-500 via-emerald-300 to-cyan-400",

  violet:
    "from-violet-500 via-violet-300 to-fuchsia-400",

  amber:
    "from-amber-500 via-amber-300 to-orange-400",

  red:
    "from-red-500 via-red-300 to-rose-400",

  zinc:
    "from-zinc-600 via-zinc-400 to-zinc-300",
};

const heightClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export default function AtlasProgress({
  value,
  max = 100,
  label,
  showValue = false,
  tone = "cyan",
  height = "md",
  animated = true,
  pulse = false,
  className = "",
}: AtlasProgressProps) {
  const safeMax =
    max > 0
      ? max
      : 100;

  const percentage =
    Math.max(
      0,
      Math.min(
        100,
        (
          value /
          safeMax
        ) * 100
      )
    );

  const [
    renderedPercentage,
    setRenderedPercentage,
  ] =
    useState(
      animated
        ? 0
        : percentage
    );

  useEffect(
    () => {
      const mediaQuery =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        );

      if (
        !animated ||
        mediaQuery.matches
      ) {
        setRenderedPercentage(
          percentage
        );

        return;
      }

      const frame =
        requestAnimationFrame(
          () => {
            setRenderedPercentage(
              percentage
            );
          }
        );

      return () => {
        cancelAnimationFrame(
          frame
        );
      };
    },
    [
      animated,
      percentage,
    ]
  );

  return (
    <div
      className={className}
    >
      {label ||
      showValue ? (
        <div className="mb-2 flex items-center justify-between gap-4">
          {label ? (
            <p className="text-xs font-bold text-zinc-500">
              {label}
            </p>
          ) : (
            <span />
          )}

          {showValue ? (
            <p className="text-xs font-black text-zinc-300">
              {Math.round(
                percentage
              )}
              %
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        className={[
          "relative overflow-hidden rounded-full bg-white/[0.06]",
          heightClasses[
            height
          ],
        ].join(" ")}
        role="progressbar"
        aria-label={
          label ??
          "Progress"
        }
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={
          Math.max(
            0,
            Math.min(
              safeMax,
              value
            )
          )
        }
      >
        <div
          className={[
            "relative h-full rounded-full bg-gradient-to-r",
            toneClasses[
              tone
            ],
            animated
              ? "transition-[width] duration-700 ease-out motion-reduce:transition-none"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            width:
              `${renderedPercentage}%`,
          }}
        >
          {pulse ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-pulse bg-white/20 motion-reduce:animate-none"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
