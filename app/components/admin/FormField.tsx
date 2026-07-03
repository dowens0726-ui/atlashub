type FormFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "textarea";
};

export default function FormField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-zinc-300">{label}</span>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400"
        />
      )}
    </label>
  );
}