"use client";

type MapViewportProps = {
  position: {
    x: number;
    y: number;
  };
  scale: number;
  children: React.ReactNode;
};

export default function MapViewport({
  position,
  scale,
  children,
}: MapViewportProps) {
  return (
    <div
      className="absolute inset-0 z-0 origin-center"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2937,_#09090b)]" />

      {children}
    </div>
  );
}