type GeneratedCodeProps = {
  code: string;
};

export default function GeneratedCode({ code }: GeneratedCodeProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(code);
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-white">Generated Code</h3>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
        >
          Copy
        </button>
      </div>

      <pre className="max-h-[500px] overflow-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}