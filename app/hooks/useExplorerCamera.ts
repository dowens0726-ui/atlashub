"use client";

import { useCallback } from "react";

type Position = {
  x: number;
  y: number;
};

type CameraApi = {
  position: Position;
  scale: number;
  setPosition: (position: Position) => void;
  setScale: (scale: number) => void;
};

export function useExplorerCamera({
  position,
  scale,
  setPosition,
  setScale,
}: CameraApi) {
  const center = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  }, [setPosition, setScale]);

  const flyTo = useCallback(
    (x: number, y: number) => {
      setPosition({ x, y });
    },
    [setPosition]
  );

  const zoomTo = useCallback(
    (nextScale: number) => {
      setScale(nextScale);
    },
    [setScale]
  );

  return {
    center,
    flyTo,
    zoomTo,
  };
}