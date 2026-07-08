import { businesses, missions, vehicles, weapons } from "@/app/data";

export type SearchResult = {
  id: string;
  slug: string;
  type: "business" | "mission" | "vehicle" | "weapon" | "page";
  label: string;
  description: string;
  href: string;
  tags?: string[];
};

const pageSearchResults: SearchResult[] = [
  {
    id: "page:dashboard",
    slug: "dashboard",
    type: "page",
    label: "Empire Command",
    description: "Open your AtlasHub dashboard and empire briefing.",
    href: "/dashboard",
    tags: ["dashboard", "empire", "command", "briefing"],
  },
  {
    id: "page:profile",
    slug: "profile",
    type: "page",
    label: "Empire",
    description: "Manage your cash, playstyle, and owned businesses.",
    href: "/profile",
    tags: ["profile", "empire", "cash", "businesses"],
  },
  {
    id: "page:planner",
    slug: "planner",
    type: "page",
    label: "Mission Planner",
    description: "View your personalized progression roadmap.",
    href: "/planner",
    tags: ["planner", "roadmap", "progression", "mission"],
  },
  {
    id: "page:vehicles",
    slug: "vehicles",
    type: "page",
    label: "Vehicles",
    description: "Browse vehicles, performance, prices, and recommendations.",
    href: "/vehicles",
    tags: ["vehicles", "cars", "garage"],
  },
  {
    id: "page:businesses",
    slug: "businesses",
    type: "page",
    label: "Businesses",
    description: "Compare businesses, prices, income potential, and strategy.",
    href: "/data/businesses",
    tags: ["businesses", "money", "income", "empire"],
  },
  {
    id: "page:weapons",
    slug: "weapons",
    type: "page",
    label: "Weapons",
    description: "Browse weapons, damage, range, price, and categories.",
    href: "/weapons",
    tags: ["weapons", "armory"],
  },
  {
    id: "page:missions",
    slug: "missions",
    type: "page",
    label: "Missions",
    description: "Browse missions, rewards, objectives, and walkthroughs.",
    href: "/missions",
    tags: ["missions", "objectives", "rewards"],
  },
  {
    id: "page:rankings",
    slug: "rankings",
    type: "page",
    label: "Rankings",
    description: "View Atlas rankings for vehicles, businesses, and more.",
    href: "/rankings",
    tags: ["rankings", "best", "top"],
  },
  {
    id: "page:compare",
    slug: "compare",
    type: "page",
    label: "Compare",
    description: "Compare vehicles and content side by side.",
    href: "/compare",
    tags: ["compare", "versus", "vs"],
  },
  {
    id: "page:explorer",
    slug: "explorer",
    type: "page",
    label: "Explorer",
    description: "Discover Atlas content through filters and guided browsing.",
    href: "/explorer",
    tags: ["explorer", "discover", "browse"],
  },
];

export function getSearchIndex(): SearchResult[] {
  return [
    ...pageSearchResults,

    ...businesses.map((business) => ({
      id: business.id,
      slug: business.slug,
      type: "business" as const,
      label: business.name,
      description: business.description,
      href: `/businesses/${business.slug}`,
      tags: business.tags,
    })),

    ...missions.map((mission) => ({
      id: mission.id,
      slug: mission.slug,
      type: "mission" as const,
      label: mission.title,
      description: mission.description,
      href: `/missions/${mission.slug}`,
      tags: mission.tags,
    })),

    ...vehicles.map((vehicle) => ({
      id: vehicle.id,
      slug: vehicle.slug,
      type: "vehicle" as const,
      label: vehicle.name,
      description: vehicle.description,
      href: `/vehicles/${vehicle.slug}`,
      tags: vehicle.tags,
    })),

    ...weapons.map((weapon) => ({
      id: weapon.id,
      slug: weapon.slug,
      type: "weapon" as const,
      label: weapon.name,
      description: weapon.description,
      href: `/weapons/${weapon.slug}`,
      tags: weapon.tags,
    })),
  ];
}

function scoreResult(item: SearchResult, query: string): number {
  let score = 0;

  const label = item.label.toLowerCase();
  const description = item.description.toLowerCase();
  const type = item.type.toLowerCase();
  const tags = (item.tags ?? []).map((tag) => tag.toLowerCase());

  if (label === query) score += 100;
  else if (label.startsWith(query)) score += 75;
  else if (label.includes(query)) score += 50;

  if (tags.some((tag) => tag === query)) score += 40;
  else if (tags.some((tag) => tag.includes(query))) score += 25;

  if (description.includes(query)) score += 15;

  if (type.includes(query)) score += 10;

  return score;
}

export function searchAtlas(query: string): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return getSearchIndex()
    .map((item) => ({
      item,
      score: scoreResult(item, normalizedQuery),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}