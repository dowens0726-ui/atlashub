import type { Vehicle } from "../../types/vehicle";

type AtlasVerdictProps = {
  left: Vehicle;
  right: Vehicle;
};

export default function AtlasVerdict({ left, right }: AtlasVerdictProps) {
  const leftWins = [
    left.price < right.price,
    left.topSpeed > right.topSpeed,
    left.acceleration > right.acceleration,
    left.handling > right.handling,
    left.braking > right.braking,
  ].filter(Boolean).length;

  const rightWins = [
    right.price < left.price,
    right.topSpeed > left.topSpeed,
    right.acceleration > left.acceleration,
    right.handling > left.handling,
    right.braking > left.braking,
  ].filter(Boolean).length;

  const winner =
    leftWins === rightWins ? "Tie" : leftWins > rightWins ? left.name : right.name;

  return (
    <section className="mt-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8">
      <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
        🏆 Atlas Verdict
      </p>

      <h2 className="mt-3 text-3xl font-black">
        {winner === "Tie" ? "This comparison is a tie" : `${winner} wins`}
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
  <div>
    <h3 className="font-bold text-emerald-400">
      {left.name}
    </h3>

    <ul className="mt-3 space-y-2 text-zinc-300">
      {left.price < right.price && <li>✔ Better Price</li>}
      {left.topSpeed > right.topSpeed && <li>✔ Faster</li>}
      {left.acceleration > right.acceleration && <li>✔ Better Acceleration</li>}
      {left.handling > right.handling && <li>✔ Better Handling</li>}
      {left.braking > right.braking && <li>✔ Better Braking</li>}
    </ul>
  </div>

  <div>
    <h3 className="font-bold text-emerald-400">
      {right.name}
    </h3>

    <ul className="mt-3 space-y-2 text-zinc-300">
      {right.price < left.price && <li>✔ Better Price</li>}
      {right.topSpeed > left.topSpeed && <li>✔ Faster</li>}
      {right.acceleration > left.acceleration && <li>✔ Better Acceleration</li>}
      {right.handling > left.handling && <li>✔ Better Handling</li>}
      {right.braking > left.braking && <li>✔ Better Braking</li>}
    </ul>
  </div>
</div>
    </section>
  );
}