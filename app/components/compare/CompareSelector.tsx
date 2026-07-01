"use client";

type Option = {
  label: string;
  value: string;
};

type CompareSelectorProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function CompareSelector({
  value,
  options,
  onChange,
}: CompareSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
        Compare Against
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}