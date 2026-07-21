export default function AtlasSky() {
  return (
    <div className="atlas-v2-sky absolute inset-0">
      <div className="atlas-v2-sky__gradient absolute inset-0" />
      <div className="atlas-v2-sky__sun" />
      <div className="atlas-v2-sky__cloud atlas-v2-sky__cloud--far" />
      <div className="atlas-v2-sky__cloud atlas-v2-sky__cloud--near" />
    </div>
  );
}
