import AtlasOperationsSection from "./AtlasOperationsSection";
import AtlasQuickActions, {
  type AtlasQuickAction,
} from "./AtlasQuickActions";
import AtlasRecentEvents, {
  type AtlasRecentEvent,
} from "./AtlasRecentEvents";
import AtlasStatusItem, {
  type AtlasStatusTone,
} from "./AtlasStatusItem";

export type AtlasOperationStatus = {
  id: string;
  label: string;
  value: string;
  detail?: string;
  tone?: AtlasStatusTone;
  progress?: number;
  pulse?: boolean;
};

type AtlasOperationsSidebarProps = {
  statuses: AtlasOperationStatus[];
  quickActions?: AtlasQuickAction[];
  recentEvents?: AtlasRecentEvent[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

const defaultQuickActions: AtlasQuickAction[] = [
  {
    label: "Open Copilot",
    href: "/copilot",
    description: "Ask Atlas for strategic guidance",
    badge: "AI",
  },
  {
    label: "Review Planner",
    href: "/planner",
    description: "Build the next operating session",
  },
  {
    label: "Explore Businesses",
    href: "/data/businesses",
    description: "Evaluate expansion opportunities",
  },
  {
    label: "Compare Vehicles",
    href: "/compare",
    description: "Analyze mission-ready options",
  },
];

export default function AtlasOperationsSidebar({
  statuses,
  quickActions = defaultQuickActions,
  recentEvents = [],
  eyebrow = "Live operating context",
  title = "Atlas Operations",
  subtitle = "Persistent intelligence for the active command session.",
  className = "",
}: AtlasOperationsSidebarProps) {
  return (
    <aside
      aria-label="Atlas operations"
      className={[
        "relative overflow-hidden rounded-[1.8rem]",
        "border border-white/[0.09]",
        "bg-[linear-gradient(180deg,rgba(5,13,23,0.92),rgba(3,8,15,0.78))]",
        "p-3 shadow-[0_30px_90px_rgba(0,0,0,0.3)]",
        "backdrop-blur-2xl",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.1),transparent_34%),radial-gradient(circle_at_100%_35%,rgba(168,85,247,0.07),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent"
      />

      <div className="relative z-10 space-y-3">
        <header className="px-2 pb-1 pt-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-45" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,0.75)]" />
            </span>

            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-cyan-100/55">
              {eyebrow}
            </p>
          </div>

          <h2 className="mt-3 text-sm font-semibold uppercase tracking-[0.17em] text-white/90">
            {title}
          </h2>

          <p className="mt-2 max-w-[17rem] text-[0.68rem] leading-5 text-white/38">
            {subtitle}
          </p>
        </header>

        <AtlasOperationsSection
          title="Operational Status"
          eyebrow="Current session"
        >
          <div className="grid gap-2">
            {statuses.map((status) => (
              <AtlasStatusItem
                key={status.id}
                label={status.label}
                value={status.value}
                detail={status.detail}
                tone={status.tone}
                progress={status.progress}
                pulse={status.pulse}
              />
            ))}
          </div>
        </AtlasOperationsSection>

        <AtlasOperationsSection
          title="Quick Actions"
          eyebrow="Command access"
        >
          <AtlasQuickActions actions={quickActions} />
        </AtlasOperationsSection>

        <AtlasOperationsSection
          title="Active Signals"
          eyebrow="Recent intelligence"
        >
          <AtlasRecentEvents events={recentEvents} />
        </AtlasOperationsSection>
      </div>
    </aside>
  );
}
