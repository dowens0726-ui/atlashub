"use client";

import { useEffect, useState } from "react";

const GTA_VI_RELEASE_DATE = new Date("2026-11-19T00:00:00").getTime();

export default function ReleaseCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function updateCountdown() {
      const now = Date.now();
      const difference = GTA_VI_RELEASE_DATE - now;

      if (difference <= 0) {
        setTimeLeft("GTA VI is live");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }

    updateCountdown();

    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
  <button
    type="button"
    className="group rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-emerald-400/5 px-4 py-2 transition-all duration-300 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
  >
    <div className="flex items-center gap-3">
      <span className="text-lg">🚀</span>

      <div className="text-left">
        <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">
          GTA VI
        </div>

        <div className="font-semibold text-white">
          {timeLeft}
        </div>
      </div>
    </div>
  </button>
);
}