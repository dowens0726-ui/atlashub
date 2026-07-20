"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type AtlasCountUpProps = {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  locale?: string;
};

function easeOutCubic(
  progress: number
) {
  return (
    1 -
    Math.pow(
      1 - progress,
      3
    )
  );
}

export default function AtlasCountUp({
  value,
  duration = 900,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  locale = "en-US",
}: AtlasCountUpProps) {
  const [
    displayedValue,
    setDisplayedValue,
  ] =
    useState(value);

  const previousValueRef =
    useRef(value);

  useEffect(
    () => {
      const mediaQuery =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        );

      if (
        mediaQuery.matches ||
        duration <= 0
      ) {
        setDisplayedValue(value);
        previousValueRef.current =
          value;

        return;
      }

      const startValue =
        previousValueRef.current;

      const difference =
        value - startValue;

      let animationFrame = 0;

      let delayTimer:
        ReturnType<
          typeof setTimeout
        >;

      delayTimer =
        setTimeout(
          () => {
            const startTime =
              performance.now();

            const animate =
              (
                currentTime: number
              ) => {
                const elapsed =
                  currentTime -
                  startTime;

                const progress =
                  Math.min(
                    elapsed /
                      duration,
                    1
                  );

                const easedProgress =
                  easeOutCubic(
                    progress
                  );

                setDisplayedValue(
                  startValue +
                    difference *
                      easedProgress
                );

                if (
                  progress < 1
                ) {
                  animationFrame =
                    requestAnimationFrame(
                      animate
                    );
                }
                else {
                  previousValueRef.current =
                    value;
                }
              };

            animationFrame =
              requestAnimationFrame(
                animate
              );
          },
          delay
        );

      return () => {
        clearTimeout(
          delayTimer
        );

        cancelAnimationFrame(
          animationFrame
        );
      };
    },
    [
      delay,
      duration,
      value,
    ]
  );

  const formattedValue =
    new Intl.NumberFormat(
      locale,
      {
        minimumFractionDigits:
          decimals,

        maximumFractionDigits:
          decimals,
      }
    ).format(
      displayedValue
    );

  return (
    <span
      className={className}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
