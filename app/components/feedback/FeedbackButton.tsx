"use client";

export default function FeedbackButton() {
  return (
    <button
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-zinc-950 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-emerald-400 active:scale-95"
    >
      <span>💬</span>
      Feedback
    </button>
  );
}