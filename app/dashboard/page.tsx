import { DashboardClient } from "@/app/components/dashboard";
import { AtlasAppShell } from "@/app/components/layout";

export default function DashboardPage() {
  return (
    <AtlasAppShell>
      <DashboardClient />
    </AtlasAppShell>
  );
}