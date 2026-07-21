export default function AtlasAtmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="atlas-world-haze atlas-world-haze--rear"
      />

      <div
        aria-hidden="true"
        className="atlas-world-particles"
      />

      <div
        aria-hidden="true"
        className="atlas-world-haze atlas-world-haze--front"
      />
    </>
  );
}
