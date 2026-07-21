import AtlasWorldRenderer from "./AtlasWorldRenderer";

export default function AtlasShellWorld() {
  return (
    <div
      aria-hidden="true"
      className="atlas-shell-world pointer-events-none fixed inset-0 overflow-hidden"
    >
      <AtlasWorldRenderer />

      <div className="atlas-shell-world__grid absolute inset-0" />
      <div className="atlas-shell-world__vignette absolute inset-0" />
      <div className="atlas-shell-world__wash absolute inset-0" />
    </div>
  );
}
