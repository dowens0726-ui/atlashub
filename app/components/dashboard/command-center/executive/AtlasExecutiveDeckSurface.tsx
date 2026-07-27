"use client";

import {
  useCallback,
  useRef,
} from "react";

import type {
  CSSProperties,
  PointerEvent,
  ReactNode,
} from "react";


type AtlasExecutiveDeckSurfaceProps = {
  children:
    ReactNode;
};


type AtlasExecutiveDeckStyles =
  CSSProperties & {
    "--atlas-deck-pointer-x":
      string;

    "--atlas-deck-pointer-y":
      string;

    "--atlas-deck-shift-x":
      string;

    "--atlas-deck-shift-y":
      string;
  };


const defaultDeckStyles:
  AtlasExecutiveDeckStyles = {
    "--atlas-deck-pointer-x":
      "50%",

    "--atlas-deck-pointer-y":
      "35%",

    "--atlas-deck-shift-x":
      "0",

    "--atlas-deck-shift-y":
      "0",
  };


export default function AtlasExecutiveDeckSurface({
  children,
}: AtlasExecutiveDeckSurfaceProps) {
  const surfaceRef =
    useRef<
      HTMLDivElement | null
    >(null);


  const handlePointerMove =
    useCallback(
      (
        event:
          PointerEvent<HTMLDivElement>
      ) => {
        const surface =
          surfaceRef.current;

        if (
          !surface ||
          event.pointerType ===
            "touch"
        ) {
          return;
        }

        const bounds =
          surface.getBoundingClientRect();

        const relativeX =
          Math.min(
            1,
            Math.max(
              0,
              (
                event.clientX -
                bounds.left
              ) /
                bounds.width
            )
          );

        const relativeY =
          Math.min(
            1,
            Math.max(
              0,
              (
                event.clientY -
                bounds.top
              ) /
                bounds.height
            )
          );

        surface.style.setProperty(
          "--atlas-deck-pointer-x",
          `${(
            relativeX *
            100
          ).toFixed(2)}%`
        );

        surface.style.setProperty(
          "--atlas-deck-pointer-y",
          `${(
            relativeY *
            100
          ).toFixed(2)}%`
        );

        surface.style.setProperty(
          "--atlas-deck-shift-x",
          (
            relativeX -
            0.5
          ).toFixed(3)
        );

        surface.style.setProperty(
          "--atlas-deck-shift-y",
          (
            relativeY -
            0.5
          ).toFixed(3)
        );
      },
      []
    );


  const handlePointerLeave =
    useCallback(
      () => {
        const surface =
          surfaceRef.current;

        if (
          !surface
        ) {
          return;
        }

        surface.style.setProperty(
          "--atlas-deck-pointer-x",
          "50%"
        );

        surface.style.setProperty(
          "--atlas-deck-pointer-y",
          "35%"
        );

        surface.style.setProperty(
          "--atlas-deck-shift-x",
          "0"
        );

        surface.style.setProperty(
          "--atlas-deck-shift-y",
          "0"
        );
      },
      []
    );


  return (
    <div
      ref={surfaceRef}
      className="atlas-executive-deck-surface"
      style={defaultDeckStyles}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
    >
      <div
        aria-hidden="true"
        className="atlas-executive-deck-surface__aura"
      />

      <div
        aria-hidden="true"
        className="atlas-executive-deck-surface__cursor-light"
      />

      <div
        aria-hidden="true"
        className="atlas-executive-deck-surface__border-wake"
      />

      <div
        aria-hidden="true"
        className="atlas-executive-deck-surface__reflection"
      />

      <div className="atlas-executive-deck-surface__content">
        {children}
      </div>
    </div>
  );
}
