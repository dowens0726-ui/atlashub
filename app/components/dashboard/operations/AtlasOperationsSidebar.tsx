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
    description: "Strategic guidance",
    badge: "AI",
  },
  {
    label: "Review Planner",
    href: "/planner",
    description: "Build the next session",
  },
  {
    label: "Explore Businesses",
    href: "/data/businesses",
    description: "Expansion intelligence",
  },
  {
    label: "Compare Vehicles",
    href: "/compare",
    description: "Mission-ready analysis",
  },
];

function findStatus(
  statuses: AtlasOperationStatus[],
  id: string
) {
  return statuses.find(
    (status) => status.id === id
  );
}

export default function AtlasOperationsSidebar({
  statuses,
  quickActions = defaultQuickActions,
  recentEvents = [],
  eyebrow = "Live operating context",
  title = "Atlas Operations",
  subtitle = "Persistent intelligence for the active command session.",
  className = "",
}: AtlasOperationsSidebarProps) {
  const atlasCore =
    findStatus(
      statuses,
      "atlas-core"
    );

  const empireStage =
    findStatus(
      statuses,
      "empire-stage"
    );

  const empireCompletion =
    findStatus(
      statuses,
      "empire-completion"
    );

  const availableCash =
    findStatus(
      statuses,
      "available-cash"
    );

  const remainingInvestment =
    findStatus(
      statuses,
      "remaining-investment"
    );

  const activeObjective =
    findStatus(
      statuses,
      "active-objective"
    );

  const fallbackStatuses =
    statuses.filter(
      (status) =>
        ![
          "atlas-core",
          "empire-stage",
          "empire-completion",
          "available-cash",
          "remaining-investment",
          "active-objective",
        ].includes(
          status.id
        )
    );

  return (
    <aside
      aria-label="Atlas operations"
      className={[
        "relative overflow-hidden rounded-[1.9rem]",
        "border border-white/[0.09]",
        "bg-[linear-gradient(180deg,rgba(4,12,22,0.96),rgba(3,8,15,0.88))]",
        "shadow-[0_34px_100px_rgba(0,0,0,0.38)]",
        "backdrop-blur-2xl",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.13),transparent_32%),radial-gradient(circle_at_100%_46%,rgba(139,92,246,0.08),transparent_30%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/65 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent"
      />

      <div className="relative z-10">
        <header className="border-b border-white/[0.07] px-5 pb-5 pt-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-35" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.85)]" />
              </span>

              <p className="truncate text-[0.57rem] font-black uppercase tracking-[0.25em] text-cyan-100/60">
                {eyebrow}
              </p>
            </div>

            <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2.5 py-1 text-[0.5rem] font-black uppercase tracking-[0.17em] text-emerald-200/80">
              Online
            </span>
          </div>

          <h2 className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-white">
            {title}
          </h2>

          <p className="mt-2 text-[0.67rem] leading-5 text-white/38">
            {subtitle}
          </p>
        </header>

        <div className="space-y-0">
          <section className="border-b border-white/[0.07] px-4 py-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.52rem] font-black uppercase tracking-[0.23em] text-cyan-100/42">
                  Empire health
                </p>

                <p className="mt-1 text-[0.65rem] text-white/34">
                  Live strategic position
                </p>
              </div>

              {empireCompletion ? (
                <div className="text-right">
                  <span className="block text-2xl font-black tracking-[-0.05em] text-white drop-shadow-[0_0_16px_rgba(103,232,249,0.28)]">
                    {empireCompletion.value}
                  </span>

                  <span className="mt-0.5 block text-[0.48rem] font-black uppercase tracking-[0.18em] text-emerald-200/50">
                    Operational
                  </span>
                </div>
              ) : null}
            </div>

            {empireCompletion ? (
              <AtlasStatusItem
                label={empireStage?.label ?? "Empire Stage"}
                value={empireStage?.value ?? "Active"}
                detail={
                  empireCompletion.detail
                }
                tone={
                  empireCompletion.tone
                }
                progress={
                  empireCompletion.progress
                }
              />
            ) : empireStage ? (
              <AtlasStatusItem
                label={empireStage.label}
                value={empireStage.value}
                detail={empireStage.detail}
                tone={empireStage.tone}
              />
            ) : null}
          </section>

          <section className="border-b border-white/[0.07] px-4 py-4">
            <div className="mb-3">
              <p className="text-[0.52rem] font-black uppercase tracking-[0.23em] text-cyan-100/42">
                Financial pulse
              </p>

              <p className="mt-1 text-[0.65rem] text-white/34">
                Deployable capital and roadmap demand
              </p>
            </div>

            <div className="grid gap-2">
              {availableCash ? (
                <AtlasStatusItem
                  label={availableCash.label}
                  value={availableCash.value}
                  detail={availableCash.detail}
                  tone={availableCash.tone}
                />
              ) : null}

              {remainingInvestment ? (
                <AtlasStatusItem
                  label={remainingInvestment.label}
                  value={remainingInvestment.value}
                  detail={remainingInvestment.detail}
                  tone={remainingInvestment.tone}
                />
              ) : null}
            </div>
          </section>

          <section className="border-b border-white/[0.07] px-4 py-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.52rem] font-black uppercase tracking-[0.23em] text-cyan-100/42">
                  Mission focus
                </p>

                <p className="mt-1 text-[0.65rem] text-white/34">
                  Current Atlas priority
                </p>
              </div>

              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            </div>

            {activeObjective ? (
              <AtlasStatusItem
                label={activeObjective.label}
                value={activeObjective.value}
                detail={activeObjective.detail}
                tone={activeObjective.tone}
                pulse
              />
            ) : null}
          </section>

          {fallbackStatuses.length > 0 ? (
            <AtlasOperationsSection
              title="System Telemetry"
              eyebrow="Additional signals"
            >
              <div className="grid gap-2">
                {fallbackStatuses.map(
                  (status) => (
                    <AtlasStatusItem
                      key={status.id}
                      label={status.label}
                      value={status.value}
                      detail={status.detail}
                      tone={status.tone}
                      progress={status.progress}
                      pulse={status.pulse}
                    />
                  )
                )}
              </div>
            </AtlasOperationsSection>
          ) : null}

          <section className="border-b border-white/[0.07] px-4 py-3.5">
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.52rem] font-black uppercase tracking-[0.23em] text-cyan-100/52">
                  Command access
                </p>

                <p className="mt-1 text-[0.65rem] text-white/34">
                  Launch Atlas modules
                </p>
              </div>

              <span className="text-[0.52rem] font-black uppercase tracking-[0.16em] text-white/22">
                04 modules
              </span>
            </div>

            <AtlasQuickActions
              actions={quickActions}
            />
          </section>

          <section className="relative px-4 py-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent"
            />

            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.52rem] font-black uppercase tracking-[0.23em] text-cyan-100/60">
                  Live signals
                </p>

                <p className="mt-1 text-[0.65rem] text-white/34">
                  Recent strategic intelligence
                </p>
              </div>

              <span className="flex items-center gap-1.5 rounded-full border border-cyan-300/10 bg-cyan-300/[0.04] px-2 py-1 text-[0.48rem] font-black uppercase tracking-[0.14em] text-cyan-100/55">
                <span className="h-1 w-1 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                Streaming
              </span>
            </div>

            <AtlasRecentEvents
              events={recentEvents}
            />
          </section>

          {atlasCore ? (
            <footer className="border-t border-white/[0.07] bg-white/[0.018] px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-white/25">
                    Atlas Core
                  </p>

                  <p className="mt-1 truncate text-[0.65rem] font-semibold text-white/62">
                    {atlasCore.value}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]" />

                  <span className="text-[0.52rem] font-black uppercase tracking-[0.15em] text-emerald-200/55">
                    Synchronized
                  </span>
                </div>
              </div>
            </footer>
          ) : null}
        </div>
      </div>
    </aside>
  );
}