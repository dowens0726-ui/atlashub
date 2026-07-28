import {
  DashboardClient,
} from "@/app/components/dashboard";

import {
  AtlasAppShell,
} from "@/app/components/layout";


export default function DashboardPage() {
  return (
    <AtlasAppShell
      world="none"
      variant="executive"
    >
      <DashboardClient />
    </AtlasAppShell>
  );
}
