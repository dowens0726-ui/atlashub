"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayerProfile } from "@/app/hooks/usePlayerProfile";

type AtlasStatusCardProps = {
  lastUpdated?: string;
};

export default function AtlasStatusCard({
  lastUpdated = "Just now",
}: AtlasStatusCardProps) {
  const { profile } = usePlayerProfile();

  const previousProfile = useRef(JSON.stringify(profile));
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const currentProfile = JSON.stringify(profile);

    if (currentProfile !== previousProfile.current) {
      previousProfile.current = currentProfile;

      setAnalyzing(true);

      const timeout = window.setTimeout(() => {
        setAnalyzing(false);
      }, 600);

      return () => window.clearTimeout(timeout);
    }
  }, [profile]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 p-6">
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          analyzing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-cyan-400/10 to-transparent" />
      </div>

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
            Atlas Status
          </p>

          <h2 className="mt-3 text-3xl font-black text-white transition-all duration-300">
            {analyzing ? "🧠 Analyzing Empire..." : "🟢 Atlas Online"}
          </h2>

          <p className="mt-3 text-zinc-400">
            {analyzing
              ? "Reviewing businesses, finances, and progression..."
              : `Last analysis: ${lastUpdated}`}
          </p>
        </div>

        <div
          className={`h-4 w-4 rounded-full transition-all duration-300 ${
            analyzing
              ? "animate-pulse bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,.7)]"
              : "bg-emerald-400 shadow-[0_0_15px_rgba(74,222,128,.6)]"
          }`}
        />
      </div>
    </section>
  );
}