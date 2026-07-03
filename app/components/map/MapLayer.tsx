import type { ReactNode } from "react";

type MapLayerProps = {
  children: ReactNode;
};

export default function MapLayer({
  children,
}: MapLayerProps) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2937,_#09090b)]" />

      {children}
    </>
  );
}