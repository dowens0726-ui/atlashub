type AtlasTipsProps = {
  tips?: string[];
};

export default function AtlasTips({ tips }: AtlasTipsProps) {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white">
        Atlas Tips
      </h2>

      <ul className="mt-4 space-y-3">
        {tips.map((tip) => (
          <li
            key={tip}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-300"
          >
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}