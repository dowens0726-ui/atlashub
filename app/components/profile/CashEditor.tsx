"use client";

import { useEffect, useState } from "react";

type CashEditorProps = {
  value: number;
  onSave: (cash: number) => void;
};

export default function CashEditor({
  value,
  onSave,
}: CashEditorProps) {
  const [cash, setCash] = useState(value.toString());

  useEffect(() => {
    setCash(value.toString());
  }, [value]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const parsed = Number(cash.replace(/,/g, ""));

      if (Number.isFinite(parsed) && parsed >= 0 && parsed !== value) {
        onSave(parsed);
      }
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [cash, value, onSave]);

  return (
    <div className="mt-6 border-t border-zinc-800 pt-6">
      <label className="block text-sm font-semibold text-zinc-300">
        Available Cash
      </label>

      <input
        type="number"
        min={0}
        value={cash}
        onChange={(e) => setCash(e.target.value)}
        className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-amber-400"
      />

      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        Live updating…
      </p>
    </div>
  );
}