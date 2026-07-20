"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  CSSProperties,
  ReactNode,
} from "react";

export type AtlasRevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none";

type AtlasRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: AtlasRevealDirection;
  once?: boolean;
  threshold?: number;
};

const directionTransforms: Record<
  AtlasRevealDirection,
  (
    distance: number
  ) => string
> = {
  up: (distance) =>
    `translate3d(0, ${distance}px, 0)`,

  down: (distance) =>
    `translate3d(0, -${distance}px, 0)`,

  left: (distance) =>
    `translate3d(${distance}px, 0, 0)`,

  right: (distance) =>
    `translate3d(-${distance}px, 0, 0)`,

  none: () =>
    "translate3d(0, 0, 0)",
};

export default function AtlasReveal({
  children,
  className = "",
  delay = 0,
  duration = 600,
  distance = 24,
  direction = "up",
  once = true,
  threshold = 0.12,
}: AtlasRevealProps) {
  const elementRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    isVisible,
    setIsVisible,
  ] =
    useState(false);

  const [
    prefersReducedMotion,
    setPrefersReducedMotion,
  ] =
    useState(false);

  useEffect(
    () => {
      const mediaQuery =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        );

      const updatePreference =
        () => {
          setPrefersReducedMotion(
            mediaQuery.matches
          );
        };

      updatePreference();

      mediaQuery.addEventListener(
        "change",
        updatePreference
      );

      return () => {
        mediaQuery.removeEventListener(
          "change",
          updatePreference
        );
      };
    },
    []
  );

  useEffect(
    () => {
      const element =
        elementRef.current;

      if (!element) {
        return;
      }

      if (
        prefersReducedMotion
      ) {
        setIsVisible(true);
        return;
      }

      const observer =
        new IntersectionObserver(
          ([entry]) => {
            if (
              entry.isIntersecting
            ) {
              setIsVisible(true);

              if (once) {
                observer.unobserve(
                  entry.target
                );
              }
            }
            else if (!once) {
              setIsVisible(false);
            }
          },
          {
            threshold,
          }
        );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    },
    [
      once,
      prefersReducedMotion,
      threshold,
    ]
  );

  const hiddenTransform =
    directionTransforms[
      direction
    ](
      distance
    );

  const style: CSSProperties =
    prefersReducedMotion
      ? {}
      : {
          opacity:
            isVisible
              ? 1
              : 0,

          transform:
            isVisible
              ? "translate3d(0, 0, 0)"
              : hiddenTransform,

          transitionProperty:
            "opacity, transform",

          transitionDuration:
            `${duration}ms`,

          transitionDelay:
            `${delay}ms`,

          transitionTimingFunction:
            "cubic-bezier(0.22, 1, 0.36, 1)",

          willChange:
            isVisible
              ? "auto"
              : "opacity, transform",
        };

  return (
    <div
      ref={elementRef}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
