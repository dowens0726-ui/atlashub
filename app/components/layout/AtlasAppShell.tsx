import type { ReactNode } from "react";

import { AtlasShellWorld } from "@/app/components/world";

import AtlasSidebar from "./AtlasSidebar";
import AtlasTopBar from "./AtlasTopBar";

type AtlasAppShellProps = {
  children: ReactNode;
};

export default function AtlasAppShell({
  children,
}: AtlasAppShellProps) {
  return (
    <div className="atlas-app-shell relative isolate flex min-h-screen overflow-x-hidden text-white">
      <AtlasShellWorld />

      <div className="relative z-20 sticky top-0 hidden h-screen shrink-0 lg:block">
        <AtlasSidebar />
      </div>

      <div className="relative z-10 flex min-h-screen min-w-0 flex-1 flex-col">
        <AtlasTopBar />

        <main className="atlas-app-shell__main relative flex-1 overflow-hidden">
          <div
            aria-hidden="true"
            className="atlas-app-shell__main-glow pointer-events-none absolute inset-0"
          />

          <div className="relative mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
