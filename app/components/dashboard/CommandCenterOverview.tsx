import type {
  DashboardModel,
} from "@/app/services";

import {
  AtlasInstrumentCluster,
} from "./instrument-cluster";

type CommandCenterOverviewProps = {
  dashboard:
    DashboardModel;
};

export default function CommandCenterOverview({
  dashboard,
}: CommandCenterOverviewProps) {
  return (
    <AtlasInstrumentCluster
      dashboard={dashboard}
    />
  );
}