import AtlasSearchPanel from "./components/search/AtlasSearchPanel";
import {
  DashboardCard,
  DashboardGrid,
  DashboardSection,
  QuickAction,
  WelcomeBanner,
} from "./components/dashboard";
import Container from "./components/ui/Container";

const commandCards = [
  {
    title: "Garage Builder",
    description:
      "Get vehicle recommendations based on your budget and play style.",
    href: "/garage-builder",
    icon: "🚗",
  },
  {
    title: "Collections",
    description:
      "Explore curated vehicle collections powered by Atlas Intelligence.",
    href: "/collections",
    icon: "⭐",
  },
  {
    title: "Rankings",
    description:
      "View automatically generated leaderboards for speed, value, and performance.",
    href: "/rankings",
    icon: "🏆",
  },
  {
    title: "Manufacturers",
    description:
      "Browse vehicle brands, lineups, Atlas Scores, and performance leaders.",
    href: "/manufacturers",
    icon: "🏭",
  },
  {
    title: "Vehicle Garage",
    description:
      "Search, filter, compare, and discover every vehicle in Atlas.",
    href: "/vehicles",
    icon: "🏎",
  },
  {
    title: "Explorer",
    description:
      "Open the interactive Atlas map and explore locations. More coming soon.",
    href: "/map",
    icon: "🗺️",
  },
];

const quickActions = [
  { href: "/vehicles", label: "Vehicles", icon: "🚗" },
  { href: "/weapons", label: "Weapons", icon: "🔫" },
  { href: "/missions", label: "Missions", icon: "🎯" },
  { href: "/compare", label: "Compare", icon: "⚖️" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Container className="py-16">
        <WelcomeBanner />

        <div className="mt-10">
          <AtlasSearchPanel />
        </div>

        <DashboardSection
          title="Command Center"
          description="Jump into Atlas tools, discovery paths, rankings, and intelligent recommendations."
        >
          <DashboardGrid>
            {commandCards.map((card) => (
              <DashboardCard
                key={card.href}
                title={card.title}
                description={card.description}
                href={card.href}
                icon={card.icon}
              />
            ))}
          </DashboardGrid>
        </DashboardSection>

        <DashboardSection
          title="Quick Actions"
          description="Fast access to the core Atlas databases."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <QuickAction
                key={action.href}
                href={action.href}
                label={action.label}
                icon={action.icon}
              />
            ))}
          </div>
        </DashboardSection>
      </Container>
    </main>
  );
}