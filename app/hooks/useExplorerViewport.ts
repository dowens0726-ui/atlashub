"use client";

import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 0.1;

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

export function useExplorerViewport() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);

    setDragStart({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;

    setPosition({
      x: event.clientX - dragStart.x,
      y: event.clientY - dragStart.y,
    });
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    event.preventDefault();

    setScale((current) => {
      const next = event.deltaY < 0 ? current + ZOOM_STEP : current - ZOOM_STEP;
      return clampScale(next);
    });
  }

  function zoomIn() {
    setScale((current) => clampScale(current + ZOOM_STEP));
  }

  function zoomOut() {
    setScale((current) => clampScale(current - ZOOM_STEP));
  }

  function resetViewport() {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  }

  return {
    position,
    scale,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
    zoomIn,
    zoomOut,
    resetViewport,
  };
}