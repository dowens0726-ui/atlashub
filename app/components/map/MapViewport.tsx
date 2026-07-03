"use client";

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
  children: React.ReactNode;
};

export default function MapViewport({
  position,
  scale,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
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
    >
      <div
        className="absolute inset-0 origin-center"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2937,_#09090b)]" />

        {children}
      </div>
    </div>
  );
}