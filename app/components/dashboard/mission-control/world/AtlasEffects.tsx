export default function AtlasEffects() {
  return (
    <>
      <div
        aria-hidden="true"
        className="atlas-mission-environment__grid"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__radar atlas-mission-environment__radar--primary"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__radar atlas-mission-environment__radar--secondary"
      />

      <div
        aria-hidden="true"
        className="atlas-world-aircraft atlas-world-aircraft--primary"
      >
        <span />
      </div>

      <div
        aria-hidden="true"
        className="atlas-world-aircraft atlas-world-aircraft--secondary"
      >
        <span />
      </div>

      <div
        aria-hidden="true"
        className="atlas-mission-environment__signal atlas-mission-environment__signal--left"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__signal atlas-mission-environment__signal--right"
      />

      <div
        aria-hidden="true"
        className="atlas-world-glass-reflection"
      />

      <div
        aria-hidden="true"
        className="atlas-mission-environment__vignette"
      />
    </>
  );
}
