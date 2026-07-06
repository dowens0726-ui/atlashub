import type { Business } from "@/app/types";

export const businesses: Business[] = [
  {
    id: "business:nightclub",
    slug: "nightclub",
    name: "Nightclub",
    category: "Nightlife",
    image: "/businesses/nightclub.webp",
    price: 1080000,
    location: "Vice City",
    incomePotential: 85,
    profitabilityRating: 5,
    difficulty: "Easy",
    soloFriendly: true,
    crewRecommended: false,
    description:
      "A nightlife business designed for passive income, warehouse management, and long-term wealth generation.",
    tags: ["nightlife", "passive-income", "warehouse", "solo"],
    verified: false,
    atlasTips: [
      "Assign warehouse technicians as early as possible.",
      "Produces excellent passive income during long play sessions.",
      "Works exceptionally well when paired with other businesses.",
    ],
    recommendedFor: ["Passive Income", "Solo Players", "Long Sessions"],
    relatedVehicles: ["speedo-custom", "mule-custom", "pounder-custom"],
    relatedMissions: [],
    relatedBusinesses: [],
  },
];