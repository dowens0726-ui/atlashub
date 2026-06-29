import type { SortOption } from "../../types/discovery";

type SortDropdownProps = {
  label?: string;
  value: string;
  options: SortOption[];
  onChange: (value: string) => void;
};

export default function SortDropdown({
  label = "Sort by",
  value,
  options,
  onChange,
}: SortDropdownProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-zinc-400">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white focus:border-emerald-400 focus:outline-none"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-zinc-900 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}