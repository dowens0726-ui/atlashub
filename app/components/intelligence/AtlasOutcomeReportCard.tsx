"use client";

import {
  useState,
  type FormEvent,
} from "react";

import Button from "@/app/components/ui/Button";

import type {
  AtlasOutcome,
  AtlasPlayerAction,
  OutcomeRating,
} from "@/app/intelligence";

import {
  reportAtlasOutcome,
} from "@/app/services";


type AtlasOutcomeReportCardProps = {
  action: AtlasPlayerAction;

  onReported?: (
    outcome: AtlasOutcome
  ) => void;
};


type OutcomeFormState = {
  rating: OutcomeRating;

  incomeChange: string;

  completionHours: string;

  completionMinutes: string;

  empireScoreChange: string;

  notes: string;
};


type FormMessage = {
  type: "success" | "error";

  text: string;
};


const initialFormState:
  OutcomeFormState = {
    rating: "positive",

    incomeChange: "0",

    completionHours: "0",

    completionMinutes: "0",

    empireScoreChange: "0",

    notes: "",
  };


function parseNumericInput(
  value: string
): number {
  const parsedValue =
    Number(value);

  return Number.isFinite(
    parsedValue
  )
    ? parsedValue
    : 0;
}


function buildCompletionTimeMinutes(
  hours: string,
  minutes: string
): number {
  const normalizedHours =
    Math.max(
      0,
      Math.floor(
        parseNumericInput(
          hours
        )
      )
    );

  const normalizedMinutes =
    Math.max(
      0,
      Math.floor(
        parseNumericInput(
          minutes
        )
      )
    );

  return (
    normalizedHours * 60 +
    normalizedMinutes
  );
}


export default function AtlasOutcomeReportCard({
  action,
  onReported,
}: AtlasOutcomeReportCardProps) {
  const [
    form,
    setForm,
  ] = useState<OutcomeFormState>(
    initialFormState
  );

  const [
    message,
    setMessage,
  ] = useState<FormMessage | null>(
    null
  );


  function updateField<
    Key extends keyof OutcomeFormState,
  >(
    field: Key,
    value: OutcomeFormState[Key]
  ) {
    setForm(
      (currentForm) => ({
        ...currentForm,

        [field]:
          value,
      })
    );
  }


  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage(null);

    const completionTimeMinutes =
      buildCompletionTimeMinutes(
        form.completionHours,
        form.completionMinutes
      );

    const result =
      reportAtlasOutcome({
        actionId:
          action.id,

        rating:
          form.rating,

        incomeChange:
          Math.round(
            parseNumericInput(
              form.incomeChange
            )
          ),

        empireScoreChange:
          Math.round(
            parseNumericInput(
              form.empireScoreChange
            )
          ),

        completionTimeMinutes:
          completionTimeMinutes > 0
            ? completionTimeMinutes
            : undefined,

        notes:
          form.notes,
      });

    if (!result.ok) {
      setMessage({
        type:
          "error",

        text:
          result.message,
      });

      return;
    }

    setMessage({
      type:
        "success",

      text:
        "Outcome saved. Atlas has added this result to your learning history.",
    });

    onReported?.(
      result.data.outcome
    );
  }


  return (
    <section className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
        Report Outcome
      </p>

      <h3 className="mt-3 text-xl font-black text-white">
        How did this strategy perform?
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Atlas will use your confirmed result to improve future recommendations.
      </p>


      <form
        className="mt-6 space-y-6"
        onSubmit={
          handleSubmit
        }
      >
        <fieldset>
          <legend className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Result
          </legend>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <RatingOption
              checked={
                form.rating ===
                "positive"
              }
              label="Successful"
              value="positive"
              onChange={(
                value
              ) =>
                updateField(
                  "rating",
                  value
                )
              }
            />

            <RatingOption
              checked={
                form.rating ===
                "neutral"
              }
              label="Neutral"
              value="neutral"
              onChange={(
                value
              ) =>
                updateField(
                  "rating",
                  value
                )
              }
            />

            <RatingOption
              checked={
                form.rating ===
                "negative"
              }
              label="Failed"
              value="negative"
              onChange={(
                value
              ) =>
                updateField(
                  "rating",
                  value
                )
              }
            />
          </div>
        </fieldset>


        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Income Change"
            hint="Use a negative number for a loss."
          >
            <input
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              inputMode="numeric"
              name="incomeChange"
              step="1"
              type="number"
              value={
                form.incomeChange
              }
              onChange={(
                event
              ) =>
                updateField(
                  "incomeChange",
                  event.target.value
                )
              }
            />
          </FormField>

          <FormField
            label="Empire Score Change"
            hint="Use a negative number for a decrease."
          >
            <input
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              inputMode="numeric"
              name="empireScoreChange"
              step="1"
              type="number"
              value={
                form.empireScoreChange
              }
              onChange={(
                event
              ) =>
                updateField(
                  "empireScoreChange",
                  event.target.value
                )
              }
            />
          </FormField>
        </div>


        <fieldset>
          <legend className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Time Spent
          </legend>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <FormField
              label="Hours"
            >
              <input
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                inputMode="numeric"
                min="0"
                name="completionHours"
                step="1"
                type="number"
                value={
                  form.completionHours
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "completionHours",
                    event.target.value
                  )
                }
              />
            </FormField>

            <FormField
              label="Minutes"
            >
              <input
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                inputMode="numeric"
                min="0"
                name="completionMinutes"
                step="1"
                type="number"
                value={
                  form.completionMinutes
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "completionMinutes",
                    event.target.value
                  )
                }
              />
            </FormField>
          </div>
        </fieldset>


        <FormField
          label="Notes"
          hint="Optional details about what worked, failed, or changed."
        >
          <textarea
            className="mt-2 min-h-28 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
            maxLength={500}
            name="notes"
            value={
              form.notes
            }
            onChange={(
              event
            ) =>
              updateField(
                "notes",
                event.target.value
              )
            }
          />
        </FormField>


        <div>
          <Button
            type="submit"
          >
            Submit Outcome
          </Button>
        </div>


        {message ? (
          <p
            aria-live="polite"
            className={`text-sm font-semibold ${
              message.type ===
              "success"
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        ) : null}
      </form>
    </section>
  );
}


function RatingOption({
  checked,
  label,
  value,
  onChange,
}: {
  checked: boolean;

  label: string;

  value: OutcomeRating;

  onChange: (
    value: OutcomeRating
  ) => void;
}) {
  return (
    <label
      className={`cursor-pointer rounded-xl border p-4 text-sm font-bold transition ${
        checked
          ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
          : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600"
      }`}
    >
      <input
        checked={
          checked
        }
        className="sr-only"
        name="rating"
        type="radio"
        value={
          value
        }
        onChange={() =>
          onChange(
            value
          )
        }
      />

      {label}
    </label>
  );
}


function FormField({
  label,
  hint,
  children,
}: {
  label: string;

  hint?: string;

  children:
    React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </span>

      {hint ? (
        <span className="mt-1 block text-xs text-zinc-500">
          {hint}
        </span>
      ) : null}

      {children}
    </label>
  );
}