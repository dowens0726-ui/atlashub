export default function AtlasShellWorld() {
  return (
    <div
      aria-hidden="true"
      className="atlas-shell-world pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="atlas-shell-world__base absolute inset-0" />

      <div className="atlas-world absolute inset-0 overflow-hidden">
        <div className="atlas-world__sun" />

        <div className="atlas-world__clouds atlas-world__clouds--far" />
        <div className="atlas-world__clouds atlas-world__clouds--near" />

        <div className="atlas-world__skyline atlas-world__skyline--far">
          <span className="atlas-building atlas-building--01" />
          <span className="atlas-building atlas-building--02" />
          <span className="atlas-building atlas-building--03" />
          <span className="atlas-building atlas-building--04" />
          <span className="atlas-building atlas-building--05" />
          <span className="atlas-building atlas-building--06" />
          <span className="atlas-building atlas-building--07" />
          <span className="atlas-building atlas-building--08" />
          <span className="atlas-building atlas-building--09" />
          <span className="atlas-building atlas-building--10" />
        </div>

        <div className="atlas-world__skyline atlas-world__skyline--near">
          <span className="atlas-building atlas-building--11" />
          <span className="atlas-building atlas-building--12" />
          <span className="atlas-building atlas-building--13" />
          <span className="atlas-building atlas-building--14" />
          <span className="atlas-building atlas-building--15" />
          <span className="atlas-building atlas-building--16" />
          <span className="atlas-building atlas-building--17" />
          <span className="atlas-building atlas-building--18" />
        </div>

        <div className="atlas-world__palms">
          <span className="atlas-palm atlas-palm--01" />
          <span className="atlas-palm atlas-palm--02" />
          <span className="atlas-palm atlas-palm--03" />
          <span className="atlas-palm atlas-palm--04" />
        </div>

        <div className="atlas-world__water" />
        <div className="atlas-world__reflection" />
        <div className="atlas-world__haze" />
      </div>

      <div className="atlas-shell-world__grid absolute inset-0" />
      <div className="atlas-shell-world__vignette absolute inset-0" />
      <div className="atlas-shell-world__wash absolute inset-0" />
    </div>
  );
}
