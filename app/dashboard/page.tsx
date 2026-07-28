import {
  DashboardClient,
} from "@/app/components/dashboard";

import {
  AtlasAppShell,
} from "@/app/components/layout";


export default function DashboardPage() {
  return (
    <AtlasAppShell world="none">
      <div
        data-atlas-render-proof="sprint-128-3e"
        style={{
          position: "fixed",
          top: 8,
          left: "50%",
          zIndex: 2147483647,
          transform: "translateX(-50%)",
          padding: "12px 20px",
          border: "4px solid white",
          borderRadius: 10,
          background: "#ff0000",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: "0.08em",
          pointerEvents: "none",
        }}
      >
        DASHBOARD JSX ACTIVE — SPRINT 128.3E
      </div>

      <DashboardClient />
    </AtlasAppShell>
  );
}
