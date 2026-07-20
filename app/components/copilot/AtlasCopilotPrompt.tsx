"use client";

import {
  type FormEvent,
  useState,
} from "react";


type AtlasCopilotPromptProps = {
  onSubmit:
    (
      prompt:
        string
    ) => void;

  disabled?:
    boolean;

  initialValue?:
    string;
};


export default function AtlasCopilotPrompt({
  onSubmit,
  disabled = false,
  initialValue = "",
}: AtlasCopilotPromptProps) {
  const [
    prompt,
    setPrompt,
  ] =
    useState(
      initialValue
    );


  function handleSubmit(
    event:
      FormEvent<HTMLFormElement>
  ): void {
    event.preventDefault();

    const normalizedPrompt =
      prompt.trim();

    if (
      disabled ||
      normalizedPrompt.length ===
        0
    ) {
      return;
    }

    onSubmit(
      normalizedPrompt
    );

    setPrompt("");
  }


  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="rounded-3xl border border-white/10 bg-zinc-950/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <label
        htmlFor="atlas-copilot-prompt"
        className="sr-only"
      >
        Ask Atlas Copilot
      </label>

      <textarea
        id="atlas-copilot-prompt"
        value={
          prompt
        }
        disabled={
          disabled
        }
        rows={3}
        placeholder="Ask Atlas about your empire, investments, vehicles, businesses, or next session..."
        onChange={(
          event
        ) => {
          setPrompt(
            event.target
              .value
          );
        }}
        onKeyDown={(
          event
        ) => {
          if (
            event.key ===
              "Enter" &&
            !event.shiftKey
          ) {
            event.preventDefault();

            event.currentTarget
              .form
              ?.requestSubmit();
          }
        }}
        className={[
          "w-full resize-none rounded-2xl border border-transparent bg-transparent px-3 py-3",
          "text-sm leading-7 text-white placeholder:text-zinc-600 sm:text-base",
          "outline-none transition",
          "focus:border-cyan-400/15 focus:bg-white/[0.02]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        ].join(" ")}
      />

      <div className="flex flex-col gap-3 border-t border-white/5 px-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-zinc-600">
          Press Enter to send.
          Use Shift + Enter
          for a new line.
        </p>

        <button
          type="submit"
          disabled={
            disabled ||
            prompt.trim()
              .length ===
              0
          }
          className={[
            "inline-flex min-h-11 items-center justify-center rounded-2xl px-5",
            "bg-cyan-300 text-sm font-black text-zinc-950",
            "transition-all duration-200",
            "hover:bg-cyan-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
            "disabled:cursor-not-allowed disabled:opacity-40",
          ].join(" ")}
        >
          Send Command
        </button>
      </div>
    </form>
  );
}