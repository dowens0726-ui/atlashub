export default function AtlasOcean() {
  return (
    <>
      <div
        aria-hidden="true"
        className="atlas-world-water"
      >
        <div className="atlas-world-water__reflection atlas-world-water__reflection--cyan" />

        <div className="atlas-world-water__reflection atlas-world-water__reflection--violet" />

        <div className="atlas-world-water__reflection atlas-world-water__reflection--sunset" />
      </div>

      <div
        aria-hidden="true"
        className="atlas-mission-environment__horizon"
      />
    </>
  );
}
