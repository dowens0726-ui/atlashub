import type { ReactNode } from "react";

type MapWorldProps = {
  children: ReactNode;
};

export default function MapWorld({
  children,
}: MapWorldProps) {
  return (
    <div
      className="relative"
      style={{
        width: "3000px",
        height: "3000px",
      }}
    >
      {children}
    </div>
  );
}