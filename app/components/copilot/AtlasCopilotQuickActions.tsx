export type AtlasCopilotQuickAction = {
  id:
    string;

  label:
    string;

  prompt:
    string;

  description:
    string;
};


type AtlasCopilotQuickActionsProps = {
  actions:
    AtlasCopilotQuickAction[];

  onSelect:
    (
      action:
        AtlasCopilotQuickAction
    ) => void;

  disabled?:
    boolean;
};


export default function AtlasCopilotQuickActions({
  actions,
  onSelect,
  disabled = false,
}: AtlasCopilotQuickActionsProps) {
  return (
    <section aria-labelledby="atlas-copilot-quick-actions-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Command Shortcuts
          </p>

          <h2
            id="atlas-copilot-quick-actions-heading"
            className="mt-2 text-lg font-black text-white"
          >
            Ask Atlas to analyze your next move
          </h2>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map(
          (
            action
          ) => (
            <button
              key={
                action.id
              }
              type="button"
              disabled={
                disabled
              }
              onClick={() => {
                onSelect(
                  action
                );
              }}
              className={[
                "group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left",
                "transition-all duration-200",
                "hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
                "disabled:cursor-not-allowed disabled:opacity-50",
              ].join(" ")}
            >
              <p className="font-bold text-white transition-colors group-hover:text-cyan-100">
                {
                  action.label
                }
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-500 transition-colors group-hover:text-zinc-400">
                {
                  action.description
                }
              </p>
            </button>
          )
        )}
      </div>
    </section>
  );
}