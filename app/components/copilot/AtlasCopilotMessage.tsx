export type AtlasCopilotMessageRole =
  | "atlas"
  | "player"
  | "system";


export type AtlasCopilotMessageModel = {
  id:
    string;

  role:
    AtlasCopilotMessageRole;

  content:
    string;

  label?:
    string;
};


type AtlasCopilotMessageProps = {
  message:
    AtlasCopilotMessageModel;
};


function getMessageAlignment(
  role:
    AtlasCopilotMessageRole
): string {
  if (
    role ===
    "player"
  ) {
    return "justify-end";
  }

  return "justify-start";
}


function getMessageStyles(
  role:
    AtlasCopilotMessageRole
): string {
  switch (
    role
  ) {
    case "player":
      return [
        "border-cyan-400/20",
        "bg-cyan-400/10",
        "text-cyan-50",
      ].join(" ");

    case "system":
      return [
        "border-amber-400/15",
        "bg-amber-400/[0.06]",
        "text-zinc-300",
      ].join(" ");

    case "atlas":
    default:
      return [
        "border-white/10",
        "bg-white/[0.04]",
        "text-zinc-200",
      ].join(" ");
  }
}


function getRoleLabel(
  message:
    AtlasCopilotMessageModel
): string {
  if (
    message.label
  ) {
    return message.label;
  }

  switch (
    message.role
  ) {
    case "player":
      return "Commander";

    case "system":
      return "System";

    case "atlas":
    default:
      return "Atlas";
  }
}


export default function AtlasCopilotMessage({
  message,
}: AtlasCopilotMessageProps) {
  const alignment =
    getMessageAlignment(
      message.role
    );

  const messageStyles =
    getMessageStyles(
      message.role
    );

  const roleLabel =
    getRoleLabel(
      message
    );


  return (
    <div
      className={[
        "flex w-full",
        alignment,
      ].join(" ")}
    >
      <article
        className={[
          "max-w-[90%] rounded-3xl border px-5 py-4 sm:max-w-[80%]",
          messageStyles,
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          {message.role ===
          "atlas" ? (
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]"
            />
          ) : null}

          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {roleLabel}
          </p>
        </div>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 sm:text-base">
          {message.content}
        </p>
      </article>
    </div>
  );
}