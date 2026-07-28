import type {
  CSSProperties,
  ReactNode,
} from "react";

import {
  buildAtlasWorldState,
} from "@/app/world";

import type {
  AtlasWorldState,
} from "@/app/world";

import AtlasFloatingHud from "./AtlasFloatingHud";

import {
  AtlasExecutiveViewport,
} from "./viewport";

import {
  AtlasCoastalHeroWorld,
  AtlasGridLayer,
  AtlasParticleLayer,
  AtlasRadarLayer,
} from "./world";

import type {
  AtlasHeroHudSignal,
} from "./atlas-hero.types";


type AtlasHeroSceneProps = {
  children:
    ReactNode;

  hudSignals:
    AtlasHeroHudSignal[];

  worldState?:
    AtlasWorldState;
};


type AtlasWorldSceneStyles =
  CSSProperties & {
    "--atlas-world-sky-brightness":
      number;

    "--atlas-world-skyline-brightness":
      number;

    "--atlas-world-building-lights":
      number;

    "--atlas-world-system-glow":
      number;

    "--atlas-world-caution-glow":
      number;

    "--atlas-world-haze":
      number;

    "--atlas-world-cloud-cover":
      number;

    "--atlas-world-water-shimmer":
      number;

    "--atlas-world-ambient-motion":
      number;
  };


function buildSceneStyles(
  worldState:
    AtlasWorldState
): AtlasWorldSceneStyles {
  return {
    "--atlas-world-sky-brightness":
      worldState.lighting.skyBrightness,

    "--atlas-world-skyline-brightness":
      worldState.lighting.skylineBrightness,

    "--atlas-world-building-lights":
      worldState.lighting.buildingLightIntensity,

    "--atlas-world-system-glow":
      worldState.lighting.systemGlowIntensity,

    "--atlas-world-caution-glow":
      worldState.lighting.cautionGlowIntensity,

    "--atlas-world-haze":
      worldState.atmosphere.haze,

    "--atlas-world-cloud-cover":
      worldState.atmosphere.cloudCover,

    "--atlas-world-water-shimmer":
      worldState.atmosphere.waterShimmer,

    "--atlas-world-ambient-motion":
      worldState.atmosphere.ambientMotion,
  };
}


export default function AtlasHeroScene({
  children,
  hudSignals,
  worldState,
}: AtlasHeroSceneProps) {
  const resolvedWorldState =
    worldState ??
    buildAtlasWorldState({
      empireScore: 50,
      confidence: 65,
      availableCash: 0,
      progressionStage:
        "Developing",
      shouldActNow: false,
    });

  const sceneStyles =
    buildSceneStyles(
      resolvedWorldState
    );

  return (
    <AtlasExecutiveViewport>
      <section
        className="atlas-hero-scene relative isolate overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#020612] shadow-[0_34px_120px_-58px_rgba(34,211,238,0.5)]"
        data-atlas-time-of-day={
          resolvedWorldState.timeOfDay
        }
        data-atlas-weather={
          resolvedWorldState.weather
        }
        data-atlas-city-activity={
          resolvedWorldState.cityActivity
        }
        data-atlas-road-traffic={
          resolvedWorldState.traffic.road
        }
        data-atlas-harbor-traffic={
          resolvedWorldState.traffic.harbor
        }
        data-atlas-air-traffic={
          resolvedWorldState.traffic.air
        }
        style={
          sceneStyles
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        >
          <AtlasCoastalHeroWorld />
        </div>

        <div
          aria-hidden="true"
          className="atlas-hero-scene__environment pointer-events-none absolute inset-0"
        >
          <div className="atlas-camera-layer atlas-camera-layer--city" />

          <div className="atlas-camera-layer atlas-camera-layer--systems">
            <AtlasGridLayer />

            <AtlasRadarLayer />

            <AtlasParticleLayer
              worldState={
                resolvedWorldState
              }
            />

            <div
              className="atlas-hero-scene__grid absolute inset-0"
              style={{
                opacity:
                  Math.max(
                    0.12,
                    resolvedWorldState
                      .lighting
                      .systemGlowIntensity /
                      320
                  ),
              }}
            />

            <div className="atlas-hero-scene__horizon absolute inset-x-0 top-[58%]" />

            <div
              className="atlas-hero-scene__scan absolute inset-0"
              style={{
                opacity:
                  Math.max(
                    0.16,
                    resolvedWorldState
                      .atmosphere
                      .ambientMotion /
                      240
                  ),
              }}
            />
          </div>

          <div className="atlas-camera-layer atlas-camera-layer--optics">
            <div className="atlas-hero-scene__vignette absolute inset-0" />

            <div className="atlas-executive-viewport__reflection atlas-executive-viewport__reflection--primary" />

            <div className="atlas-executive-viewport__reflection atlas-executive-viewport__reflection--secondary" />

            <div
              className="atlas-hero-scene__top-light absolute inset-x-12 top-0 h-px"
              style={{
                opacity:
                  Math.max(
                    0.22,
                    resolvedWorldState
                      .lighting
                      .systemGlowIntensity /
                      130
                  ),
              }}
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(90deg,rgba(2,6,18,0.42),transparent_16%,transparent_84%,rgba(2,6,18,0.42))]"
        />

        <div className="atlas-hero-scene__desktop-layout relative z-10">
          <AtlasFloatingHud
            signals={
              hudSignals
            }
            placement="left"
          />

          <div className="atlas-hero-scene__content min-w-0">
            {children}
          </div>

          <AtlasFloatingHud
            signals={
              hudSignals
            }
            placement="right"
          />
        </div>

        <div className="atlas-hero-scene__compact-layout relative z-10">
          <AtlasFloatingHud
            signals={
              hudSignals
            }
            placement="compact"
          />

          <div className="atlas-hero-scene__content min-w-0">
            {children}
          </div>
        </div>
      </section>
    </AtlasExecutiveViewport>
  );
}

