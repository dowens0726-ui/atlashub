type MissionUnlocksProps = {
  unlocks?: string[];
};

export default function MissionUnlocks({ unlocks }: MissionUnlocksProps) {
  if (!unlocks || unlocks.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">Unlocks</h2>

      <div className="mt-4 flex flex-wrap gap-3">
        {unlocks.map((unlock) => (
          <span
            key={unlock}
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
          >
            {unlock}
          </span>
        ))}
      </div>
    </section>
  );
}