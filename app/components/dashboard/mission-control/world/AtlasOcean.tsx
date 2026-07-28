export default function AtlasOcean() {
  return (
    <>
      <div
        aria-hidden="true"
        className="atlas-coastal-ocean"
      >
        <div className="atlas-coastal-ocean__depth atlas-coastal-ocean__depth--far" />
        <div className="atlas-coastal-ocean__depth atlas-coastal-ocean__depth--middle" />
        <div className="atlas-coastal-ocean__depth atlas-coastal-ocean__depth--near" />

        <div className="atlas-coastal-ocean__reflection atlas-coastal-ocean__reflection--west" />
        <div className="atlas-coastal-ocean__reflection atlas-coastal-ocean__reflection--core" />
        <div className="atlas-coastal-ocean__reflection atlas-coastal-ocean__reflection--sunset" />

        <div className="atlas-coastal-ocean__wake atlas-coastal-ocean__wake--one" />
        <div className="atlas-coastal-ocean__wake atlas-coastal-ocean__wake--two" />

        <div className="atlas-coastal-ocean__foreground" />
      </div>

      <div
        aria-hidden="true"
        className="atlas-coastal-horizon"
      />
    </>
  );
}
