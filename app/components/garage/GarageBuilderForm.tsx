"use client";

import { useState } from "react";
import {
  buildGarage,
  type GaragePlayStyle,
} from "@/app/services/garage-builder.service";
import GarageResults from "./GarageResults";

const playStyles: { label: string; value: GaragePlayStyle }[] = [
  { label: "Balanced", value: "balanced" },
  { label: "Racing", value: "racing" },
  { label: "Missions", value: "missions" },
  { label: "Beginner", value: "beginner" },
];

export default function GarageBuilderForm() {
  const [budget, setBudget] = useState("2500000");
  const [playStyle, setPlayStyle] = useState<GaragePlayStyle>("balanced");

  const numericBudget = Number(budget) || 0;
  const build = buildGarage(numericBudget, playStyle);

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Atlas Intelligence
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          Build Your Garage
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Enter your budget and play style. Atlas will recommend vehicles using
          Atlas Score, value, performance, and usability.
        </p>

        <label className="mt-6 block">
          <span className="text-sm font-semibold text-zinc-300">
            Budget
          </span>

          <input
            type="number"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            min={0}
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-amber-400"
          />
        </label>

        <div className="mt-6">
          <p className="text-sm font-semibold text-zinc-300">Play Style</p>

          <div className="mt-3 grid gap-3">
            {playStyles.map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => setPlayStyle(style.value)}
                className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                  playStyle === style.value
                    ? "border-amber-400 bg-amber-400 text-zinc-950"
                    : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-amber-400"
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <GarageResults build={build} />
    </div>
  );
}