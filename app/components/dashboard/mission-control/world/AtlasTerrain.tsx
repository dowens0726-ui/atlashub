export default function AtlasTerrain() {
  return (
    <div
      aria-hidden="true"
      className="atlas-coastal-terrain"
    >
      <div className="atlas-coastal-terrain__mountains atlas-coastal-terrain__mountains--rear" />
      <div className="atlas-coastal-terrain__mountains atlas-coastal-terrain__mountains--middle" />
      <div className="atlas-coastal-terrain__ridge atlas-coastal-terrain__ridge--west" />
      <div className="atlas-coastal-terrain__ridge atlas-coastal-terrain__ridge--east" />
      <div className="atlas-coastal-terrain__horizon-haze" />
    </div>
  );
}
