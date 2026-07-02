"use client";

import { useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";

type CommandProviderProps = {
  children: React.ReactNode;
};

export default function CommandProvider({ children }: CommandProviderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}