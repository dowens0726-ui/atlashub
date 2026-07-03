"use client";

import MapLayer from "./MapLayer";

type MapViewportProps = {
  position: {
    x: number;
    y: number;
  };
  scale: number;
  isDragging: boolean;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  onReset: () => void;
  children: React.ReactNode;
};

export default function MapViewport({
  position,
  scale,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onWheel,
  onReset,
  children,
}: MapViewportProps) {
  return (
    <div
      className={`absolute inset-0 z-0 touch-none select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      onDoubleClick={onReset}
    >
      <div
        className="absolute inset-0 origin-center transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        <MapLayer>{children}</MapLayer>
      </div>
    </div>
  );
}