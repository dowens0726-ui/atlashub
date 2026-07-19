"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type AtlasUserMenuProps = {
  displayName?: string;
  subtitle?: string;
};

function getInitials(displayName: string): string {
  const initials = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "AP";
}

export default function AtlasUserMenu({
  displayName = "Atlas Player",
  subtitle = "Empire online",
}: AtlasUserMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const initials = getInitials(displayName);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={[
          "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 pr-3",
          "text-left transition-all duration-200",
          "hover:border-white/20 hover:bg-white/[0.07]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
        ].join(" ")}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-black text-cyan-200">
          {initials}
        </span>

        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-32 truncate text-sm font-semibold text-white">
            {displayName}
          </span>

          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            />

            {subtitle}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={[
            "hidden text-xs text-zinc-500 transition-transform duration-200 sm:block",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          ▾
        </span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Player menu"
          className={[
            "absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 overflow-hidden rounded-3xl",
            "border border-white/10 bg-zinc-950/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl",
          ].join(" ")}
        >
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-black text-cyan-200">
                {initials}
              </span>

              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white">
                  {displayName}
                </span>

                <span className="mt-0.5 block text-xs text-zinc-500">
                  Atlas identity synchronized
                </span>
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs text-zinc-500">
                System status
              </span>

              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                />

                Operational
              </span>
            </div>
          </div>

          <div className="mt-2 space-y-1">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={[
                "flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-zinc-300",
                "transition-colors hover:bg-white/5 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
              ].join(" ")}
            >
              <span>
                <span className="block font-medium">
                  Player profile
                </span>

                <span className="mt-0.5 block text-xs text-zinc-600">
                  Identity, progress, and preferences
                </span>
              </span>

              <span
                aria-hidden="true"
                className="text-zinc-600"
              >
                ›
              </span>
            </Link>

            <Link
              href="/copilot"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={[
                "flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-zinc-300",
                "transition-colors hover:bg-white/5 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
              ].join(" ")}
            >
              <span>
                <span className="block font-medium">
                  Open AI Copilot
                </span>

                <span className="mt-0.5 block text-xs text-zinc-600">
                  Continue your strategic session
                </span>
              </span>

              <span
                aria-hidden="true"
                className="text-zinc-600"
              >
                ›
              </span>
            </Link>
          </div>

          <div className="mt-2 border-t border-white/5 px-4 py-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-700">
              Atlas AI Gaming OS
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}