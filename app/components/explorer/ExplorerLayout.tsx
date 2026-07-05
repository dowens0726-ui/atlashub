import type { ReactNode } from "react";

type ExplorerLayoutProps = {
  toolbar: ReactNode;
  sidebar: ReactNode;
  canvas: ReactNode;
};

export default function ExplorerLayout({
  toolbar,
  sidebar,
  canvas,
}: ExplorerLayoutProps) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 bg-zinc-900 p-4">
        {toolbar}
      </div>

      <div className="grid min-h-[680px] lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-zinc-800 bg-zinc-950 p-4 lg:border-b-0 lg:border-r">
          {sidebar}
        </aside>

        <div className="relative bg-zinc-900">{canvas}</div>
      </div>
    </div>
  );
}