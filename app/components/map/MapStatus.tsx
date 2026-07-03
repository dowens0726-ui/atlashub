type MapStatusProps = {
  scale: number;
  markerCount: number;
};

export default function MapStatus({
  scale,
  markerCount,
}: MapStatusProps) {
  return (
    <div className="absolute bottom-4 right-4 z-20 rounded-2xl border border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Atlas Explorer
      </p>

      <div className="mt-2 space-y-1 text-sm">
        <p>
          Markers:{" "}
          <span className="font-semibold text-emerald-400">
            {markerCount}
          </span>
        </p>

        <p>
          Zoom:{" "}
          <span className="font-semibold text-emerald-400">
            {Math.round(scale * 100)}%
          </span>
        </p>
      </div>
    </div>
  );
}