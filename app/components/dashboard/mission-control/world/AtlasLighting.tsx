import type {
  AtlasWorldConfiguration,
} from "./atlas-world.types";


type AtlasLightingProps = {
  configuration:
    AtlasWorldConfiguration;
};


export default function AtlasLighting({
  configuration,
}: AtlasLightingProps) {
  return (
    <div
      aria-hidden="true"
      className="atlas-world-lighting"
      data-lighting-intensity={
        configuration.intensity
      }
      data-lighting-state={
        configuration.state
      }
    >
      <div className="atlas-world-lighting__ambient" />

      <div className="atlas-world-lighting__horizon" />

      <div className="atlas-world-lighting__core" />

      <div className="atlas-world-lighting__scan" />

      <div className="atlas-world-lighting__alert" />
    </div>
  );
}
