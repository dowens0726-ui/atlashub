type DiscoveryToolbarProps = {
  title: string;
  count: number;
};

export default function DiscoveryToolbar({
  title,
  count,
}: DiscoveryToolbarProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black">{title}</h2>

        <p className="mt-2 text-zinc-400">
          {count} items available
        </p>
      </div>

      <div className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
        Live Database
      </div>
    </div>
  );
}