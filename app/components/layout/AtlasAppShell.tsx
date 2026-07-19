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
      <AtlasSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AtlasTopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}