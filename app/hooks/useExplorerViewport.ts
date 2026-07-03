"use client";

import { useState } from "react";

export function useExplorerViewport() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  return {
    position,
    setPosition,
    scale,
    setScale,
  };
}