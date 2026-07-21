import type {
  ReactNode,
} from "react";

import AtlasFloatingHud from "./AtlasFloatingHud";

import type {
  AtlasHeroHudSignal,
} from "./atlas-hero.types";


type AtlasHeroSceneProps = {
  children:
    ReactNode;

  hudSignals:
    AtlasHeroHudSignal[];
};


export default function AtlasHeroScene({
  children,
  hudSignals,
}: AtlasHeroSceneProps) {
  return (
    <section className="atlas-hero-scene relative isolate overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-black/35 shadow-[0_34px_120px_-58px_rgba(34,211,238,0.5)]">
      <div
        aria-hidden="true"
        className="atlas-hero-scene__sky pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="atlas-hero-scene__grid pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="atlas-hero-scene__horizon pointer-events-none absolute inset-x-0 top-[48%]"
      />

      <div
        aria-hidden="true"
        className="atlas-hero-scene__scan pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="atlas-hero-scene__vignette pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
      />

      <AtlasFloatingHud
        signals={
          hudSignals
        }
      />

      <div className="atlas-hero-scene__content relative z-10">
        {children}
      </div>
    </section>
  );
}