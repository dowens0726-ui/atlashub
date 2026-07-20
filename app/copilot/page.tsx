import {
  AtlasCopilotController,
} from "@/app/components/copilot";

import {
  AtlasAppShell,
} from "@/app/components/layout";


export default function CopilotPage() {
  return (
    <AtlasAppShell>
      <AtlasCopilotController />
    </AtlasAppShell>
  );
}
