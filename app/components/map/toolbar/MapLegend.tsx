type MapLegendProps = {
  counts: {
    missions: number;
    vehicles: number;
    weapons: number;
  };
};

export default function MapLegend({ counts }: MapLegendProps) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-zinc-400">
      <div>🎯 {counts.missions}</div>
      <div>🚗 {counts.vehicles}</div>
      <div>🔫 {counts.weapons}</div>
    </div>
  );
}