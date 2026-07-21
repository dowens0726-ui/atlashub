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
        className="atlas-hero-scene__environment pointer-events-none absolute inset-0"
      >
        <div className="atlas-hero-scene__sky absolute inset-0" />

        <div className="atlas-hero-scene__grid absolute inset-0" />

        <div className="atlas-hero-scene__horizon absolute inset-x-0 top-[46%]" />

        <div className="atlas-hero-scene__scan absolute inset-0" />

        <div className="atlas-hero-scene__vignette absolute inset-0" />

        <div className="atlas-hero-scene__top-light absolute inset-x-12 top-0 h-px" />
      </div>

      <div className="atlas-hero-scene__desktop-layout relative z-10">
        <AtlasFloatingHud
          signals={hudSignals}
          placement="left"
        />

        <div className="atlas-hero-scene__content min-w-0">
          {children}
        </div>

        <AtlasFloatingHud
          signals={hudSignals}
          placement="right"
        />
      </div>

      <div className="atlas-hero-scene__compact-layout relative z-10">
        <AtlasFloatingHud
          signals={hudSignals}
          placement="compact"
        />

        <div className="atlas-hero-scene__content min-w-0">
          {children}
        </div>
      </div>
    </section>
  );
}
