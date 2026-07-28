export default function AtlasCoastline() {
  return (
    <div
      aria-hidden="true"
      className="atlas-coastal-shore"
    >
      <div className="atlas-coastal-shore__landmass" />
      <div className="atlas-coastal-shore__beach" />
      <div className="atlas-coastal-shore__boulevard">
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--01" />
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--02" />
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--03" />
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--04" />
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--05" />
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--06" />
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--07" />
        <span className="atlas-coastal-shore__light atlas-coastal-shore__light--08" />
      </div>

      <div className="atlas-coastal-shore__marina">
        <span className="atlas-coastal-shore__dock atlas-coastal-shore__dock--one" />
        <span className="atlas-coastal-shore__dock atlas-coastal-shore__dock--two" />
        <span className="atlas-coastal-shore__dock atlas-coastal-shore__dock--three" />

        <span className="atlas-coastal-shore__yacht atlas-coastal-shore__yacht--one" />
        <span className="atlas-coastal-shore__yacht atlas-coastal-shore__yacht--two" />
        <span className="atlas-coastal-shore__yacht atlas-coastal-shore__yacht--three" />
      </div>
    </div>
  );
}
