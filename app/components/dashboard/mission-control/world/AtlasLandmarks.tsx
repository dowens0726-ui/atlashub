export default function AtlasLandmarks() {
  return (
    <div
      aria-hidden="true"
      className="atlas-coastal-landmarks"
    >
      <div className="atlas-coastal-landmark atlas-coastal-landmark--observation">
        <span className="atlas-coastal-landmark__observation-crown" />
        <span className="atlas-coastal-landmark__observation-body" />
      </div>

      <div className="atlas-coastal-landmark atlas-coastal-landmark--stadium">
        <span className="atlas-coastal-landmark__stadium-roof" />
        <span className="atlas-coastal-landmark__stadium-bowl" />
      </div>

      <div className="atlas-coastal-landmark atlas-coastal-landmark--wheel">
        <span className="atlas-coastal-landmark__wheel-ring" />
        <span className="atlas-coastal-landmark__wheel-hub" />
        <span className="atlas-coastal-landmark__wheel-support atlas-coastal-landmark__wheel-support--left" />
        <span className="atlas-coastal-landmark__wheel-support atlas-coastal-landmark__wheel-support--right" />
      </div>

      <div className="atlas-coastal-landmark atlas-coastal-landmark--port">
        <span className="atlas-coastal-landmark__crane atlas-coastal-landmark__crane--one" />
        <span className="atlas-coastal-landmark__crane atlas-coastal-landmark__crane--two" />
        <span className="atlas-coastal-landmark__crane atlas-coastal-landmark__crane--three" />
      </div>

      <div className="atlas-coastal-landmark atlas-coastal-landmark--bridge">
        <span className="atlas-coastal-landmark__bridge-deck" />
        <span className="atlas-coastal-landmark__bridge-tower atlas-coastal-landmark__bridge-tower--left" />
        <span className="atlas-coastal-landmark__bridge-tower atlas-coastal-landmark__bridge-tower--right" />
        <span className="atlas-coastal-landmark__bridge-cable atlas-coastal-landmark__bridge-cable--left" />
        <span className="atlas-coastal-landmark__bridge-cable atlas-coastal-landmark__bridge-cable--right" />
      </div>
    </div>
  );
}
