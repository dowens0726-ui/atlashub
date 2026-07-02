"use client";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({
  open,
  onClose,
}: CommandPaletteProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
      <div className="mx-auto mt-24 w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white">
            Atlas Command
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Search anything in GTA VI.
          </p>
        </div>
      </div>
    </div>
  );
}