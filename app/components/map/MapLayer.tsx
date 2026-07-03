import type { ReactNode } from "react";

import {
  BackgroundLayer,
  GridLayer,
} from "./layers";

type MapLayerProps = {
  children: ReactNode;
};

export default function MapLayer({
  children,
}: MapLayerProps) {
  return (
    <>
      <BackgroundLayer />

      <GridLayer />

      {children}
    </>
  );
}