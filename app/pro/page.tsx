import {
  AtlasButton,
  AtlasCard,
  AtlasGrid,
  AtlasHero,
  AtlasPage,
  AtlasSection,
  AtlasSurface,
} from "@/app/components/design-system";

const premiumCapabilities = [
  {
    title: "Atlas Memory",
    category: "Personalization",
    description:
      "Give Atlas long-term awareness of your gameplay history, priorities, milestones, and strategic patterns.",
  },
  {
    title: "Empire Simulator",
    category: "Forecasting",
    description:
      "Compare hypothetical purchases and progression paths before committing valuable time or resources.",
  },
  {
    title: "Empire Forecast",
    category: "Forecasting",
    description:
      "Project how future decisions may affect your progression, efficiency, and overall empire strength.",
  },
  {
    title: "Advanced Advisor",
    category: "Intelligence",
    description:
      "Receive deeper recommendations informed by your goals, playstyle, risk tolerance, and current assets.",
  },
  {
    title: "ROI Intelligence",
    category: "Strategy",
    description:
      "Evaluate purchases using income potential, utility, recovery time, and opportunity cost.",
  },
  {
    title: "Session Optimizer",
    category: "Planning",
    description:
      "Build efficient gameplay routes around your available time, active goals, and owned assets.",
  },
  {
    title: "Weekly Empire Report",
    category: "Reporting",
    description:
      "Review progression, decisions, opportunities, and recommended priorities in one strategic briefing.",
  },
];

const freeFeatures = [
  "Atlas game database",
  "Global entity search",
  "Vehicle and entity comparisons",
  "Basic mission planning",
  "Core Atlas Copilot guidance",
  "Empire Score",
];

const proFeatures = [
  "Everything included with Free",
  "Personalized Atlas Copilot",
  "Atlas Memory",
  "Empire Simulator",
  "Empire Forecast",
  "Advanced Advisor",
  "ROI Intelligence",
  "Session Optimizer",
  "Copilot history",
  "Weekly Empire Reports",
];

export default function AtlasProPage() {
  return (
    <AtlasPage>
      <AtlasHero
        eyebrow="Atlas Pro"
        title="Unlock the Full Atlas Intelligence Experience"
        description="Atlas Pro transforms Atlas from a powerful game companion into a personalized strategic system that remembers your progression, evaluates your decisions, and helps you build a stronger empire."
        actions={
          <>
            <AtlasButton href="/dashboard">
              Explore Atlas
            </AtlasButton>

            <AtlasButton
              href="#pro-capabilities"
              variant="secondary"
            >
              View Pro Features
            </AtlasButton>
          </>
        }
      >
        <AtlasSurface
          tone="subtle"
          className="p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Premium Intelligence
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-black text-white">
                7
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Pro intelligence systems
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white">
                1
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Connected player strategy
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-sm leading-6 text-zinc-300">
              Built for players who want Atlas to understand not only the
              game, but how they play it.
            </p>
          </div>
        </AtlasSurface>
      </AtlasHero>

      <AtlasSection
        subtitle="The Pro Advantage"
        title="Intelligence That Evolves With You"
      >
        <AtlasGrid columns={3}>
          <AtlasCard
            subtitle="Remember"
            title="Persistent Player Context"
            glow
          >
            <p className="leading-7 text-zinc-300">
              Atlas Pro remembers meaningful activity, preferences, decisions,
              and milestones so recommendations become more relevant over
              time.
            </p>
          </AtlasCard>

          <AtlasCard
            subtitle="Predict"
            title="Decision Forecasting"
          >
            <p className="leading-7 text-zinc-300">
              Simulate purchases and progression paths before acting, then
              compare their expected strategic impact across your empire.
            </p>
          </AtlasCard>

          <AtlasCard
            subtitle="Optimize"
            title="Personal Strategy"
          >
            <p className="leading-7 text-zinc-300">
              Turn your goals, assets, available time, and risk profile into
              focused recommendations and efficient gameplay plans.
            </p>
          </AtlasCard>
        </AtlasGrid>
      </AtlasSection>

      <AtlasSection
        subtitle="Plans"
        title="Choose Your Atlas Experience"
      >
        <AtlasGrid columns={2}>
          <AtlasCard
            subtitle="Atlas Free"
            title="Essential Companion"
            footer={
              <AtlasButton
                href="/dashboard"
                variant="secondary"
                className="w-full"
              >
                Continue With Free
              </AtlasButton>
            }
          >
            <p className="mb-6 leading-7 text-zinc-300">
              Explore the core Atlas database, planning tools, comparisons,
              Empire Score, and general Copilot guidance.
            </p>

            <ul className="space-y-3">
              {freeFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-zinc-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 text-cyan-400"
                  >
                    +
                  </span>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </AtlasCard>

          <AtlasCard
            subtitle="Atlas Pro"
            title="Personal Intelligence System"
            glow
            footer={
              <div className="space-y-3">
                <div
                  aria-disabled="true"
                  className="flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 px-5 py-3 font-semibold text-violet-200"
                >
                  Pro Access Coming Soon
                </div>

                <p className="text-center text-xs leading-5 text-zinc-500">
                  Paid subscriptions and checkout are not yet available.
                </p>
              </div>
            }
          >
            <p className="mb-6 leading-7 text-zinc-300">
              Unlock the full Atlas intelligence platform with memory,
              forecasting, simulation, advanced advising, and strategic
              reporting.
            </p>

            <ul className="space-y-3">
              {proFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-zinc-200"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 text-violet-300"
                  >
                    +
                  </span>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </AtlasCard>
        </AtlasGrid>
      </AtlasSection>

      <AtlasSection
        subtitle="Premium Systems"
        title="Inside Atlas Pro"
        className="scroll-mt-24"
      >
        <div id="pro-capabilities">
          <AtlasGrid columns={3}>
            {premiumCapabilities.map((capability) => (
              <AtlasCard
                key={capability.title}
                subtitle={capability.category}
                title={capability.title}
              >
                <p className="leading-7 text-zinc-300">
                  {capability.description}
                </p>
              </AtlasCard>
            ))}
          </AtlasGrid>
        </div>
      </AtlasSection>

      <AtlasSurface
        tone="elevated"
        glow
        className="overflow-hidden p-8 md:p-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Built for What Comes Next
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
              Atlas Pro Is Coming Soon
            </h2>

            <p className="mt-4 text-lg leading-8 text-zinc-300">
              The capability platform is already built into Atlas. Account,
              subscription, and billing support will activate Pro access in a
              future release.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <AtlasButton href="/roadmap">
              View the Roadmap
            </AtlasButton>

            <AtlasButton
              href="/dashboard"
              variant="secondary"
            >
              Return to Atlas
            </AtlasButton>
          </div>
        </div>
      </AtlasSurface>
    </AtlasPage>
  );
}