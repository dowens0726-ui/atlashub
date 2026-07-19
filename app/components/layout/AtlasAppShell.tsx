import type { ReactNode } from "react";

import AtlasSidebar from "./AtlasSidebar";
import AtlasTopBar from "./AtlasTopBar";

type AtlasAppShellProps = {
  children: ReactNode;
};

export default function AtlasAppShell({
  children,
}: AtlasAppShellProps) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="sticky top-0 hidden h-screen shrink-0 lg:block">
        <AtlasSidebar />
      </div>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AtlasTopBar />

        <main className="relative flex-1 overflow-hidden bg-zinc-950">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.07),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_30%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]"
          />

          <div className="relative mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}