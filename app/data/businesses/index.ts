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
    soloFriendly: true,
    crewRecommended: false,
    description:
      "A nightlife business designed for passive income, storage, and long-term money generation.",
    tags: ["nightlife", "passive-income", "solo-friendly"],
    verified: false,
  },
];