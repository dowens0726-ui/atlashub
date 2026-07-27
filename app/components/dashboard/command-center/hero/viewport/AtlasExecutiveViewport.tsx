"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";


type AtlasExecutiveViewportProps = {
  children:
    ReactNode;

  className?:
    string;
};


type AtlasExecutiveViewportStyles =
  CSSProperties & {
    "--atlas-camera-x":
      string;

    "--atlas-camera-y":
      string;

    "--atlas-camera-tilt-x":
      string;

    "--atlas-camera-tilt-y":
      string;
  };


const CAMERA_EASING =
  0.075;

const CAMERA_LIMIT_X =
  1;

const CAMERA_LIMIT_Y =
  1;


function clamp(
  value:
    number,
  min:
    number,
  max:
    number
) {
  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}


export default function AtlasExecutiveViewport({
  children,
  className,
}: AtlasExecutiveViewportProps) {
  const frameRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const animationFrameRef =
    useRef<number | null>(
      null
    );

  const currentCameraRef =
    useRef({
      x: 0,
      y: 0,
    });

  const targetCameraRef =
    useRef({
      x: 0,
      y: 0,
    });

  const [
    camera,
    setCamera,
  ] = useState({
    x: 0,
    y: 0,
  });

  const animateCamera =
    useCallback(() => {
      const current =
        currentCameraRef.current;

      const target =
        targetCameraRef.current;

      current.x +=
        (
          target.x -
          current.x
        ) *
        CAMERA_EASING;

      current.y +=
        (
          target.y -
          current.y
        ) *
        CAMERA_EASING;

      if (
        Math.abs(
          current.x -
            target.x
        ) <
          0.001 &&
        Math.abs(
          current.y -
            target.y
        ) <
          0.001
      ) {
        current.x =
          target.x;

        current.y =
          target.y;
      }

      setCamera({
        x:
          current.x,

        y:
          current.y,
      });

      animationFrameRef.current =
        window.requestAnimationFrame(
          animateCamera
        );
    }, []);

  useEffect(() => {
    const reducedMotionQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    if (
      reducedMotionQuery.matches
    ) {
      return;
    }

    animationFrameRef.current =
      window.requestAnimationFrame(
        animateCamera
      );

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [
    animateCamera,
  ]);

  const handlePointerMove =
    (
      event:
        ReactPointerEvent<HTMLDivElement>
    ) => {
      const frame =
        frameRef.current;

      if (
        !frame
      ) {
        return;
      }

      const bounds =
        frame.getBoundingClientRect();

      const normalizedX =
        (
          (
            event.clientX -
            bounds.left
          ) /
            bounds.width
        ) *
          2 -
        1;

      const normalizedY =
        (
          (
            event.clientY -
            bounds.top
          ) /
            bounds.height
        ) *
          2 -
        1;

      targetCameraRef.current = {
        x:
          clamp(
            normalizedX,
            -CAMERA_LIMIT_X,
            CAMERA_LIMIT_X
          ),

        y:
          clamp(
            normalizedY,
            -CAMERA_LIMIT_Y,
            CAMERA_LIMIT_Y
          ),
      };
    };

  const handlePointerLeave =
    () => {
      targetCameraRef.current = {
        x: 0,
        y: 0,
      };
    };

  const viewportStyles:
    AtlasExecutiveViewportStyles = {
      "--atlas-camera-x":
        camera.x.toFixed(
          4
        ),

      "--atlas-camera-y":
        camera.y.toFixed(
          4
        ),

      "--atlas-camera-tilt-x":
        `${(
          camera.y *
          -0.55
        ).toFixed(
          3
        )}deg`,

      "--atlas-camera-tilt-y":
        `${(
          camera.x *
          0.8
        ).toFixed(
          3
        )}deg`,
    };

  return (
    <div
      ref={frameRef}
      className={[
        "atlas-executive-viewport",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onPointerLeave={
        handlePointerLeave
      }
      onPointerMove={
        handlePointerMove
      }
      style={viewportStyles}
    >
      {children}
    </div>
  );
}
