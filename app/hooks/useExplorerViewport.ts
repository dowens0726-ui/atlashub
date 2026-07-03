"use client";

import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

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

  return {
    position,
    setPosition,
    scale,
    setScale,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}